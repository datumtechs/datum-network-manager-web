import './index.less'
import { Form, Input, Button } from 'antd'

export const Login = () => {

  const onFinish = (values: any) => {
    console.log(values);
  }
  const validateMessages = {
    required: `${name} 是必选字段`,
  }
  return (
    <div className="login-box">
      <div className="login-form-box">
        <div className="text-box">
          <p className="p1">RosettaNet Console</p>
          <p className="p2">Privacy-preserving computing flatform enables data to flow like assets.</p>
          <p className="p3">The RosettaNet Console has satisfied the relevant requirements of laws and requirements.</p>
        </div>
        <div className="form-box">
          <p className="title">登录</p>
          <Form className="content-box" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'password']} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'veriCode']} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
              <Button block type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>)
}