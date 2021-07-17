import { useEffect, useState } from 'react'
import { loginApi } from '../api/index'
import { BaseInfo } from '../entity/index'


const useBaseInfo = (): BaseInfo | any => {
  const [info, setInfo] = useState<BaseInfo>()
  useEffect(() => {
    (async () => {
      const res = await loginApi.queryBaseInfo()
      if (res.status === 0 && res.data) {
        setInfo(res.data)
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