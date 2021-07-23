import { FC } from 'react'
import { Descriptions, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ComputingTable: FC<any> = (props: any) => {
  const history = useHistory()
  const pagination = {
    current: 1,
    defaultPageSize: 10,
  }
  const { t } = useTranslation()
  const linkToDetail = () => {
    history.push('/tasks/taskDetail')
  }
  const linkToEvent = () => {
    history.push('/tasks/TaskEvent')
  }
  const columns = [
    {
      title: 'No.',
      width: 50,
      render: (text, record, index) => `${(pagination.current - 1) * pagination.defaultPageSize + (index + 1)}`,
    },

    {
      title: t('task.name'),
      dataIndex: 'nodeName',
    },
    {
      title: t('task.identity'),
      dataIndex: 'nodeIdentityId',
    },
    {
      title: t('task.occupiedResources'),
      dataIndex: 'usedCore',
      render: (text, record, index) => {
        return (
          <ul className="power-occupied-item">
            <li>
              {t('overview.cpu')}: {record.usedCore}
            </li>
            <li>
              {t('overview.memory')}: {record.usedMemory}
            </li>
            <li>
              {t('overview.bandwidth')}: {record.usedBandwidth}
            </li>
          </ul>
        )
      },
    },
  ]
  return (
    <div className="table-box">
      <Table dataSource={props.tableData} columns={columns} rowKey={_ => _.nodeIdentityId} bordered />
    </div>
  )
}

export default ComputingTable
