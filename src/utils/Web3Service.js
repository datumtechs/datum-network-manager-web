// import Web3 from 'web3'
import Web3 from 'web3'
import store from '@/store'

class Web3Service {
  web3 = null
  store = null
  eth = window.ethereum
  constructor() {
    this.web3 = null
    this.store = store
    try {
      this.initAlaya()
    } catch (error) {
      console.log('initialization error!')
    }
  }

  initAlaya() {
    const {
      eth
    } = this
    if (typeof eth === 'undefined') {
      console.log('no metamask you should check you chrome chrome-extension')
      this.store.commit('app/SET_ISWALLET', false)
    } else {
      this.web3 = new Web3(eth)
      eth.on('accountsChanged', account => {
        console.log(account, eth.chainId)
        this.store.dispatch('app/getLogout')
      })

      // 切换网络
      eth.on('chainChanged', () => {
        console.log('chain changed')
        this.store.dispatch('app/getLogout')
      })
    }
  }

  _getAbiForLogin() {
    const uuId = this.store.getters['app/nonceId']
    return JSON.stringify({
      domain: {
        name: 'Moirae'
      },
      message: {
        key: uuId,
        desc: 'Welcome to Moirae!'
      },
      primaryType: 'Login',
      types: {
        EIP712Domain: [{
          name: 'name',
          type: 'string'
        }],
        Login: [{
          name: 'key',
          type: 'string'
        },
        {
          name: 'desc',
          type: 'string'
        }
        ]
      }
    })
  }

  _getAbiForTx() {
    const address = this.store.getters['app/address']
    return JSON.stringify({
      domain: {
        name: 'Moirae'
      },
      message: {
        address
      },
      primaryType: 'sign',
      types: {
        EIP712Domain: [{
          name: 'name',
          type: 'string'
        }],
        sign: [{
          name: 'address',
          type: 'string'
        }]
      }
    })
  }

  // 连接钱包

  async connectWallet() {
    const {
      eth
    } = this
    if (typeof eth === 'undefined') {
      console.log('no metamask you should check you chrome chrome-extension')
      this.store.commit('app/SET_ISWALLET', false)
    } else {
      try {
        const data = await eth.request({
          method: 'eth_requestAccounts'
        })
        this.store.dispatch('app/saveAddress', data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  signForWallet(type) {
    const abi = type === 'login' ? this._getAbiForLogin() : this._getAbiForTx()
    const from = this.store.getters['app/address']
    // const callback = (err, res) => {
    //   if (err) return console.log(err)
    //   const { result } = res
    //   this.store.commot('SET_SIGN', result)
    // }
    const result = new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync({
        method: 'eth_signTypedData_v4',
        params: [from, abi],
        from
      },
        (err, res) => {
          if (err) return reject(err)
          const {
            result
          } = res
          this.store.commit('app/SET_SIGN', result)
          resolve(result)
        }
      )
    })
    return result
  }

  loginParams() {
    return {
      address: this.store.getters['app/address'],
      sign: this.store.getters['app/sign'],
      signMessage: this._getAbiForLogin()
    }
  }

  checkAddress() {
    const address = this.store.getters['app/address']
    if (address && address.length) return true
    if (this.eth && this.eth.selectedAddress) {
      const address = this.eth.selectedAddress
      if (address && address.length) {
        this.store.commit.SET_ADDRESS(address)
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
export default new Web3Service()