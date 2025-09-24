import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  SettingOutlined,
  UserOutlined,
  BarChartOutlined,
  DollarOutlined,
  ControlOutlined,
  DownOutlined
} from '@ant-design/icons';

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘',
    children: []
  },
  {
    key: '/product-management',
    icon: <ShoppingOutlined />,
    label: '商品管理',
    children: [
      { key: '/product-management/basic', label: '商品基础信息管理' },
      { key: '/product-management/lifecycle', label: '商品生命周期管理' }
    ]
  },
  {
    key: '/supply-chain-inventory',
    icon: <DatabaseOutlined />,
    label: '供应链与库存',
    children: [
      { key: '/supply-chain-inventory/supplier', label: '供应商管理' },
      { key: '/supply-chain-inventory/procurement', label: '采购管理' },
      { key: '/supply-chain-inventory/warehouse', label: '仓储管理' },
      { key: '/supply-chain-inventory/logistics', label: '物流与派送' }
    ]
  },
  {
    key: '/order-transaction',
    icon: <ShoppingCartOutlined />,
    label: '订单交易',
    children: [
      { key: '/order-transaction/center', label: '订单中心' },
      { key: '/order-transaction/payment', label: '支付管理' },
      { key: '/order-transaction/services', label: '订单服务' }
    ]
  },
  {
    key: '/marketing-management',
    icon: <GiftOutlined />,
    label: '营销管理',
    children: [
      { key: '/marketing-management/activities', label: '营销活动' },
      { key: '/marketing-management/advertising', label: '广告推广' }
    ]
  },
  {
    key: '/platform-management',
    icon: <SettingOutlined />,
    label: '平台管理',
    children: [
      { key: '/platform-management/self-operated', label: '自营平台' },
      { key: '/platform-management/third-party', label: '三方平台' }
    ]
  },
  {
    key: '/user-management',
    icon: <UserOutlined />,
    label: '客户管理',
    children: [
      { key: '/user-management/info', label: '客户信息管理' },
      { key: '/user-management/membership', label: '会员管理' }
    ]
  },
  {
    key: '/data-center',
    icon: <BarChartOutlined />,
    label: '数据中心',
    children: [
      { key: '/data-center/operations', label: '经营分析' },
      { key: '/data-center/products', label: '商品分析' },
      { key: '/data-center/users', label: '用户分析' },
      { key: '/data-center/marketing', label: '营销分析' },
      { key: '/data-center/dashboard', label: '看板中心' }
    ]
  },
  {
    key: '/financial-management',
    icon: <DollarOutlined />,
    label: '财务管理',
    children: [
      { key: '/financial-management/income-expense', label: '收入支出管理' },
      { key: '/financial-management/cost-accounting', label: '成本核算' },
      { key: '/financial-management/profit', label: '利润管理' },
      { key: '/financial-management/budget', label: '预算管理' },
      { key: '/financial-management/tax', label: '税务管理' }
    ]
  },
  {
    key: '/system-management',
    icon: <ControlOutlined />,
    label: '系统管理',
    children: [
      { key: '/system-management/authorization', label: '授权管理' },
      { key: '/system-management/basic-data', label: '基础数据管理' },
      { key: '/system-management/logs', label: '操作日志' },
      { key: '/system-management/config', label: '系统配置' },
      { key: '/system-management/multilang', label: '多语言' }
    ]
  },
];

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState(new Set());
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const handleMenuClick = (item) => {
    // 总是导航到一级菜单页面
    navigate(item.key);
  };

  const handleMenuToggle = (item, e) => {
    e.stopPropagation(); // 阻止事件冒泡，避免触发菜单点击
    if (item.children && item.children.length > 0) {
      // 切换展开状态
      const newExpandedMenus = new Set(expandedMenus);
      if (newExpandedMenus.has(item.key)) {
        newExpandedMenus.delete(item.key);
      } else {
        newExpandedMenus.add(item.key);
      }
      setExpandedMenus(newExpandedMenus);
    }
  };

  const handleArrowMouseEnter = (item) => {
    if (item.children && item.children.length > 0) {
      setHoveredMenu(item.key);
      // 自动展开二级菜单
      if (!expandedMenus.has(item.key)) {
        setExpandedMenus(prev => new Set([...prev, item.key]));
      }
    }
  };

  const handleArrowMouseLeave = () => {
    setHoveredMenu(null);
  };

  const handleSubMenuClick = (subItem) => {
    navigate(subItem.key);
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {collapsed ? '🛒' : '🛒 Smart E-commerce'}
        </div>
        <div className="sidebar-menu">
          {menuItems.map(item => (
            <div key={item.key} className="menu-group">
              <div
                className={`menu-item ${location.pathname === item.key ? 'active' : ''} ${
                  expandedMenus.has(item.key) ? 'expanded' : ''
                }`}
                onClick={() => handleMenuClick(item)}
              >
                <div className="menu-item-content">
                  <span className="menu-item-icon">{item.icon}</span>
                  <span className="menu-item-label">{item.label}</span>
                  {item.children && item.children.length > 0 && !collapsed && (
                    <div 
                      className={`menu-item-arrow-container ${expandedMenus.has(item.key) ? 'expanded' : ''}`}
                      onClick={(e) => handleMenuToggle(item, e)}
                      onMouseEnter={() => handleArrowMouseEnter(item)}
                      onMouseLeave={handleArrowMouseLeave}
                    >
                      <DownOutlined />
                    </div>
                  )}
                </div>
              </div>
              
              {/* 二级菜单 - 在侧边栏内部展开 */}
              {item.children && item.children.length > 0 && expandedMenus.has(item.key) && (
                <div className="submenu-inline">
                  {item.children.map(subItem => (
                    <div
                      key={subItem.key}
                      className={`submenu-item ${
                        location.pathname === subItem.key ? 'active' : ''
                      }`}
                      onClick={() => handleSubMenuClick(subItem)}
                    >
                      <span className="submenu-bullet">•</span>
                      <span className="submenu-label">{subItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
