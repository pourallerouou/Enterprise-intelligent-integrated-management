import React, { useState } from 'react';
import './OrderTransaction.css';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const OrderTransaction = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders = [
    {
      id: 'ORD001',
      customer: '张三',
      customerPhone: '138-0000-0001',
      products: '智能手机 Pro Max x1',
      totalAmount: 5999,
      paymentMethod: '微信支付',
      paymentStatus: '已支付',
      orderStatus: '已完成',
      orderDate: '2024-01-15 10:30:00',
      deliveryDate: '2024-01-16 14:30:00',
      shippingAddress: '北京市朝阳区xxx街道xxx号'
    },
    {
      id: 'ORD002',
      customer: '李四',
      customerPhone: '138-0000-0002',
      products: '无线蓝牙耳机 x2',
      totalAmount: 598,
      paymentMethod: '支付宝',
      paymentStatus: '已支付',
      orderStatus: '处理中',
      orderDate: '2024-01-15 09:45:00',
      deliveryDate: '待发货',
      shippingAddress: '上海市浦东新区xxx路xxx号'
    },
    {
      id: 'ORD003',
      customer: '王五',
      customerPhone: '138-0000-0003',
      products: '运动鞋 x1',
      totalAmount: 399,
      paymentMethod: '银行卡',
      paymentStatus: '已支付',
      orderStatus: '待发货',
      orderDate: '2024-01-15 09:20:00',
      deliveryDate: '待发货',
      shippingAddress: '广州市天河区xxx大道xxx号'
    },
    {
      id: 'ORD004',
      customer: '赵六',
      customerPhone: '138-0000-0004',
      products: '笔记本电脑 x1',
      totalAmount: 8999,
      paymentMethod: '微信支付',
      paymentStatus: '待支付',
      orderStatus: '待支付',
      orderDate: '2024-01-15 08:15:00',
      deliveryDate: '待支付',
      shippingAddress: '深圳市南山区xxx路xxx号'
    },
    {
      id: 'ORD005',
      customer: '钱七',
      customerPhone: '138-0000-0005',
      products: '咖啡机 x1',
      totalAmount: 1299,
      paymentMethod: '支付宝',
      paymentStatus: '已支付',
      orderStatus: '已取消',
      orderDate: '2024-01-15 07:30:00',
      deliveryDate: '已取消',
      shippingAddress: '杭州市西湖区xxx街xxx号'
    }
  ];

  const getPaymentStatusClass = (status) => {
    const statusMap = {
      '已支付': 'tag-success',
      '待支付': 'tag-warning',
      '支付失败': 'tag-error'
    };
    return statusMap[status] || 'tag-info';
  };

  const getOrderStatusClass = (status) => {
    const statusMap = {
      '已完成': 'tag-success',
      '处理中': 'tag-info',
      '待发货': 'tag-warning',
      '待支付': 'tag-warning',
      '已取消': 'tag-error'
    };
    return statusMap[status] || 'tag-info';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      '已完成': <CheckCircleOutlined />,
      '处理中': <ClockCircleOutlined />,
      '待发货': <ClockCircleOutlined />,
      '待支付': <ExclamationCircleOutlined />,
      '已取消': <ExclamationCircleOutlined />
    };
    return iconMap[status] || <ClockCircleOutlined />;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || order.orderStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.orderStatus === '已完成').length;
  const pendingOrders = orders.filter(o => o.orderStatus === '处理中' || o.orderStatus === '待发货').length;
  const totalRevenue = orders.filter(o => o.paymentStatus === '已支付').reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">订单交易</h1>
        <p className="page-description">
          管理订单状态、支付信息、发货跟踪等订单交易相关数据
        </p>
      </div>

      <div className="page-content">
        {/* 统计概览 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总订单数</div>
            <div className="stat-value">
              {totalOrders}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">已完成订单</div>
            <div className="stat-value">
              {completedOrders}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">待处理订单</div>
            <div className="stat-value">
              {pendingOrders}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">总交易额</div>
            <div className="stat-value">
              ¥{totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="card">
          <div className="card-body">
            <div className="input-group">
              <div className="stats-grid">
                <input
                  type="text"
                  className="input-field"
                  placeholder="搜索订单ID、客户姓名或电话..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchOutlined />
              </div>
              <select
                className="input-field"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">全部状态</option>
                <option value="已完成">已完成</option>
                <option value="处理中">处理中</option>
                <option value="待发货">待发货</option>
                <option value="待支付">待支付</option>
                <option value="已取消">已取消</option>
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                新建订单
              </button>
            </div>
          </div>
        </div>

        {/* 订单列表 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">订单列表</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>订单信息</th>
                    <th>客户信息</th>
                    <th>商品信息</th>
                    <th>金额</th>
                    <th>支付状态</th>
                    <th>订单状态</th>
                    <th>下单时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order.id}>
                      <td>
                        <div>
                          <div className="stats-grid">
                            {order.id}
                          </div>
                          <div className="stats-grid">
                            {order.paymentMethod}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="stats-grid">
                            {order.customer}
                          </div>
                          <div className="stats-grid">
                            {order.customerPhone}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stats-grid">
                          {order.products}
                        </div>
                        <div className="stats-grid">
                          {order.shippingAddress}
                        </div>
                      </td>
                      <td>
                        ¥{order.totalAmount.toLocaleString()}
                      </td>
                      <td>
                        <span className={`tag ${getPaymentStatusClass(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`tag ${getOrderStatusClass(order.orderStatus)}`}>
                          {getStatusIcon(order.orderStatus)}
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>
                        {order.orderDate}
                      </td>
                      <td>
                        <div className="stats-grid">
                          <button className="btn btn-secondary" title="查看详情">
                            <EyeOutlined />
                          </button>
                          <button className="btn btn-primary" title="编辑">
                            <EditOutlined />
                          </button>
                          <button className="btn btn-danger" title="删除">
                            <DeleteOutlined />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="stats-grid">
          <div className="card">
            <div className="stats-grid">
              <CheckCircleOutlined />
            </div>
            <h4>订单处理</h4>
            <p>处理待发货订单</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <ShoppingCartOutlined />
            </div>
            <h4>发货管理</h4>
            <p>管理物流和发货</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <ClockCircleOutlined />
            </div>
            <h4>退款处理</h4>
            <p>处理退款申请</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <ExclamationCircleOutlined />
            </div>
            <h4>异常订单</h4>
            <p>处理异常订单</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTransaction;
