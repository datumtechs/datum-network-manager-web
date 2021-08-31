/* eslint-disable no-nested-ternary */
import React, { FC, useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Spin, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Bread from '../../layout/components/Bread'
import './scss/index.scss'
import { BaseInfoContext } from '../../layout/index'
import { nodeApi } from '../../api/index'
import MyTag from '../../components/MyTag'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const DispatchConfig: FC<any> = (props: any) => {
  const [form] = Form.useForm()
  const { t, i18n } = useTranslation()
  const baseInfo = useContext(BaseInfoContext)
  const [editStatus, editStatusSet] = useState<boolean>(false) // 是否编辑状态

  const [hasService, setHasService] = useState<boolean>(false) // 是否已经连接
  const [showTestConnect, showTestConnectSet] = useState<boolean>(false) // 是否显示测试状态
  const [isConnect, setIsConnect] = useState<boolean>(false) // 测试是否可连接
  // const [showStatus, setShowStatus] = useState<boolean>(false)
  const [showJoinLoading, setshowJoinLoading] = useState<boolean>(false)
  const [showTestLoading, showTestLoadingSet] = useState<boolean>(false)

  const onFinish = () => {}
  const onFinishFailed = () => {}

  useEffect(() => {
    if (baseInfo.status === 1) {
      setHasService(false)
    } else {
      setHasService(true)
    }
    form.setFieldsValue({
      carrierIp: baseInfo.carrierIp,
      carrierPort: baseInfo.carrierPort,
    })
  }, [baseInfo.status])

  const testServiceFn = () => {
    showTestLoadingSet(true)
    form
      .validateFields()
      .then(values => {
        console.log(values)
        const { errorFields } = values
        if (errorFields) return
        const { carrierIp, carrierPort } = form.getFieldsValue()
        nodeApi.connectNode({ ip: carrierIp, port: carrierPort }).then(res => {
          showTestLoadingSet(false)
          showTestConnectSet(true)
          if (res.status === 0 && res.data.carrierConnStatus === 'enabled') {
            setIsConnect(true)
          } else {
            setIsConnect(false)
          }
        })
      })
      .catch(err => {
        console.log(err)
      })

    // 192.168.21.164:4444
  }

  const joinNetwork = () => {
    setshowJoinLoading(true)
    form
      .validateFields()
      .then(values => {
        console.log(values)
        const { errorFields } = values
        if (errorFields) return
        const { carrierIp, carrierPort } = form.getFieldsValue()
        nodeApi.applyJoinNetwork().then(res => {
          setshowJoinLoading(false)
          if (res.status === 0) {
            // TODO:  临时解决办法 使用5秒后拉取最新状态的方式解决延迟的问题
            message.success(`${t('tip.joinNetworkSuccess')}`)
          } else {
            message.error(`${t('tip.joinNetworkFailed')}`)
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const missNetwork = () => {
    // const { ip, port } = form.getFieldsValue()
    nodeApi.withDrawNetwork().then(res => {
      if (res.status === 0) {
        message.success(`${t('node.logoutSuccess')}`)
      } else {
        message.error(`${t('node.logoutFailed')}`)
      }
    })
  }

  const switchEditStatus = (boolean: boolean) => {
    editStatusSet(boolean)
    if (boolean === false) showTestConnectSet(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  }

  return (
    <>
      <div className="layout-box">
        <div className="tip-box">{t('node.noRepeatSeedName')}</div>
        <div className="form-box">
          <Form
            size="large"
            name="basic"
            form={form}
            labelAlign="left"
            labelCol={{ style: { width: i18n.language === 'en' ? 180 : 160, whiteSpace: 'pre-wrap' } }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item colon label={t('common.orgName')} name="name" className="form-item">
              <p className="title">{baseInfo.name}</p>
            </Form.Item>
            <Form.Item colon label={t('common.orgIdentify')} name="identityId" className="form-item">
              <p className="title">{baseInfo.identityId}</p>
            </Form.Item>
            <Form.Item colon label={t('common.internalIP')} className="form-item">
              <div className="form-group">
                <Form.Item
                  name="carrierIp"
                  rules={[{ required: true, message: `${t('login.plzinput')}${t('dataNodeMgt.internalIP')}` }]}
                >
                  <Input disabled={hasService && !editStatus} className="form-box-input" />
                </Form.Item>
                {hasService ? (
                  editStatus ? (
                    <div className="pointer form-group-btn black-btn" onClick={() => switchEditStatus(false)}>
                      {t('common.cancel')}
                    </div>
                  ) : (
                    <div className="pointer form-group-btn black-btn" onClick={() => switchEditStatus(true)}>
                      {t('common.edit')}
                    </div>
                  )
                ) : (
                  ''
                )}
              </div>
            </Form.Item>
            <Form.Item colon label={t('common.internalPort')} name="carrierPort" className="form-item">
              <div className="form-group">
                <Form.Item
                  name="carrierPort"
                  rules={[{ required: true, message: `${t('login.plzinput')}${t('dataNodeMgt.internalPort')}` }]}
                >
                  <Input disabled={hasService && !editStatus} className="form-box-input" />
                </Form.Item>
                {hasService ? (
                  editStatus ? (
                    <div className="pointer form-group-btn black-btn" onClick={() => switchEditStatus(false)}>
                      {t('common.cancel')}
                    </div>
                  ) : (
                    <div className="pointer form-group-btn black-btn" onClick={() => switchEditStatus(true)}>
                      {t('common.edit')}
                    </div>
                  )
                ) : (
                  ''
                )}
              </div>
            </Form.Item>

            {/* 以上为 ip port 以下为按钮操作 */}

            {hasService ? ( // 是否已经连接
              <>
                <Form.Item colon label={t('common.status')} className="form-item">
                  <div className="form-group">
                    {/* 重新连接调度服务 */}
                    {editStatus ? (
                      <Button loading={showTestLoading} onClick={testServiceFn}>
                        {t('node.reConnectService')}
                      </Button>
                    ) : (
                      ''
                    )}
                    {editStatus ? (
                      showTestConnect ? (
                        isConnect ? (
                          <MyTag content={`${t('node.connectSuccess')}`} bgColor="#B7EB8F" color="#45B854" />
                        ) : (
                          <MyTag content={`${t('node.connenctFailed')}`} bgColor="#FFA39E" color="#F45564" />
                        )
                      ) : (
                        <MyTag
                          content={`${t('node.unconnected')}`}
                          bgColor="#C9C9C9"
                          color="#FFFFFF"
                          border="#999999"
                        />
                      )
                    ) : (
                      <MyTag content={`${t('node.connectSuccess')}`} bgColor="#B7EB8F" color="#45B854" />
                    )}
                  </div>
                </Form.Item>
                <Form.Item colon label={t('overview.connectNum')} className="form-item">
                  {editStatus ? <span className="title">N/A</span> : <span className="title">22</span>}
                </Form.Item>
                <Form.Item className="form-item">
                  <Button
                    type="primary"
                    style={{ marginLeft: i18n.language === 'en' ? 180 : 160 }}
                    onClick={missNetwork}
                  >
                    {t('node.writeOffNetwork')}
                  </Button>
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item className="form-item">
                  <div className="form-group">
                    <Button
                      loading={showTestLoading}
                      style={{ marginLeft: i18n.language === 'en' ? 180 : 160 }}
                      onClick={testServiceFn}
                    >
                      {t('node.connectService')}
                    </Button>

                    {showTestConnect ? (
                      isConnect ? (
                        <MyTag content={`${t('node.connectSuccess')}`} bgColor="#B7EB8F" color="#45B854" />
                      ) : (
                        <MyTag content={`${t('node.connenctFailed')}`} bgColor="#FFA39E" color="#F45564" />
                      )
                    ) : (
                      <MyTag content={`${t('node.unconnected')}`} bgColor="#C9C9C9" color="#FFFFFF" border="#999999" />
                    )}
                  </div>
                </Form.Item>
                <Form.Item className="form-item">
                  {showJoinLoading ? (
                    <Button
                      loading
                      disabled={!isConnect}
                      style={{ marginLeft: i18n.language === 'en' ? 180 : 160 }}
                      onClick={joinNetwork}
                    >
                      {t('overview.inProgress')}
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      disabled={!isConnect}
                      style={{ marginLeft: i18n.language === 'en' ? 180 : 160 }}
                      onClick={joinNetwork}
                    >
                      {t('overview.submit')}
                    </Button>
                  )}
                </Form.Item>
              </>
            )}
            {/* <Form.Item label={t('common.status')} name="username" className="form-item">
              <Input className="form-box-input" placeholder={t('common.noModify')} />
            </Form.Item> */}
            {/* <Form.Item>
              {hasService ? (
                <>
                  <Button
                    type="primary"
                    className="btn submit-btn"
                    style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                    onClick={testServiceFn}
                  >
                    {t('node.reConnectService')}
                  </Button>
                  {showLoading ? (
                    <Spin className="loading-icon" indicator={antIcon} />
                  ) : showStatus ? (
                    isConnect ? (
                      <span className="success_color status">{t('node.connectSuccess')}</span>
                    ) : (
                      <span className="failed_color status">{t('node.connenctFailed')}</span>
                    )
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    className="btn submit-btn"
                    onClick={testServiceFn}
                    style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                  >
                    {t('node.connectService')}
                  </Button>
                  {showLoading ? (
                    <Spin className="loading-icon" indicator={antIcon} />
                  ) : showStatus ? (
                    isConnect ? (
                      <span className="success_color status">{t('node.connectSuccess')}</span>
                    ) : (
                      <span className="failed_color status">{t('node.connenctFailed')}</span>
                    )
                  ) : (
                    ''
                  )}
                </>
              )}
            </Form.Item>
            <Form.Item> */}
            {/* {hasService ? (
                <Button
                  type="primary"
                  className="btn submit-btn"
                  onClick={missNetwork}
                  style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                  htmlType="submit"
                >
                  {t('node.logoutNetwork')}
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    disabled={!isConnect}
                    className="btn submit-btn"
                    onClick={joinNetwork}
                    style={{ marginLeft: i18n.language === 'en' ? 180 : 120 }}
                    htmlType="submit"
                  >
                    {t('overview.submit')}
                  </Button>
                </>
              )}
            </Form.Item> */}
          </Form>
        </div>
      </div>
    </>
  )
}

export default connect(
  (state: any) => ({ state }),
  (dispatch: any) => ({
    setBaseInfoStatus: (data: boolean) => {
      dispatch({
        type: 'SET_BASEINFO_STATUS',
        data,
      })
    },
  }),
)(DispatchConfig)
