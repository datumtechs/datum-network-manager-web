import { useEffect, useState } from 'react'
import { loginApi } from '../api/index'
import { BaseInfo } from '../entity/index'


const useBaseInfo = (): BaseInfo | any => {
  const [info, setInfo] = useState<any>()
  const query = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve({
          carrierConnStatus: '',
          carrierConnTime: '',
          carrierIp: '',
          carrierNodeId: '',
          carrierPort: '',
          carrierStatus: '',
          identityId: '',
          name: '',
          recUpdateTime: '',
        })
      }, 400);
    })

  }
  useEffect(() => {
    (async () => {
      // const res = await loginApi.queryBaseInfo()
      const res = await query()
      console.log("模拟异步数据 ============>", res);

      // if (res.status === 0 && res.data) {
      if (res) {
        setInfo(res)
      }
      setInfo({
        carrierConnStatus: '',
        carrierConnTime: '',
        carrierIp: '',
        carrierNodeId: '',
        carrierPort: '',
        carrierStatus: '',
        identityId: '',
        name: '',
        recUpdateTime: '',
      })

    })();
    // await loginApi.queryBaseInfo().then(res => {
    //   console.log('baseInfo in hooks============>', res.data)
    //   if (res.status === 0 && res.data) {
    //     setInfo(res.data)
    //   }
    //   setInfo({
    //     carrierConnStatus: '',
    //     carrierConnTime: '',
    //     carrierIp: '',
    //     carrierNodeId: '',
    //     carrierPort: '',
    //     carrierStatus: '',
    //     identityId: '',
    //     name: '',
    //     recUpdateTime: '',
    //   })
    // })
  }, [])

  return info
}
export default useBaseInfo