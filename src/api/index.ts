// import axios from "../utils/request.js"
import axios from "axios"
/*
示例:代码中使用import api from "@/api/index"
调用 api.startChainFn({
    参数
}).then(res=>{
    do something
})
*/
const Api = {
  // 启动链 示例代码
  startChainFn(data: any) {
    return axios({
      method: "post",
      url: "/proxy/initChain",
      data,
    })
  },
}


export default Api;