
import { Form, Input, Button } from 'antd'
import './index.scss';
import imageBottom from "../../assets/images/1.bj3.png"
import square1 from "../../assets/images/1.img1.png"
import square2 from "../../assets/images/1.img2.png"
import square3 from "../../assets/images/1.img3.png"

export const Login = () => {
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log(values);
  }
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} 是必选字段',
  }
  /* eslint-enable no-template-curly-in-string */
  return (
    <div className="login-box">
      <img src={imageBottom} alt="" className="login-bottom-img" />

      <div className="login-form-box">
        <img src={square1} alt="" className="login-square-img1" />
        <img src={square2} alt="" className="login-square-img2" />
        <img src={square3} alt="" className="login-square-img3" />
        <p className="login-ball1" />
        <p className="login-ball2" />
        <p className="login-ball3" />
        <div className="text-box">
          <p className="p1">RosettaNet Console</p>
          <p className="p2">Privacy-preserving computing flatform enables data to flow like assets.</p>
          <p className="p3">The RosettaNet Console has satisfied the relevant requirements of laws and requirements.</p>
        </div>
        <div className="form-box">
          <p className="title">登录</p>
          <Form form={form} initialValues={{ remember: true }} className="content-box" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['login', 'account']} label="账号" rules={[{ required: true }]}>
              <Input bordered={false} placeholder="Account" className="login-form-height" />
            </Form.Item>
            <Form.Item name={['login', 'password']} label="密码" rules={[{ required: true }]}>
              <Input.Password visibilityToggle={false} size="large" bordered={false} placeholder="Password" className="login-form-height" />
            </Form.Item>
            <Form.Item name={['login', 'veriCode']} label="验证码" rules={[{ required: true }]}>
              <Input bordered={false} placeholder="Verification Code" className="login-form-height" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
              <Button block type="primary" htmlType="submit" className="login-form-height">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>)
}