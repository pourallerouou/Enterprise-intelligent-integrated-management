import React, { useState } from 'react';
import './FinancialManagement.css';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  RiseOutlined
} from '@ant-design/icons';

const FinancialManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const transactions = [
    {
      id: 'TXN001',
      type: '收入',
      category: '商品销售',
      amount: 2999.00,
      status: '已完成',
      date: '2024-01-15 10:30:00',
      description: '智能手机销售',
      orderId: 'ORD001',
    },
    {
      id: 'TXN002',
      type: '支出',
      category: '广告费用',
      amount: -5000.00,
      status: '已完成',
      date: '2024-01-15 09:45:00',
      description: '百度推广费用',
      orderId: '-',
    },
    {
      id: 'TXN003',
      type: '收入',
      category: '商品销售',
      amount: 1599.00,
      status: '处理中',
      date: '2024-01-14 16:45:00',
      description: '笔记本电脑销售',
      orderId: 'ORD002',
    },
    {
      id: 'TXN004',
      type: '支出',
      category: '运营成本',
      amount: -2000.00,
      status: '已完成',
      date: '2024-01-14 14:20:00',
      description: '服务器租赁费用',
      orderId: '-',
    },
  ];

  const getTypeColor = (type) => {
    return type === '收入' ? '#52c41a' : '#f5222d';
  };

  const getStatusColor = (status) => {
    const colors = {
      '已完成': 'tag-success',
      '处理中': 'tag-info',
      '失败': 'tag-error',
    };
    return colors[status] || 'tag-info';
  };

  const getCategoryColor = (category) => {
    const colors = {
      '商品销售': 'tag-info',
      '广告费用': 'tag-warning',
      '运营成本': 'tag-error',
      '退款': 'tag-error',
    };
    return colors[category] || 'tag-info';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalIncome = transactions.filter(t => t.type === '收入').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === '支出').reduce((sum, t) => sum + t.amount, 0));
  const netProfit = totalIncome - totalExpense;
  const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0;

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">财务管理</h1>
        <p className="page-description">
          管理财务流水，包括收入、支出、利润分析等财务数据
        </p>
      </div>

      <div className="page-content">
        {/* 财务概览 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总收入</div>
            <div className="stat-value">
              ¥{totalIncome.toLocaleString()}
            </div>
            <div className="stat-change positive">
              <ArrowUpOutlined />
              15.6%
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">总支出</div>
            <div className="stat-value">
              ¥{totalExpense.toLocaleString()}
            </div>
            <div className="stat-change negative">
              <ArrowUpOutlined />
              8.2%
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">净利润</div>
            <div className="stat-value">
              ¥{netProfit.toLocaleString()}
            </div>
            <div className="stat-change positive">
              <ArrowUpOutlined />
              25.3%
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">利润率</div>
            <div className="stat-value">
              {profitMargin}%
            </div>
            <div className="stat-change positive">
              <ArrowUpOutlined />
              3.2%
            </div>
          </div>
        </div>

        {/* 支出分析 */}
        <div className="stats-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">支出分析</h3>
            </div>
            <div className="card-body">
              <div className="stats-grid">
                <div className="progress-label">广告费用</div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-text">¥382,500 / ¥850,000</div>
              </div>
              <div className="stats-grid">
                <div className="progress-label">运营成本</div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-text">¥255,000 / ¥850,000</div>
              </div>
              <div>
                <div className="progress-label">其他费用</div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-text">¥212,500 / ¥850,000</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">收入分析</h3>
            </div>
            <div className="card-body">
              <div className="stats-grid">
                <div className="progress-label">商品销售</div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-text">¥1,000,000 / ¥1,250,000</div>
              </div>
              <div className="stats-grid">
                <div className="progress-label">服务费用</div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-text">¥187,500 / ¥1,250,000</div>
              </div>
              <div>
                <div className="progress-label">其他收入</div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-text">¥62,500 / ¥1,250,000</div>
              </div>
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
                  placeholder="搜索交易ID或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchOutlined />
              </div>
              <select 
                className="input-field" 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">全部类型</option>
                <option value="收入">收入</option>
                <option value="支出">支出</option>
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                添加交易
              </button>
            </div>
          </div>
        </div>

        {/* 交易记录 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">交易记录</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>交易ID</th>
                    <th>类型</th>
                    <th>分类</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>关联订单</th>
                    <th>描述</th>
                    <th>时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                      <td>
                        {transaction.id}
                      </td>
                      <td>
                        <span className="tag" style={{ color: getTypeColor(transaction.type) }}>
                          {transaction.type}
                        </span>
                      </td>
                      <td>
                        <span className={`tag ${getCategoryColor(transaction.category)}`}>
                          {transaction.category}
                        </span>
                      </td>
                      <td>
                        {transaction.amount > 0 ? '+' : ''}¥{transaction.amount.toFixed(2)}
                      </td>
                      <td>
                        <span className={`tag ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td>
                        {transaction.orderId !== '-' ? (
                          <button className="btn btn-secondary">
                            {transaction.orderId}
                          </button>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td>
                        {transaction.description}
                      </td>
                      <td>
                        {transaction.date}
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
              <DollarOutlined />
            </div>
            <h4>收入管理</h4>
            <p>管理收入流水</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <ArrowDownOutlined />
            </div>
            <h4>支出管理</h4>
            <p>管理支出流水</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <RiseOutlined />
            </div>
            <h4>利润分析</h4>
            <p>分析利润趋势</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <ArrowUpOutlined />
            </div>
            <h4>财务报表</h4>
            <p>生成财务报表</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;
