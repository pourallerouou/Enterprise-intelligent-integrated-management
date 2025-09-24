import React, { useState } from 'react';
import './DataCenter.css';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined, 
  DownloadOutlined,
  ReloadOutlined,
  FilterOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const DataCenter = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedChart, setSelectedChart] = useState('sales');

  const salesData = [
    { date: '2024-01-09', sales: 125000, orders: 156, users: 89 },
    { date: '2024-01-10', sales: 138000, orders: 172, users: 95 },
    { date: '2024-01-11', sales: 152000, orders: 189, users: 112 },
    { date: '2024-01-12', sales: 145000, orders: 178, users: 98 },
    { date: '2024-01-13', sales: 168000, orders: 201, users: 125 },
    { date: '2024-01-14', sales: 175000, orders: 215, users: 138 },
    { date: '2024-01-15', sales: 189000, orders: 234, users: 156 }
  ];

  const categoryData = [
    { name: '电子产品', value: 45, color: '#1890ff', sales: 1250000 },
    { name: '服装鞋帽', value: 25, color: '#52c41a', sales: 680000 },
    { name: '家用电器', value: 15, color: '#faad14', sales: 420000 },
    { name: '图书文具', value: 10, color: '#f5222d', sales: 280000 },
    { name: '其他', value: 5, color: '#722ed1', sales: 150000 }
  ];

  const regionData = [
    { region: '华北', sales: 1250000, orders: 3456, growth: 12.5 },
    { region: '华东', sales: 1890000, orders: 5234, growth: 18.3 },
    { region: '华南', sales: 1560000, orders: 4123, growth: 15.2 },
    { region: '华中', sales: 980000, orders: 2678, growth: 8.7 },
    { region: '西南', sales: 750000, orders: 1987, growth: 6.4 },
    { region: '西北', sales: 420000, orders: 1123, growth: 3.8 },
    { region: '东北', sales: 380000, orders: 987, growth: 2.9 }
  ];

  const userBehaviorData = [
    { action: '浏览商品', count: 12500, percentage: 35.2 },
    { action: '加入购物车', count: 3200, percentage: 9.0 },
    { action: '下单购买', count: 1800, percentage: 5.1 },
    { action: '支付完成', count: 1650, percentage: 4.6 },
    { action: '评价商品', count: 1200, percentage: 3.4 },
    { action: '其他', count: 15150, percentage: 42.7 }
  ];

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalUsers = salesData.reduce((sum, item) => sum + item.users, 0);
  const avgOrderValue = totalSales / totalOrders;

  const getPeriodLabel = (period) => {
    const periodMap = {
      '7days': '最近7天',
      '30days': '最近30天',
      '90days': '最近90天',
      '1year': '最近1年'
    };
    return periodMap[period] || '最近7天';
  };

  const getChartLabel = (chart) => {
    const chartMap = {
      'sales': '销售趋势',
      'orders': '订单趋势',
      'users': '用户趋势'
    };
    return chartMap[chart] || '销售趋势';
  };

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">数据中心</h1>
        <p className="page-description">
          数据统计、趋势分析、报表生成等数据分析功能
        </p>
      </div>

      <div className="page-content">
        {/* 统计概览 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总销售额</div>
            <div className="stat-value">
              ¥{totalSales.toLocaleString()}
            </div>
            <div className="stat-change positive">
              <span>+15.6%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">总订单数</div>
            <div className="stat-value">
              {totalOrders.toLocaleString()}
            </div>
            <div className="stat-change positive">
              <span>+12.3%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">总用户数</div>
            <div className="stat-value">
              {totalUsers.toLocaleString()}
            </div>
            <div className="stat-change positive">
              <span>+8.9%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">平均订单价值</div>
            <div className="stat-value">
              ¥{avgOrderValue.toFixed(0)}
            </div>
            <div className="stat-change positive">
              <span>+5.2%</span>
            </div>
          </div>
        </div>

        {/* 筛选和操作 */}
        <div className="card">
          <div className="card-body">
            <div className="input-group">
              <select 
                className="input-field" 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="7days">最近7天</option>
                <option value="30days">最近30天</option>
                <option value="90days">最近90天</option>
                <option value="1year">最近1年</option>
              </select>
              <select 
                className="input-field" 
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
              >
                <option value="sales">销售趋势</option>
                <option value="orders">订单趋势</option>
                <option value="users">用户趋势</option>
              </select>
              <button className="btn btn-primary">
                <ReloadOutlined />
                刷新数据
              </button>
              <button className="btn btn-secondary">
                <DownloadOutlined />
                导出报表
              </button>
            </div>
          </div>
        </div>

        {/* 趋势图表 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{getChartLabel(selectedChart)} - {getPeriodLabel(selectedPeriod)}</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <div className="stats-grid">
                <LineChartOutlined />
                <div className="stats-grid">
                  {getChartLabel(selectedChart)}图表
                </div>
                <div className="stats-grid">
                  这里将显示{getChartLabel(selectedChart)}的详细数据图表
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 分类销售分析 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">分类销售分析</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <div>
                <div className="stats-grid">
                  <div className="stats-grid">
                    <PieChartOutlined />
                    <div className="stats-grid">分类占比图</div>
                  </div>
                </div>
              </div>
              <div>
                {categoryData.map((category, index) => (
                  <div key={index}>
                    <div className="stats-grid">
                      <div className="stats-grid">
                        <div className="stats-grid"></div>
                        <span>{category.name}</span>
                      </div>
                      <div className="stats-grid">
                        ¥{category.sales.toLocaleString()}
                      </div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{
                            background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}80 100%)`
                          }}
                        ></div>
                      </div>
                      <div className="progress-text">
                        {category.value}% | {category.sales.toLocaleString()}元
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 地区销售分析 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">地区销售分析</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>地区</th>
                    <th>销售额</th>
                    <th>订单数</th>
                    <th>增长率</th>
                    <th>占比</th>
                  </tr>
                </thead>
                <tbody>
                  {regionData.map((region, index) => (
                    <tr key={index}>
                      <td>
                        {region.region}
                      </td>
                      <td>
                        ¥{region.sales.toLocaleString()}
                      </td>
                      <td>
                        {region.orders.toLocaleString()}
                      </td>
                      <td>
                        <span className={`tag ${region.growth > 10 ? 'tag-success' : region.growth > 5 ? 'tag-warning' : 'tag-error'}`}>
                          {region.growth > 0 ? '+' : ''}{region.growth}%
                        </span>
                      </td>
                      <td>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${(region.sales / Math.max(...regionData.map(r => r.sales)) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 用户行为分析 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">用户行为分析</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <div>
                <div className="stats-grid">
                  <div className="stats-grid">
                    <BarChartOutlined />
                    <div className="stats-grid">行为分析图</div>
                  </div>
                </div>
              </div>
              <div>
                {userBehaviorData.map((behavior, index) => (
                  <div key={index}>
                    <div className="stats-grid">
                      <span>{behavior.action}</span>
                      <div className="stats-grid">
                        <span>
                          {behavior.count.toLocaleString()}
                        </span>
                        <span>
                          {behavior.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{
                            background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="stats-grid">
          <div className="card">
            <div className="stats-grid">
              <BarChartOutlined />
            </div>
            <h4>销售报表</h4>
            <p>生成销售数据报表</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <LineChartOutlined />
            </div>
            <h4>趋势分析</h4>
            <p>分析业务趋势</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <PieChartOutlined />
            </div>
            <h4>数据可视化</h4>
            <p>创建数据图表</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <DownloadOutlined />
            </div>
            <h4>数据导出</h4>
            <p>导出分析数据</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCenter;
