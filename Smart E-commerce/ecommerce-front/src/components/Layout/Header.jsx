import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, SettingOutlined, LogoutOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../../auth/contexts/ThemeContext';
import { useAuth } from '../../auth/contexts/AuthContext';

const Header = ({ collapsed, onToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  const getBreadcrumb = () => {
    const path = window.location.pathname;
    const pathMap = {
      '/dashboard': '仪表盘',
      '/product-management': '商品管理',
      '/supply-chain-inventory': '供应链与库存',
      '/order-transaction': '订单交易',
      '/marketing-management': '营销管理',
      '/platform-management': '平台管理',
      '/user-management': '客户管理',
      '/data-center': '数据中心',
      '/financial-management': '财务管理',
      '/system-management': '系统管理',
    };
    return pathMap[path] || '仪表盘';
  };

  return (
    <div className="header">
      <div className="header-left">
        <button className="toggle-button" onClick={onToggle}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        <div className="breadcrumb">
          当前位置：{getBreadcrumb()}
        </div>
      </div>
      <div className="header-right">
        <button className="btn btn-secondary" onClick={toggleTheme} title={`切换到${theme === 'light' ? '深色' : '浅色'}主题`}>
          {theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
        </button>
        <div className="user-info">
          <div className="user-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <UserOutlined />
            )}
          </div>
          <div className="user-name">{user?.name || '用户'}</div>
        </div>
        <button className="btn btn-secondary">
          <SettingOutlined />
        </button>
        <button className="btn btn-danger" onClick={logout}>
          <LogoutOutlined />
        </button>
      </div>
    </div>
  );
};

export default Header;
