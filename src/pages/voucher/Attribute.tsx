import { FC, useState, useEffect } from "react";
import { Table, Tooltip, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import SearchBar from '@/layout/components/SearchBar'
import { CopyOutlined } from '@ant-design/icons'
import { copy } from '@/utils/utils'

const Attribute: FC<any> = (props: any) => {
  const [curPage, setCurPage] = useState(1),
    [totalNum, setTotalNum] = useState(0),
    [tableData, setTableData] = useState<any[]>([]),
    { t, i18n } = useTranslation(),
    pageSize = 10
  const [searchText, setSearchText] = useState("")
  const history = useHistory();
  const columns: any[] = [
    {
      title: ` `,
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 70,
    },
    {
      title: t('credential.credentialContractName'),
      dataIndex: 'name',
      ellipsis: true,
      width: '20%',
      className: "no-right-border"
    },
    {
      title: t('myData.dataName'),
      dataIndex: 'symbol',
      width: '15%',
      ellipsis: true,
    },
    {
      title: t('credential.credentialContractSymbol'),
      dataIndex: 'symbol',
      ellipsis: true,
      width: '15%',
    },
    {
      title: t('voucher.ContractAddress'),
      dataIndex: 'address',
      ellipsis: true,
      // width: 360,
      render: (text, record, index) =>
        text
          ? <>
            <CopyOutlined style={{ marginRight: '10px' }} onClick={() => copy(text)} />
            <Tooltip placement="bottom" title={text} color="#fff" overlayClassName={'_tooltip'}>
              {text}
            </Tooltip>
          </>
          : '--'
    },
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      width: '220px',
      render: (text: any, row: any, index: any) => {
        // 定价状态：0-未定价，1-已定价
        return <>
          <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => create(row)}>  {t('credential.createCredential')}</Button>
          <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => inventory(row)}>  {t('credential.credentialInventory')}</Button>
        </>
      },
    },
  ]

  const create = (row) => {
    history.push({
      pathname: '/voucher/AttributeCredential/createCredential',
      state: {
        dataAddress: row.address,
        name: row.name,
        dataTokenId: row.id,
        total: row.total,
        symbol: row.symbol
      },
    })
  }

  const inventory = (row) => {
    history.push({
      pathname: '/voucher/AttributeCredential/credentialInventory',
      state: {
        dataAddress: row.address,
        name: row.name,
        dataTokenId: row.id,
        total: row.total,
        symbol: row.symbol
      },
    })
  }

  const OnPageChange = (page: number) => {
    setCurPage(page)
  }

  const query = () => {
    setTableData([{ name: '123' }])

  }

  useEffect(() => {
    query()
  }, [])


  return <div className="layout-box">
    <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('credential.credentialContractName')}`} />
    <Table
      className="com-table "
      dataSource={tableData}
      columns={columns}
      rowKey={(record: any) => record.name}
      pagination={{
        // defaultCurrent: 1,
        current: curPage,
        defaultPageSize: pageSize,
        showSizeChanger: false,
        total: totalNum,
        onChange: OnPageChange,
        showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
      }}
    />
  </div>
}

export default Attribute

