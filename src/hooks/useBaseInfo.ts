import { useEffect, useState } from 'react'
import { loginApi } from '../api/index'
import { BaseInfo } from '../entity/index'


const useBaseInfo = (): BaseInfo | any => {
  const [info, setInfo] = useState<BaseInfo>({
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
  const [done, setDone] = useState(false)
  useEffect(() => {
    (async () => {
      const res = await loginApi.queryBaseInfo()
      console.log("模拟异步数据 ============>", res);

      // if (res.status === 0 && res.data) {
      if (res.status === 0 && res.data) {
        setInfo(res.data)
        setDone(true)
      }
    })();
  }, [])

  return { info, done }
}
export default useBaseInfo