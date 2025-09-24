import React from 'react';
import { 
  ShoppingOutlined, 
  UserOutlined, 
  DollarOutlined, 
  ShoppingCartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  HeartOutlined
} from '@ant-design/icons';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    {
      title: '总销售额',
      value: '¥1,234,567',
      change: '+12.5%',
      changeType: 'positive',
      icon: <DollarOutlined />,
      color: '#52c41a'
    },
    {
      title: '订单数量',
      value: '8,456',
      change: '+8.2%',
      changeType: 'positive',
      icon: <ShoppingCartOutlined />,
      color: '#1890ff'
    },
    {
      title: '用户数量',
      value: '12,345',
      change: '+15.3%',
      changeType: 'positive',
      icon: <UserOutlined />,
      color: '#722ed1'
    },
    {
      title: '商品数量',
      value: '2,567',
      change: '-2.1%',
      changeType: 'negative',
      icon: <ShoppingOutlined />,
      color: '#fa8c16'
    }
  ];

  const recentOrders = [
    { id: 'ORD001', customer: '张三', amount: '¥299.00', status: '已完成', time: '2024-01-15 10:30' },
    { id: 'ORD002', customer: '李四', amount: '¥599.00', status: '处理中', time: '2024-01-15 09:45' },
    { id: 'ORD003', customer: '王五', amount: '¥199.00', status: '已完成', time: '2024-01-15 09:20' },
    { id: 'ORD004', customer: '赵六', amount: '¥899.00', status: '待发货', time: '2024-01-15 08:15' },
    { id: 'ORD005', customer: '钱七', amount: '¥399.00', status: '已完成', time: '2024-01-15 07:30' }
  ];

  const getStatusClass = (status) => {
    const statusMap = {
      '已完成': 'tag-success',
      '处理中': 'tag-info',
      '待发货': 'tag-warning'
    };
    return statusMap[status] || 'tag-info';
  };

  return (
    <div className="dashboard-container fade-in-up">
      <div className="page-header">
        <h1 className="page-title">仪表盘</h1>
        <p className="page-description">
          欢迎使用智能一体化电商零售运营管理平台，这里是您的数据概览中心
        </p>
      </div>

      <div className="dashboard-content">
        {/* 统计卡片 */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-header">
                <div>
                  <div className="stat-title">{stat.title}</div>
                  <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                </div>
                <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}20` }}>
                  {stat.icon}
                </div>
              </div>
              <div className={`stat-change ${stat.changeType}`}>
                {stat.changeType === 'positive' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* 最近订单 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">最近订单</h3>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>订单ID</th>
                    <th>客户</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.customer}</td>
                      <td className="order-amount">{order.amount}</td>
                      <td>
                        <span className={`tag ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="order-time">{order.time}</td>
                      <td>
                        <button className="btn btn-secondary action-btn">
                          <EyeOutlined />
                        </button>
                        <button className="btn btn-primary action-btn">
                          <HeartOutlined />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="quick-actions">
          <div className="card quick-action-card">
            <div className="action-icon">
              <ShoppingOutlined />
            </div>
            <h4>商品管理</h4>
            <p>管理商品信息和库存</p>
          </div>
          <div className="card quick-action-card">
            <div className="action-icon">
              <ShoppingCartOutlined />
            </div>
            <h4>订单处理</h4>
            <p>处理订单和发货</p>
          </div>
          <div className="card quick-action-card">
            <div className="action-icon">
              <UserOutlined />
            </div>
            <h4>用户管理</h4>
            <p>管理用户和权限</p>
          </div>
          <div className="card quick-action-card">
            <div className="action-icon">
              <DollarOutlined />
            </div>
            <h4>财务分析</h4>
            <p>查看财务数据</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
