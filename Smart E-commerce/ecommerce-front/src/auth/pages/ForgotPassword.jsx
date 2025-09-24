import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Steps } from 'antd';
import { MailOutlined, CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  // 生成随机字母验证码
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput('');
  };

  // 组件加载时生成验证码
  useEffect(() => {
    generateCaptcha();
  }, []);

  const onFinish = async (values) => {
    // 验证验证码
    if (values.captcha !== captcha) {
      message.error('验证码错误，请重新输入');
      generateCaptcha(); // 重新生成验证码
      return;
    }

    setLoading(true);
    try {
      // TODO: 实现发送重置邮件逻辑
      console.log('重置密码邮箱:', values.email);
      setEmail(values.email);
      setCurrentStep(1);
      message.success('重置邮件已发送，请查收邮箱');
    } catch (error) {
      message.error('发送失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: '输入邮箱',
      description: '请输入您的注册邮箱'
    },
    {
      title: '查收邮件',
      description: '重置链接会发至您的邮箱'
    }
  ];

  return (
    <div className="auth-container">
      <div className="auth-left-panel">
        <div className="title-content">
          <h1 className="platform-title">Smart Integrated</h1>
          <p className="platform-subtitle">E-commerce Management Platform</p>
        </div>
      </div>
      <div className="auth-right-panel">
        <Card className="auth-card">
        <div className="auth-header">
          <Title level={2} className="auth-title">忘记密码</Title>
          <Text type="secondary">重置您的账户密码</Text>
        </div>

        <Steps
          current={currentStep}
          items={steps}
          className="forgot-password-steps"
        />

        {currentStep === 0 && (
          <Form
            name="forgotPassword"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '请输入有效的邮箱地址!' }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="请输入您的注册邮箱"
              />
            </Form.Item>

            <Form.Item
              name="captcha"
              rules={[
                { required: true, message: '请输入验证码!' },
                { len: 4, message: '验证码必须是4位字符!' }
              ]}
            >
              <div className="captcha-container">
                <Input
                  placeholder="请输入验证码"
                  className="captcha-input"
                  maxLength={4}
                />
                <div className="captcha-display">
                  <span className="captcha-text">
                    {captcha}
                  </span>
                  <ReloadOutlined 
                    onClick={generateCaptcha}
                    className="captcha-refresh"
                    title="刷新验证码"
                  />
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="auth-button"
                loading={loading}
                block
              >
                发送重置邮件
              </Button>
            </Form.Item>
          </Form>
        )}

        {currentStep === 1 && (
          <div className="success-message">
            <CheckCircleOutlined className="success-icon" />
            <Title level={4}>邮件已发送</Title>
            <Text>
              我们已向 <strong>{email}</strong> 发送了密码重置链接，
              请查收邮件并按照说明重置密码。
            </Text>
            <div className="success-actions">
              <Button type="link" onClick={() => setCurrentStep(0)}>
                重新发送
              </Button>
            </div>
          </div>
        )}

        <div className="auth-footer">
          <Text>
            记起密码了？ <Link to="/login">返回登录</Link>
          </Text>
        </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
