import { useEffect, useState } from 'react'
import { computeNodeApi } from '../api/index'


const useComputeNodeDetails = (id: string): any => {
  const [details, detailsSet] = useState()
  useEffect(() => {
    (async () => {
      const res = await computeNodeApi.queryPowerNodeDetails({ powerNodeId: id })
      if (res.status === 0 && res.data) {
        detailsSet(res.data)
      }
    })();
  }, [])

  return { details }
}
export default useComputeNodeDetails