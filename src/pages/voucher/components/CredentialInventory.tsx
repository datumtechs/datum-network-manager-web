import { FC, useState, useEffect } from "react";
import { Table, Tooltip, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { CopyOutlined, PlusOutlined } from '@ant-design/icons'
import { copy } from '@/utils/utils'
import { useHistory } from 'react-router-dom'

const CredentialInventory: FC<any> = (props: any) => {
  const [curPage, setCurPage] = useState(1),
    [totalNum, setTotalNum] = useState(0),
    [tableData, setTableData] = useState<any>([]),
    { t } = useTranslation(),
    pageSize = 10
  const history = useHistory();
  const [searchText, setSearchText] = useState("")
  const columns: any[] = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 70,
      align: 'center',
    },
    {
      title: t('voucher.VoucherName'),
      dataIndex: 'name',
      ellipsis: true,
      width: '20%',
    },
    {
      title: t('myData.dataName'),
      dataIndex: 'symbol',
      width: '15%',
      ellipsis: true,
    },
    {
      title: t('credential.credentialId'),
      dataIndex: 'symbol',
      ellipsis: true,
      width: '15%',
    },
    {
      title: t('center.usageScene'),
      dataIndex: 'symbol',
      ellipsis: true,
      width: '15%',
    },
    {
      title: t('credential.credentialValidityPeriod'),
      dataIndex: 'symbol',
      ellipsis: true,
      width: '15%',
    },
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      render: (text: any, row: any, index: any) => {
        // 定价状态：0-未定价，1-已定价
        return <>
          <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => detail(row)}>  {t('computeNodeMgt.detail')}</Button>
          <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => putShelf(row)}>  {t('credential.putShelf')}</Button>
        </>
      },
    },
  ]

  const detail = (row) => {
    history.push({
      pathname: '/voucher/AttributeCredential/credentialDetails',
      state: {
        dataAddress: row.address,
        name: row.name,
        dataTokenId: row.id,
        total: row.total,
        symbol: row.symbol
      },
    })
  }

  const putShelf = (row) => {

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

  return <div className="layout-box p-20 credential-inventory">
    <div className='details-name-box' style={{ marginBottom: '20px' }}>
      <div className='address'>
        <p>{t('credential.credentialContractName')}：XXXX</p>
        <p>{t('voucher.ContractAddress')}：xxxx</p>
      </div>
    </div>
    <div className="credential-inventory-search">
      <Button
        type="primary"
        className="plus-button"
        icon={<PlusOutlined />}
      >
        {t('voucher.PublishCredential')}
      </Button>
      <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('credential.credentialContractName')}`} />

    </div>
    <Table
      dataSource={tableData}
      columns={columns}
      rowKey={(record: any) => record.id}
      pagination={{
        // defaultCurrent: 1,
        current: curPage,
        defaultPageSize: pageSize,
        showSizeChanger: false,
        total: totalNum,
        onChange: OnPageChange,
      }}
    />
  </div>
}

export default CredentialInventory

