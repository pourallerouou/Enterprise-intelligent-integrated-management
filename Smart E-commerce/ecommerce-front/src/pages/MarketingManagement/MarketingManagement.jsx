import React, { useState } from 'react';
import './MarketingManagement.css';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  GiftOutlined,
  FireOutlined,
  StarOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const MarketingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const campaigns = [
    {
      id: 'CAMP001',
      name: '春节大促销',
      type: '限时折扣',
      status: '进行中',
      startDate: '2024-01-20',
      endDate: '2024-02-10',
      discount: '8折',
      budget: 50000,
      spent: 32000,
      participants: 1250,
      conversion: 15.6,
      revenue: 125000
    },
    {
      id: 'CAMP002',
      name: '新用户专享',
      type: '新人优惠',
      status: '进行中',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      discount: '9折',
      budget: 30000,
      spent: 18500,
      participants: 890,
      conversion: 22.3,
      revenue: 89000
    },
    {
      id: 'CAMP003',
      name: '会员日特惠',
      type: '会员专享',
      status: '已结束',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      discount: '7折',
      budget: 20000,
      spent: 20000,
      participants: 560,
      conversion: 18.9,
      revenue: 78000
    },
    {
      id: 'CAMP004',
      name: '清仓大甩卖',
      type: '清仓促销',
      status: '计划中',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      discount: '5折',
      budget: 10000,
      spent: 0,
      participants: 0,
      conversion: 0,
      revenue: 0
    }
  ];

  const coupons = [
    {
      id: 'COUP001',
      name: '满减券',
      type: '满减',
      value: '满100减20',
      status: '有效',
      totalCount: 1000,
      usedCount: 650,
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: 'COUP002',
      name: '折扣券',
      type: '折扣',
      value: '8折优惠',
      status: '有效',
      totalCount: 500,
      usedCount: 320,
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 'COUP003',
      name: '免邮券',
      type: '免邮',
      value: '免运费',
      status: '已过期',
      totalCount: 2000,
      usedCount: 1800,
      startDate: '2023-12-01',
      endDate: '2023-12-31'
    }
  ];

  const getStatusClass = (status) => {
    const statusMap = {
      '进行中': 'tag-success',
      '已结束': 'tag-info',
      '计划中': 'tag-warning',
      '已暂停': 'tag-error',
      '有效': 'tag-success',
      '已过期': 'tag-error'
    };
    return statusMap[status] || 'tag-info';
  };

  const getTypeClass = (type) => {
    const typeMap = {
      '限时折扣': 'tag-error',
      '新人优惠': 'tag-success',
      '会员专享': 'tag-info',
      '清仓促销': 'tag-warning',
      '满减': 'tag-success',
      '折扣': 'tag-info',
      '免邮': 'tag-warning'
    };
    return typeMap[type] || 'tag-info';
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || campaign.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === '进行中').length;
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">营销管理</h1>
        <p className="page-description">
          管理促销活动、优惠券、营销策略等营销相关功能
        </p>
      </div>

      <div className="page-content">
        {/* 统计概览 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总活动数</div>
            <div className="stat-value">
              {totalCampaigns}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">进行中活动</div>
            <div className="stat-value">
              {activeCampaigns}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">总预算</div>
            <div className="stat-value">
              ¥{totalBudget.toLocaleString()}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">总收益</div>
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
                  placeholder="搜索活动名称或ID..."
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
                <option value="限时折扣">限时折扣</option>
                <option value="新人优惠">新人优惠</option>
                <option value="会员专享">会员专享</option>
                <option value="清仓促销">清仓促销</option>
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                创建活动
              </button>
            </div>
          </div>
        </div>

        {/* 营销活动 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">营销活动</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>活动信息</th>
                    <th>类型</th>
                    <th>状态</th>
                    <th>优惠</th>
                    <th>预算/花费</th>
                    <th>参与人数</th>
                    <th>转化率</th>
                    <th>收益</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign, index) => (
                    <tr key={campaign.id}>
                      <td>
                        <div>
                          <div className="stats-grid">
                            {campaign.name}
                          </div>
                          <div className="stats-grid">
                            ID: {campaign.id} | {campaign.startDate} ~ {campaign.endDate}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${getTypeClass(campaign.type)}`}>
                          {campaign.type}
                        </span>
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td>
                        {campaign.discount}
                      </td>
                      <td>
                        <div className="stats-grid">
                          ¥{campaign.spent.toLocaleString()} / ¥{campaign.budget.toLocaleString()}
                        </div>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${(campaign.spent / campaign.budget * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {campaign.participants.toLocaleString()}
                      </td>
                      <td>
                        {campaign.conversion}%
                      </td>
                      <td>
                        ¥{campaign.revenue.toLocaleString()}
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

        {/* 优惠券管理 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">优惠券管理</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>优惠券信息</th>
                    <th>类型</th>
                    <th>优惠内容</th>
                    <th>状态</th>
                    <th>使用情况</th>
                    <th>有效期</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon, index) => (
                    <tr key={coupon.id}>
                      <td>
                        <div>
                          <div className="stats-grid">
                            {coupon.name}
                          </div>
                          <div className="stats-grid">
                            ID: {coupon.id}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${getTypeClass(coupon.type)}`}>
                          {coupon.type}
                        </span>
                      </td>
                      <td>
                        {coupon.value}
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(coupon.status)}`}>
                          {coupon.status}
                        </span>
                      </td>
                      <td>
                        <div className="stats-grid">
                          {coupon.usedCount} / {coupon.totalCount}
                        </div>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${(coupon.usedCount / coupon.totalCount * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {coupon.startDate} ~ {coupon.endDate}
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
              <FireOutlined />
            </div>
            <h4>限时活动</h4>
            <p>创建限时促销活动</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <GiftOutlined />
            </div>
            <h4>优惠券</h4>
            <p>创建和管理优惠券</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <StarOutlined />
            </div>
            <h4>会员营销</h4>
            <p>会员专享活动</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <TrophyOutlined />
            </div>
            <h4>营销分析</h4>
            <p>查看营销效果分析</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingManagement;
