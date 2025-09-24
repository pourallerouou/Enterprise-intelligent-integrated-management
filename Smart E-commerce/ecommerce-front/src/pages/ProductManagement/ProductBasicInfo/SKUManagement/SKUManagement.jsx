import React, { useState } from 'react';
import './SKUManagement.css';
import { 
  PlusOutlined, 
  SearchOutlined,
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  ShoppingOutlined,
  InboxOutlined,
  DollarOutlined,
  SettingOutlined
} from '@ant-design/icons';

const SKUManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSPU, setSelectedSPU] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const skuList = [
    {
      id: 'SKU001',
      spuId: 'SPU001',
      spuName: 'iPhone 15 Pro',
      skuName: 'iPhone 15 Pro 128GB 深空黑色',
      specifications: {
        '存储容量': '128GB',
        '颜色': '深空黑色',
        '网络': '5G'
      },
      price: 7999,
      cost: 5500,
      stock: 150,
      reservedStock: 20,
      status: '在售',
      createTime: '2024-01-15',
      updateTime: '2024-01-20',
      sales: 1250
    },
    {
      id: 'SKU002',
      spuId: 'SPU001',
      spuName: 'iPhone 15 Pro',
      skuName: 'iPhone 15 Pro 256GB 深空黑色',
      specifications: {
        '存储容量': '256GB',
        '颜色': '深空黑色',
        '网络': '5G'
      },
      price: 8999,
      cost: 6200,
      stock: 200,
      reservedStock: 15,
      status: '在售',
      createTime: '2024-01-15',
      updateTime: '2024-01-20',
      sales: 980
    },
    {
      id: 'SKU003',
      spuId: 'SPU002',
      spuName: 'MacBook Pro 16',
      skuName: 'MacBook Pro 16 M3 Pro 512GB 深空灰色',
      specifications: {
        '处理器': 'M3 Pro',
        '存储容量': '512GB',
        '颜色': '深空灰色',
        '屏幕': '16英寸'
      },
      price: 19999,
      cost: 15000,
      stock: 80,
      reservedStock: 5,
      status: '在售',
      createTime: '2024-01-10',
      updateTime: '2024-01-18',
      sales: 320
    },
    {
      id: 'SKU004',
      spuId: 'SPU003',
      spuName: 'AirPods Pro',
      skuName: 'AirPods Pro 2代 白色',
      specifications: {
        '型号': '2代',
        '颜色': '白色',
        '充电盒': 'MagSafe'
      },
      price: 1899,
      cost: 1200,
      stock: 500,
      reservedStock: 50,
      status: '在售',
      createTime: '2024-01-05',
      updateTime: '2024-01-15',
      sales: 2100
    }
  ];

  const spuOptions = [
    { value: 'all', label: '全部SPU' },
    { value: 'SPU001', label: 'iPhone 15 Pro' },
    { value: 'SPU002', label: 'MacBook Pro 16' },
    { value: 'SPU003', label: 'AirPods Pro' }
  ];

  const statusOptions = [
    { value: 'all', label: '全部状态' },
    { value: '在售', label: '在售' },
    { value: '缺货', label: '缺货' },
    { value: '下架', label: '下架' }
  ];

  const getStatusClass = (status) => {
    const statusMap = {
      '在售': 'tag-success',
      '缺货': 'tag-error',
      '下架': 'tag-warning'
    };
    return statusMap[status] || 'tag-info';
  };

  const getStockClass = (stock) => {
    if (stock === 0) return 'tag-error';
    if (stock < 50) return 'tag-warning';
    return 'tag-success';
  };

  const filteredSKUs = skuList.filter(sku => {
    const matchesSearch = sku.skuName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sku.spuName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSPU = selectedSPU === 'all' || sku.spuId === selectedSPU;
    const matchesStatus = selectedStatus === 'all' || sku.status === selectedStatus;
    return matchesSearch && matchesSPU && matchesStatus;
  });

  const totalValue = skuList.reduce((sum, sku) => sum + (sku.price * sku.stock), 0);
  const totalCost = skuList.reduce((sum, sku) => sum + (sku.cost * sku.stock), 0);
  const totalProfit = totalValue - totalCost;

  return (
    <div className="sku-management">
      <div className="page-content">
        {/* 搜索和筛选 */}
        <div className="card">
          <div className="card-body">
            <div className="search-bar">
              <div className="search-input">
                <input
                  type="text"
                  className="input-field"
                  placeholder="搜索SKU名称或SPU名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchOutlined className="search-icon" />
              </div>
              <select
                className="input-field"
                value={selectedSPU}
                onChange={(e) => setSelectedSPU(e.target.value)}
              >
                {spuOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                className="input-field"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                添加SKU
              </button>
            </div>
          </div>
        </div>

        {/* SKU列表 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">SKU列表</h3>
            <div className="card-actions">
              <button className="btn btn-secondary">
                <SettingOutlined />
                批量操作
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="sku-table">
              <table>
                <thead>
                  <tr>
                    <th>SKU信息</th>
                    <th>SPU</th>
                    <th>规格</th>
                    <th>价格</th>
                    <th>成本</th>
                    <th>库存</th>
                    <th>销量</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSKUs.map((sku) => (
                    <tr key={sku.id}>
                      <td>
                        <div className="sku-info">
                          <div className="sku-name">{sku.skuName}</div>
                          <div className="sku-id">ID: {sku.id}</div>
                        </div>
                      </td>
                      <td>
                        <div className="spu-info">
                          <div className="spu-name">{sku.spuName}</div>
                          <div className="spu-id">{sku.spuId}</div>
                        </div>
                      </td>
                      <td>
                        <div className="specifications">
                          {Object.entries(sku.specifications).map(([key, value]) => (
                            <div key={key} className="spec-item">
                              <span className="spec-key">{key}:</span>
                              <span className="spec-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="price-info">
                          <div className="price">¥{sku.price.toLocaleString()}</div>
                        </div>
                      </td>
                      <td>
                        <div className="cost-info">
                          <div className="cost">¥{sku.cost.toLocaleString()}</div>
                          <div className="profit">
                            利润: ¥{(sku.price - sku.cost).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stock-info">
                          <div className="stock">
                            <span className={`tag ${getStockClass(sku.stock)}`}>
                              {sku.stock}件
                            </span>
                          </div>
                          <div className="reserved">
                            预留: {sku.reservedStock}件
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="sales-info">
                          <div className="sales">{sku.sales.toLocaleString()}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(sku.status)}`}>
                          {sku.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn-sm btn-secondary" title="查看详情">
                            <EyeOutlined />
                          </button>
                          <button className="btn btn-sm btn-primary" title="编辑">
                            <EditOutlined />
                          </button>
                          <button className="btn btn-sm btn-danger" title="删除">
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

        {/* 统计信息 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <ShoppingOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">总SKU数</div>
              <div className="stat-value">{skuList.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <InboxOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">总库存</div>
              <div className="stat-value">
                {skuList.reduce((sum, sku) => sum + sku.stock, 0).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <DollarOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">库存价值</div>
              <div className="stat-value">¥{totalValue.toLocaleString()}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <PlusOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">预期利润</div>
              <div className="stat-value">¥{totalProfit.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SKUManagement;
