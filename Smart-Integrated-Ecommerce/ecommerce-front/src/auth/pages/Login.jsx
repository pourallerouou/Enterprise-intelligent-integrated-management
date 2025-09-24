import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 如果已经登录，重定向到目标页面或主页
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await login(values);
      if (result.success) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Title level={2} className="auth-title">登录</Title>
          <Text type="secondary">欢迎回来，请登录您的账户</Text>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { min: 3, message: '用户名至少3个字符!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码至少6个字符!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <div className="forgot-password-link">
            <Link to="/forgot-password">
              忘记密码？
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="auth-button"
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <Text>
            还没有账户？ <Link to="/register">立即注册</Link>
          </Text>
        </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
