import Web3 from 'web3'
const ethereumjsUtil = require('ethereumjs-util');

console.log(ethereumjsUtil, "keccak256", "rlp");
class Web3Service {
  constructor() {
    this.eth = window.ethereum || undefined
    this.web3 = new Web3(this.eth) || undefined
  }

  // 登录签名
  _getAbiForLogin(nonceId) {
    return JSON.stringify({
      domain: {
        name: 'Datum'
      },
      message: {
        key: nonceId,
        desc: 'Welcome to Datum!'
      },
      primaryType: 'Login',
      types: {
        EIP712Domain: [ {
          name: 'name',
          type: 'string'
        } ],
        Login: [ {
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


  _getAbiForTx(address) {
    return JSON.stringify({
      domain: {
        name: 'Datum'
      },
      message: {
        address
      },
      primaryType: 'sign',
      types: {
        EIP712Domain: [ {
          name: 'name',
          type: 'string'
        } ],
        sign: [ {
          name: 'address',
          type: 'string'
        } ]
      }
    })
  }

  _getDecimalChainID(originId) {
    return parseInt(originId, 10)
  }

  _addNetwork(obj) {
    return this.eth.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainName: obj.chain_name,
          chainId: `0x${obj.chain_id.toString(16)}`,
          rpcUrls: [ obj.rpc_url ],
          nativeCurrency: {
            symbol: obj.symbol,
            decimals: 18
          },
          blockExplorerUrls: [ obj.block_explorer_url ],
        },
      ],
    })
  }



  async connectWallet(obj) {
    let address = ''
    const chainId = await this._queryChainID()
    if (parseInt(chainId) !== obj.chain_id) {
      await this._addNetwork(obj)
    }
    const newChainId = await this._queryChainID()
    if (parseInt(newChainId) !== obj.chain_id) return false
    address = await this.eth.request({
      method: 'eth_requestAccounts'
    })
    return address
  }

  // 获取签名
  signForWallet(type, address, additional) {// additional :  nonceId/ abi
    const abi = type === 'login' ?
      this._getAbiForLogin(additional) :
      type == 'abi' ? additional :
        this._getAbiForTx(address)
    const from = address

    const result = new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync({
        method: 'eth_signTypedData_v4',
        params: [ address, abi ],
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
    const address = this.store.getters[ 'app/address' ]
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

  Uint32byte(item) {
    return Buffer.from(Uint32Array.from([ Number(item) ]).buffer).reverse()
  }

  async signData(list, address) {
    // console.log(JSON.stringify(list));
    const newList = [
      Buffer.from(String(list[ 0 ])),
      this.Uint32byte(list[ 1 ]),
      Buffer.from(String(list[ 2 ])),
      Buffer.from(String(list[ 3 ])),
      this.Uint32byte(list[ 4 ]),
      this.Uint32byte(list[ 5 ]),
      Buffer.from(String(list[ 6 ])),
      this.Uint32byte(list[ 7 ]),
      Buffer.from(list[ 8 ])
    ]

    const rlpByte = ethereumjsUtil.rlp.encode(Buffer.concat(newList))
    const k256Hex = this.web3.utils.toHex(ethereumjsUtil.keccak256(rlpByte))
    console.log(k256Hex);

    const abi = JSON.stringify({
      domain: {
        name: 'Datum'
      },
      message: {
        contents: k256Hex
      },
      primaryType: 'sign',
      types: {
        EIP712Domain: [ {
          name: 'name',
          type: 'string'
        } ],
        sign: [ {
          name: 'contents',
          type: 'string'
        } ]
      }
    })


    return await this.signForWallet('abi', address, abi)
  }


}
export default Web3Service