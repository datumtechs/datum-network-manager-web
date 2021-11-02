import { FC } from 'react'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

const AuthInfoTable: FC<any> = (props: any) => {
  const { tableData, curPage, totalNum } = props
  console.log('tableData', tableData);

  const { t } = useTranslation()
  const onPageChange = (page: number) => {
    props.setPage(page)
  }
  const pagination = {
    defaultPageSize: 10
  }

  const columns = [{
    title: t('common.Num'),
    width: 100,
    render: (text, record, index) => record.index,
  }, {
    title: t('center.fileField'),
    dataIndex: 'columnName',
  }, {
    title: t('center.dataType'),
    dataIndex: 'columnType',
    key: 'columnType',
  }, {
    title: t('center.remarks'),
    dataIndex: 'remarks',
    key: 'remarks',
  }]

  return <>
    <Table
      dataSource={tableData}
      rowKey={re => re.id}
      columns={columns}
      pagination={{ defaultCurrent: 1, total: totalNum, onChange: onPageChange }}
    />
  </>
}

export default AuthInfoTable