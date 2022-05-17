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
 
  // 登录签名
  // eslint-disable-next-line class-methods-use-this
  _getAbiForLogin(nonceId) {
    return JSON.stringify({
      domain: {
        name: 'Metis'
      },
      message: {
        key: nonceId,
        desc: 'Welcome to Metis!'
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

  _queryChainID() {
    return this.eth.request({
      method: 'eth_chainId'
    })
  }



  // eslint-disable-next-line class-methods-use-this
  _getAbiForTx(address) {
    return JSON.stringify({
      domain: {
        name: 'Metis'
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

  // eslint-disable-next-line class-methods-use-this
  _getDecimalChainID(originId) {
    return parseInt(originId, 10)
  }

  _addNetwork(obj) {
    return this.eth.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainName: obj.chain_name,
          chainId: `0x${  obj.chain_id.toString(16)}`,
          rpcUrls: [obj.rpc_url],
          nativeCurrency: {
            symbol: obj.symbol,
            decimals: 18
          },
          blockExplorerUrls: [obj.block_explorer_url],
        },
      ],
    })
  }



  // 连接钱包  获取  address
  async connectWallet(obj) {
    let address = ''
    const chainId = await this._queryChainID()
    // eslint-disable-next-line radix
    if (parseInt(chainId) !== obj.chain_id) {
      await this._addNetwork(obj)
    }
    const newChainId = await this._queryChainID()
    // eslint-disable-next-line radix
    if (parseInt(newChainId) !== obj.chain_id) return false

    try {
      address = await this.eth.request({
        method: 'eth_requestAccounts'
      })
    } catch (error) {
      console.log(error)
    }
    return address
  }

  // 获取签名
  signForWallet(type, address, nonceId) {
    const abi = type === 'login' ?
      this._getAbiForLogin(nonceId) :
      this._getAbiForTx(address)
    const from = address// this.store.getters['app/address']

    const result = new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync({
        method: 'eth_signTypedData_v4',
        params: [address, abi],
        from
      },
        (err, res) => {
          if (err) return reject(err)
          const {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            result
          }= res
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
      const Address = this.eth.selectedAddress
      if (Address && Address.length) {
        this.store.commit.SET_ADDRESS(Address)
        return true
      }
      return false
    } 
      return false
  }
}
export default Web3Service