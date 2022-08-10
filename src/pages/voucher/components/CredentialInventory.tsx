import { FC, useState, useEffect } from "react";
import { Table, Tooltip, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/layout/components/SearchBar'
import { CopyOutlined, PlusOutlined } from '@ant-design/icons'
import { copy } from '@/utils/utils'
import { useHistory } from 'react-router-dom'
import voucher from '@api//voucher'

const CredentialInventory: FC<any> = (props: any) => {
  const [curPage, setCurPage] = useState(1),
    [totalNum, setTotalNum] = useState(0),
    [tableData, setTableData] = useState<any>([]),
    { t } = useTranslation(),
    pageSize = 10
  const history = useHistory();
  const { location } = props;
  const { dataAddress, name, dataTokenId } = location.state
  const [searchText, setSearchText] = useState("")
  const columns: any[] = [
    {
      title: t('common.Num'),
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 60,
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
      dataIndex: 'dataName',
      width: '15%',
      ellipsis: true,
      render: (text: any, row) => row.dynamicFields?.metaDataName || '-'
    },
    {
      title: t('credential.credentialId'),
      dataIndex: 'tokenId',
      ellipsis: true,
      width: '8%',
      render: (text: any) => <>#{text}</>
    },
    {
      title: t('center.usageScene'),
      dataIndex: 'usage',
      ellipsis: true,
      width: '15%',
      render: (text: any) => <>{text}</>
    },
    {
      title: t('credential.credentialValidityPeriod'),
      dataIndex: 'endTime',
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
          <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => { }}>  {t('credential.putShelf')}</Button>
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
      },
    })
  }

  const putShelf = () => {
    history.push({
      pathname: '/voucher/AttributeCredential/createCredential',
      state: {
        dataAddress,
        name,
        dataTokenId,
      },
    })
  }


  const query = () => {
    voucher.queryAttributeInventoryList({
      pageNumber: curPage,
      pageSize: 10,
      dataTokenAddress: dataAddress,
      keyword: searchText
    }).then((res) => {
      const { data, status } = res
      if (status === 0) {
        setTableData(data)
        setTotalNum(res.total)
      }
    })
  }

  useEffect(query, [])
  useEffect(query, [curPage, searchText])

  return <div className="layout-box p-20 credential-inventory">
    <div className='details-name-box' style={{ marginBottom: '20px' }}>
      <div className='address'>
        <p>{t('credential.credentialContractName')}：{name}</p>
        <p>{t('voucher.ContractAddress')}：{dataAddress}</p>
      </div>
    </div>
    <div className="credential-inventory-search">
      <Button
        type="primary"
        className="plus-button"
        onClick={putShelf}
        icon={<PlusOutlined />}
      >
        {t('voucher.PublishCredential')}
      </Button>
      <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('credential.credentialContractName')}`} />

    </div>
    <Table
      className="com-table"
      dataSource={tableData}
      columns={columns}
      rowKey={(record: any) => record.id}
      pagination={{
        current: curPage,
        defaultPageSize: pageSize,
        showSizeChanger: false,
        total: totalNum,
        onChange: setCurPage,
      }}
    />
  </div>
}

export default CredentialInventory

