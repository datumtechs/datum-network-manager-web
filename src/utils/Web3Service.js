import Web3 from 'web3'
const ethereumjsUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');

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
  signForWallet(type, address, nonceId) {
    const abi = type === 'login' ?
      this._getAbiForLogin(nonceId) :
      this._getAbiForTx(address)
    const from = address

    const result = new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync({
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
      const Address = this.eth.selectedAddress
      if (Address && Address.length) {
        this.store.commit.SET_ADDRESS(Address)
        return true
      }
      return false
    }
    return false
  }

  stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  }

  async signData(list, address) {

    console.log(JSON.stringify(list));
    const rlphash = ethereumjsUtil.rlp.encode(list)
    const k256Hash = ethereumjsUtil.keccak256(rlphash)
    const k256Hex = this.web3.utils.toHex(k256Hash)

    const abi = JSON.stringify({
      domain: {
        name: 'Datum'
      },
      message: {
        contents: k256Hex
      },
      primaryType: 'sign',
      types: {
        EIP712Domain: [{
          name: 'name',
          type: 'string'
        }],
        sign: [{
          name: 'contents',
          type: 'string'
        }]
      }
    })

    // console.log('abi', abi);
    const sign = await new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync({
        method: 'eth_signTypedData_v4',
        params: [address, abi],
        from: address
      },
        (err, res) => {
          if (err) return reject(err)
          const {
            result
          } = res

          // const recovered = sigUtil.recoverTypedSignature_v4({
          //   data: JSON.parse(abi),
          //   sig: result,
          // });
          resolve(result)
        }
      )
    })

    return sign
  }


}
export default Web3Service