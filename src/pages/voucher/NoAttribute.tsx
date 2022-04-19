import { FC } from 'react'
import VoucherTable from './components/VTable'

const NoAttributeVoucher: FC<any> = (props: any) => {
  return <div className="layout-box"> <VoucherTable type="noVoucher" {...props} /></div>
}

export default NoAttributeVoucher

