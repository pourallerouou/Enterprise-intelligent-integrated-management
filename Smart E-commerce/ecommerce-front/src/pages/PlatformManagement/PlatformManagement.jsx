import React, { useState } from 'react';
import './PlatformManagement.css';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  SettingOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const PlatformManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const platforms = [
    {
      id: 'PLAT001',
      name: '淘宝店铺',
      platform: '淘宝',
      status: '正常',
      shopId: 'shop123456',
      lastSync: '2024-01-15 10:30:00',
      products: 1250,
      orders: 3456,
      revenue: 1250000,
      apiStatus: '正常',
      syncStatus: '已同步'
    },
    {
      id: 'PLAT002',
      name: '京东店铺',
      platform: '京东',
      status: '正常',
      shopId: 'jd_shop789',
      lastSync: '2024-01-15 10:25:00',
      products: 980,
      orders: 2890,
      revenue: 980000,
      apiStatus: '正常',
      syncStatus: '已同步'
    },
    {
      id: 'PLAT003',
      name: '拼多多店铺',
      platform: '拼多多',
      status: '异常',
      shopId: 'pdd_shop456',
      lastSync: '2024-01-14 15:20:00',
      products: 650,
      orders: 1200,
      revenue: 450000,
      apiStatus: '异常',
      syncStatus: '同步失败'
    },
    {
      id: 'PLAT004',
      name: '抖音小店',
      platform: '抖音',
      status: '维护中',
      shopId: 'dy_shop321',
      lastSync: '2024-01-15 09:15:00',
      products: 320,
      orders: 890,
      revenue: 320000,
      apiStatus: '正常',
      syncStatus: '同步中'
    },
    {
      id: 'PLAT005',
      name: '微信小程序',
      platform: '微信',
      status: '正常',
      shopId: 'wx_mini123',
      lastSync: '2024-01-15 10:35:00',
      products: 450,
      orders: 1560,
      revenue: 650000,
      apiStatus: '正常',
      syncStatus: '已同步'
    }
  ];

  const channels = [
    {
      id: 'CH001',
      name: '官方旗舰店',
      type: '直营',
      platforms: ['淘宝', '京东'],
      status: '正常',
      manager: '张经理',
      contact: '138-0000-0001'
    },
    {
      id: 'CH002',
      name: '授权经销商',
      type: '代理',
      platforms: ['拼多多', '抖音'],
      status: '正常',
      manager: '李经理',
      contact: '138-0000-0002'
    },
    {
      id: 'CH003',
      name: '第三方合作',
      type: '合作',
      platforms: ['微信'],
      status: '暂停',
      manager: '王经理',
      contact: '138-0000-0003'
    }
  ];

  const getStatusClass = (status) => {
    const statusMap = {
      '正常': 'tag-success',
      '异常': 'tag-error',
      '维护中': 'tag-warning',
      '暂停': 'tag-info'
    };
    return statusMap[status] || 'tag-info';
  };

  const getApiStatusClass = (status) => {
    const statusMap = {
      '正常': 'tag-success',
      '异常': 'tag-error',
      '维护中': 'tag-warning'
    };
    return statusMap[status] || 'tag-info';
  };

  const getSyncStatusClass = (status) => {
    const statusMap = {
      '已同步': 'tag-success',
      '同步中': 'tag-info',
      '同步失败': 'tag-error'
    };
    return statusMap[status] || 'tag-info';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      '正常': <CheckCircleOutlined />,
      '异常': <ExclamationCircleOutlined />,
      '维护中': <SyncOutlined />,
      '暂停': <ExclamationCircleOutlined />
    };
    return iconMap[status] || <ExclamationCircleOutlined />;
  };

  const filteredPlatforms = platforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         platform.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         platform.shopId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || platform.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPlatforms = platforms.length;
  const normalPlatforms = platforms.filter(p => p.status === '正常').length;
  const totalProducts = platforms.reduce((sum, p) => sum + p.products, 0);
  const totalRevenue = platforms.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">平台管理</h1>
        <p className="page-description">
          管理多平台店铺、渠道管理、数据同步等平台相关功能
        </p>
      </div>

      <div className="page-content">
        {/* 统计概览 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总平台数</div>
            <div className="stat-value">
              {totalPlatforms}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">正常平台</div>
            <div className="stat-value">
              {normalPlatforms}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">总商品数</div>
            <div className="stat-value">
              {totalProducts.toLocaleString()}
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
                  placeholder="搜索平台名称、店铺ID..."
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
                <option value="正常">正常</option>
                <option value="异常">异常</option>
                <option value="维护中">维护中</option>
                <option value="暂停">暂停</option>
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                添加平台
              </button>
            </div>
          </div>
        </div>

        {/* 平台管理 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">平台管理</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>平台信息</th>
                    <th>状态</th>
                    <th>API状态</th>
                    <th>同步状态</th>
                    <th>商品数</th>
                    <th>订单数</th>
                    <th>收益</th>
                    <th>最后同步</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlatforms.map((platform, index) => (
                    <tr key={platform.id}>
                      <td>
                        <div>
                          <div className="stats-grid">
                            {platform.name}
                          </div>
                          <div className="stats-grid">
                            {platform.platform} | ID: {platform.shopId}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(platform.status)}`}>
                          {getStatusIcon(platform.status)}
                          {platform.status}
                        </span>
                      </td>
                      <td>
                        <span className={`tag ${getApiStatusClass(platform.apiStatus)}`}>
                          {platform.apiStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`tag ${getSyncStatusClass(platform.syncStatus)}`}>
                          {platform.syncStatus}
                        </span>
                      </td>
                      <td>
                        {platform.products.toLocaleString()}
                      </td>
                      <td>
                        {platform.orders.toLocaleString()}
                      </td>
                      <td>
                        ¥{platform.revenue.toLocaleString()}
                      </td>
                      <td>
                        {platform.lastSync}
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

        {/* 渠道管理 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">渠道管理</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>渠道信息</th>
                    <th>类型</th>
                    <th>关联平台</th>
                    <th>状态</th>
                    <th>负责人</th>
                    <th>联系方式</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {channels.map((channel, index) => (
                    <tr key={channel.id}>
                      <td>
                        <div>
                          <div className="stats-grid">
                            {channel.name}
                          </div>
                          <div className="stats-grid">
                            ID: {channel.id}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${channel.type === '直营' ? 'tag-success' : channel.type === '代理' ? 'tag-info' : 'tag-warning'}`}>
                          {channel.type}
                        </span>
                      </td>
                      <td>
                        <div className="stats-grid">
                          {channel.platforms.map((platform, idx) => (
                            <span key={idx} className="tag tag-info">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(channel.status)}`}>
                          {channel.status}
                        </span>
                      </td>
                      <td>
                        {channel.manager}
                      </td>
                      <td>
                        {channel.contact}
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
              <SettingOutlined />
            </div>
            <h4>平台配置</h4>
            <p>配置平台API和参数</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <SyncOutlined />
            </div>
            <h4>数据同步</h4>
            <p>同步平台数据</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <CheckCircleOutlined />
            </div>
            <h4>状态监控</h4>
            <p>监控平台状态</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <ExclamationCircleOutlined />
            </div>
            <h4>异常处理</h4>
            <p>处理平台异常</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformManagement;
