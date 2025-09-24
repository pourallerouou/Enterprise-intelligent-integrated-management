import React, { useState } from 'react';
import './SupplyChainInventory.css';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  DatabaseOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const SupplyChainInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const inventory = [
    {
      id: 'INV001',
      productName: '智能手机 Pro Max',
      sku: 'SPM-001',
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      unitCost: 4500,
      totalValue: 675000,
      supplier: '苹果供应商',
      lastRestock: '2024-01-10',
      status: '正常',
      location: 'A区-01-01'
    },
    {
      id: 'INV002',
      productName: '无线蓝牙耳机',
      sku: 'WBE-002',
      currentStock: 25,
      minStock: 100,
      maxStock: 1000,
      unitCost: 200,
      totalValue: 5000,
      supplier: '音频设备供应商',
      lastRestock: '2024-01-08',
      status: '库存不足',
      location: 'B区-02-03'
    },
    {
      id: 'INV003',
      productName: '运动鞋',
      sku: 'SS-003',
      currentStock: 200,
      minStock: 50,
      maxStock: 300,
      unitCost: 250,
      totalValue: 50000,
      supplier: '运动品牌供应商',
      lastRestock: '2024-01-12',
      status: '正常',
      location: 'C区-01-05'
    },
    {
      id: 'INV004',
      productName: '笔记本电脑',
      sku: 'LAP-004',
      currentStock: 0,
      minStock: 20,
      maxStock: 100,
      unitCost: 7000,
      totalValue: 0,
      supplier: '电脑设备供应商',
      lastRestock: '2024-01-05',
      status: '缺货',
      location: 'A区-03-02'
    },
    {
      id: 'INV005',
      productName: '咖啡机',
      sku: 'CM-005',
      currentStock: 300,
      minStock: 30,
      maxStock: 200,
      unitCost: 800,
      totalValue: 240000,
      supplier: '家电供应商',
      lastRestock: '2024-01-14',
      status: '库存过多',
      location: 'D区-01-01'
    }
  ];

  const suppliers = [
    { id: 'SUP001', name: '苹果供应商', contact: '张经理', phone: '138-0000-0001', status: '合作中' },
    { id: 'SUP002', name: '音频设备供应商', contact: '李经理', phone: '138-0000-0002', status: '合作中' },
    { id: 'SUP003', name: '运动品牌供应商', contact: '王经理', phone: '138-0000-0003', status: '合作中' },
    { id: 'SUP004', name: '电脑设备供应商', contact: '赵经理', phone: '138-0000-0004', status: '暂停合作' },
    { id: 'SUP005', name: '家电供应商', contact: '钱经理', phone: '138-0000-0005', status: '合作中' }
  ];

  const getStatusClass = (status) => {
    const statusMap = {
      '正常': 'tag-success',
      '库存不足': 'tag-warning',
      '缺货': 'tag-error',
      '库存过多': 'tag-info'
    };
    return statusMap[status] || 'tag-info';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      '正常': <CheckCircleOutlined />,
      '库存不足': <WarningOutlined />,
      '缺货': <WarningOutlined />,
      '库存过多': <DatabaseOutlined />
    };
    return iconMap[status] || <DatabaseOutlined />;
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventory.filter(item => item.status === '库存不足' || item.status === '缺货').length;
  const outOfStockItems = inventory.filter(item => item.status === '缺货').length;

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">供应链与库存</h1>
        <p className="page-description">
          管理供应商信息、库存状态、补货提醒等供应链相关数据
        </p>
      </div>

      <div className="page-content">
        {/* 统计概览 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总库存价值</div>
            <div className="stat-value">
              ¥{totalValue.toLocaleString()}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">库存商品数</div>
            <div className="stat-value">
              {inventory.length}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">库存不足</div>
            <div className="stat-value">
              {lowStockItems}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">缺货商品</div>
            <div className="stat-value">
              {outOfStockItems}
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
                  placeholder="搜索商品名称或SKU..."
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
                <option value="库存不足">库存不足</option>
                <option value="缺货">缺货</option>
                <option value="库存过多">库存过多</option>
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                添加库存
              </button>
            </div>
          </div>
        </div>

        {/* 库存列表 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">库存管理</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>商品信息</th>
                    <th>当前库存</th>
                    <th>库存状态</th>
                    <th>单位成本</th>
                    <th>总价值</th>
                    <th>供应商</th>
                    <th>最后补货</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <div>
                          <div className="stats-grid">
                            {item.productName}
                          </div>
                          <div className="stats-grid">
                            SKU: {item.sku} | 位置: {item.location}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stats-grid">
                          {item.currentStock}
                        </div>
                        <div className="stats-grid">
                          最低: {item.minStock} | 最高: {item.maxStock}
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>
                      <td>
                        ¥{item.unitCost.toLocaleString()}
                      </td>
                      <td>
                        ¥{item.totalValue.toLocaleString()}
                      </td>
                      <td>
                        <div className="stats-grid">
                          {item.supplier}
                        </div>
                      </td>
                      <td>
                        {item.lastRestock}
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

        {/* 供应商管理 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">供应商管理</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>供应商名称</th>
                    <th>联系人</th>
                    <th>联系电话</th>
                    <th>合作状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier, index) => (
                    <tr key={supplier.id}>
                      <td>
                        {supplier.name}
                      </td>
                      <td>
                        {supplier.contact}
                      </td>
                      <td>
                        {supplier.phone}
                      </td>
                      <td>
                        <span className={`tag ${supplier.status === '合作中' ? 'tag-success' : 'tag-warning'}`}>
                          {supplier.status}
                        </span>
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
      </div>
    </div>
  );
};

export default SupplyChainInventory;
