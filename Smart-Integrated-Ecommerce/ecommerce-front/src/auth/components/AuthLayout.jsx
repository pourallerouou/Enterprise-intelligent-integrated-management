import React from 'react';
import { Layout } from 'antd';
import './AuthLayout.css';

const { Content } = Layout;

const AuthLayout = ({ children }) => {
  return (
    <Layout className="auth-layout">
      <Content className="auth-content">
        {children}
      </Content>
    </Layout>
  );
};

export default AuthLayout;
