import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { ThemeProvider } from './auth/contexts/ThemeContext';
import { AuthProvider, useAuth } from './auth/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import { Login, Register, ForgotPassword } from './auth';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import ProductBasicInfo from './pages/ProductManagement/ProductBasicInfo/ProductBasicInfo';
import SupplyChainInventory from './pages/SupplyChainInventory/SupplyChainInventory';
import OrderTransaction from './pages/OrderTransaction/OrderTransaction';
import MarketingManagement from './pages/MarketingManagement/MarketingManagement';
import PlatformManagement from './pages/PlatformManagement/PlatformManagement';
import UserManagement from './pages/UserManagement/UserManagement';
import DataCenter from './pages/DataCenter/DataCenter';
import FinancialManagement from './pages/FinancialManagement/FinancialManagement';
import SystemManagement from './pages/SystemManagement/SystemManagement';

const { Content } = Layout;

// 主应用组件
function MainApp() {
  const [collapsed, setCollapsed] = useState(false);
  const { loading } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // 如果正在加载认证状态，显示加载页面
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '16px' }}>加载中...</div>
          <div>正在验证身份信息</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar collapsed={collapsed} />
      <div className="main-content">
        <Header collapsed={collapsed} onToggle={toggleSidebar} />
        <Content className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/product-management/basic" element={<ProductBasicInfo />} />
            <Route path="/supply-chain-inventory" element={<SupplyChainInventory />} />
            <Route path="/order-transaction" element={<OrderTransaction />} />
            <Route path="/marketing-management" element={<MarketingManagement />} />
            <Route path="/platform-management" element={<PlatformManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/data-center" element={<DataCenter />} />
            <Route path="/financial-management" element={<FinancialManagement />} />
            <Route path="/system-management" element={<SystemManagement />} />
          </Routes>
        </Content>
      </div>
    </div>
  );
}

// 根应用组件
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* 认证页面 - 不需要登录 */}
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          } />
          <Route path="/forgot-password" element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPassword />
            </ProtectedRoute>
          } />
          
          {/* 主应用 - 需要登录 */}
          <Route path="/*" element={
            <ProtectedRoute requireAuth={true}>
              <MainApp />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;