import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space } from 'antd'
import MyModal from '../../../../components/MyModal'

const MyDataTable: FC<any> = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const [type, setType] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOk = () => { }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const viewFn = () => {
    history.push('/resource/myData/dataDetail')
  }

  const modifyFn = () => {
    history.push('/resource/myData/infoModify')
  }
  const publishFn = () => {
    setType('pulish')
    setIsModalVisible(true)
  }
  const deleteFn = () => {
    setType('delete')
    setIsModalVisible(true)
  }
  const withDrawFn = () => {
    setType('withdraw')
    setIsModalVisible(true)
  }

  const downloadFn = () => { }

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      metaFiled: 32,
      metaStatus: '西湖区湖底公园1号',
      status: 'Unpublished'
    },
    {
      key: '2',
      name: '胡彦祖',
      metaFiled: 42,
      metaStatus: '西湖区湖底公园1号',
      status: 'Published'
    },
  ]
  const columns = [
    {
      title: t('center.metaName'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('center.metaStatus'),
      dataIndex: 'metaStatus',
      key: 'metaStatus',
    },
    {
      title: t('center.metaFiled'),
      dataIndex: 'metaFiled',
      key: 'metaFiled',
    },
    {
      title: t('common.operations'),
      width: 500,
      dataIndex: 'operations',
      key: 'operations',
      render: (text: any, row: any, index: any) => {
        console.log('row', row)
        return (
          <Space size={10} className="operation-box">

            {row.status === 'Published' ? (
              <>
                <span className="btn pointer link" onClick={viewFn}>
                  {t('center.view')}
                </span>
                <span className="btn pointer link" onClick={downloadFn}>
                  {t('center.download')}
                </span>
                <span className="btn pointer link" onClick={withDrawFn}>
                  {t('center.withdraw')}
                </span>
              </>
            ) : (
              <></>
            )}
            {row.status === 'Unpublished' ? (
              <>
                <span className="btn pointer link" onClick={viewFn}>
                  {t('center.view')}
                </span>
                <span className="btn pointer link" onClick={modifyFn}>
                  {t('center.modify')}
                </span>
                <span className="btn pointer link" onClick={downloadFn}>
                  {t('center.download')}
                </span>
                <span className="btn pointer link" onClick={publishFn}>
                  {t('center.publish')}
                </span>
                <span className="btn pointer link" onClick={deleteFn}>
                  {t('center.delete')}
                </span>
              </>
            ) : (
              <></>
            )}
          </Space>
        )
      },
    },
  ]
  return (
    <div className="data-table-box">
      <Table dataSource={dataSource} columns={columns} />
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {type === 'delete' ? (
          <p>
            {t('center.confirmDelete')}:111111111111111111
          </p>
        ) : (
          ''
        )}
        {type === 'publish' ? (
          <p>
            {t('center.confirmPublish')}:222222222222222222
          </p>
        ) : (
          ''
        )}
        {type === 'withdraw' ? (
          <p>
            {t('center.confirmWithdraw')}:333333333333333333333
          </p>
        ) : (
          ''
        )}
      </MyModal>
    </div>
  )
}

export default MyDataTable
