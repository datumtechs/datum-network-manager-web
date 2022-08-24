import { FC, useState, useEffect } from "react";
import { Table, Tooltip, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import SearchBar from '@/layout/components/SearchBar'
import { CopyOutlined } from '@ant-design/icons'
import { copy, useAddressDisplay, UseAttrCredentialStatus } from '@/utils/utils'
import { voucher as voucherApi, resourceApi } from '@api/index'
import { connect } from 'react-redux'

const Attribute: FC<any> = (props: any) => {
  const [curPage, setCurPage] = useState(1)
  const [totalNum, setTotalNum] = useState(0)
  const [tableData, setTableData] = useState<any[]>([])
  const { t, i18n } = useTranslation()
  const pageSize = 10
  const [searchText, setSearchText] = useState("")
  const history = useHistory();
  const [modalLoading, setModalLoading] = useState(false)

  const bindData = async (row) => {
    try {
      const { wallet } = props.state.wallet
      const { walletConfig } = props.state
      setModalLoading(true)
      const address = await wallet.connectWallet(walletConfig)
      const metaDateDetails = await resourceApi.queryMetaDataDetail(row.metaDataDbId)
      const metaDateOptionData = await resourceApi.getMetaDataOption({ id: row.metaDataDbId })
      if (metaDateDetails.status !== 0) return setModalLoading(false)
      if (metaDateOptionData.status !== 0) return setModalLoading(false)
      const metaData = metaDateDetails.data

      const params = [
        metaData?.resourceName,
        metaData?.metaDataType,
        row?.dynamicFields?.dataHash,
        metaData?.remarks,
        metaData?.locationType,
        metaData?.metaDataType,
        String(metaData?.industry),
        // metaData?.status,
        2,
        metaDateOptionData.data,
      ]
      const data: any = { dataTokenId: row.id }
      const sign = await wallet.signData(params, address[0])
      data.sign = sign
      voucherApi.attrbindMetaData(data).then(res => {
        const { status } = res
        if (status == 0) {
          message.success(t('task.success'))
          query()
        }
      })
    } catch (e) {
      console.log(e);

    }

  }

  const columns: any[] = [
    {
      title: t(`common.Num`),
      render: (text, record, index) => `${(curPage - 1) * pageSize + (index + 1)}`,
      width: 60,
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
      render: (text, record, index) => record.dynamicFields?.metaDataName || '-'
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
              {useAddressDisplay(text)}
            </Tooltip>
          </>
          : '--'
    },
    {
      title: t('task.status'),
      dataIndex: 'usage',
      ellipsis: true,
      render: (text, record) => UseAttrCredentialStatus(record.status)
    },
    {
      title: t('common.actions'),
      dataIndex: 'actions',
      width: '220px',
      render: (text: any, row: any, index: any) => {
        // 定价状态：0-未定价，1-已定价
        return <>
          {!([0, 1, 2, 3, 8,].includes(row.status)) ? <>

            <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => create(row)}>  {t('credential.createCredential')}</Button>
            <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => inventory(row)}>  {t('credential.credentialInventory')}</Button>
          </> :
            <Button style={{ "paddingLeft": 0 }} type="link" onClick={() => bindData(row)}>  {t('credential.bindData')}</Button>}
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
        usage: row?.dynamicFields?.usage || -1
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
        usage: row?.dynamicFields?.usage || -1
      },
    })
  }


  const query = () => {
    voucherApi.queryAttributeList({
      pageNumber: curPage,
      pageSize: 10,
      keyword: searchText
    }).then((res) => {
      const { data, status } = res
      if (status === 0) {
        setTableData(data)
        setTotalNum(res.total)
      }
    })
  }

  useEffect(() => {
    query()
  }, [])

  useEffect(() => {
    query()
  }, [curPage, searchText])


  return <div className="layout-box">
    <SearchBar onSearch={setSearchText} placeholder={`${t('credential.pleaseEnter')}${t('credential.credentialContractName')}`} />
    <Table
      className="com-table com-table-lr-padding"
      dataSource={tableData}
      columns={columns}
      rowKey={(record: any) => record.publishHash}
      pagination={{
        // defaultCurrent: 1,
        current: curPage,
        defaultPageSize: pageSize,
        showSizeChanger: false,
        total: totalNum,
        onChange: setCurPage,
        showTotal: (total) => i18n.language == 'en' ? `${total} records in total` : `共 ${total} 条记录`
      }}
    />
  </div>
}

export default connect((state: any) => ({ state }))(Attribute)

