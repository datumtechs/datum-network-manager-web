import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Table, Space } from 'antd'
import MyModal from '../../../../components/MyModal'

const DetailTable: FC<any> = (props: any) => {
  const { t } = useTranslation()
  const history = useHistory()
  const { type } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const handleOk = () => {}
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const modifyFn = () => {}

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      visible: 32,
      dataType: '西湖区湖底公园1号',
      remarks: 'Unpublished',
    },
    {
      key: '2',
      name: '胡彦祖',
      visible: 42,
      dataType: '西湖区湖底公园1号',
      remarks: 'Published',
    },
  ]
  const columns = [
    {
      title: '',
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },
    {
      title: t('center.fileField'),
      dataIndex: 'name',
      width: '20%',
      key: 'name',
    },
    {
      title: t('myData.visible'),
      dataIndex: 'visible',
      key: 'visible',
    },
    {
      title: t('center.dataType'),
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: t('center.remarks'),
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ]
  return (
    <div className="data-table-box">
      <Table dataSource={dataSource} columns={columns} bordered />
      <MyModal width={600} title={t('common.tips')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{t('center.confirmWithdraw')}:333333333333333333333</p>
      </MyModal>
    </div>
  )
}

export default DetailTable
