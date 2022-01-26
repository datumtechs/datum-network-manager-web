import Web3 from 'web3'

class Web3Service {
  constructor() {
    this.eth = window.ethereum || undefined
    this.web3 = new Web3(this.eth) || undefined
  }

  // // eth.on('accountsChanged', account => {
  // //   props.updataWalletStatus({ WalletStatus: false })
  // // })
  // // // 切换网络
  // // eth.on('chainChanged', () => {
  // //   props.updataWalletStatus({ WalletStatus: false })
  // // })

  //登录签名
  _getAbiForLogin(nonceId) {
    return JSON.stringify({
      domain: {
        name: 'Moirae'
      },
      message: {
        key: nonceId,
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

  _getAbiForTx(address) {
    // const address = this.store.getters['app/address']
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

  // 连接钱包  获取  address
  async connectWallet() {
    let address = ''
    try {
      address = await this.eth.request({
        method: 'eth_requestAccounts'
      })
    } catch (error) {
      console.log(error)
    }
    return address
  }

  //获取签名
  signForWallet(type, address, nonceId) {
    const abi = type === 'login' ?
      this._getAbiForLogin(nonceId) :
      this._getAbiForTx(address)
    const from = address//this.store.getters['app/address']
    const result = new Promise((resolve, reject) => {
      this.web3.currentProviderc({
        method: 'eth_signTypedData_v4',
        params: [address, abi],
        from
      },
        (err, res) => {
          if (err) return reject(err)
          const {
            result
          } = res
          resolve(result)
        }
      )
    })
    return result
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
export default Web3Service