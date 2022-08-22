import { FC, useState, useEffect } from "react";
import { Table, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { orgManage } from '@api/index'
import { useApplicationStatus } from '@utils/utils'

const OrgManageApplyDetails: FC<any> = (props) => {
  const { t, i18n } = useTranslation()
  const [tableData, setTableData] = useState<any[]>([])
  const [data, setData] = useState<any>({})

  const query = () => {
    // setTableData([{ applicationProgress: "xxx" }])
    const { type, id } = props?.location?.state

    let url = ''
    if (type == 'generalOrganization-applyDetail') url = 'getApplyDetails'
    if (!url) return history.go(-1), message.error(t('exception.-32602'))
    orgManage[url]({ id }
    ).then(res => {
      const { status, data } = res
      if (status == 0) {
        console.log(data)
        setData(data)
      }
    })
  }
  const columns = [{
    dataIndex: 'left',
    width: 300
  },
  {
    dataIndex: 'right',
    width: 300
  },]

  useEffect(() => {
    query()
  }, [])

  return <div className="layout-box p-20 nomination-committee">
    <div className="list-title" style={{ paddingBottom: '20px' }}>
      <span className="title">{data?.dynamicFields?.applyOrgName}{t(`orgManage.certificationApplicationDetails`)}</span>
    </div>
    <Table
      className="com-table com-table-lr-padding"
      dataSource={tableData}
      columns={columns}
      showHeader={false}
      rowKey={(record: any) => record.id}
    />
  </div>
}


export default OrgManageApplyDetails