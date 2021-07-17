import { useEffect, useState } from 'react'
import { loginApi } from '../api/index'
import { BaseInfo } from '../entity/index'

const useBaseInfo = (): BaseInfo | any => {
  const [info, setInfo] = useState<BaseInfo>()
  useEffect(() => {
    loginApi.queryBaseInfo().then(res => {
      console.log('baseInfo in hooks============>', res.data)
      if (res.status === 0 && res.data) {
        setInfo(res.data)
      }
      return false
    })
  }, [])

  return info
}

export default useBaseInfo