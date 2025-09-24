import React, { useState } from 'react';
import './SPUManagement.css';
import { 
  PlusOutlined, 
  SearchOutlined,
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  TagsOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons';

const SPUManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const spuList = [
    {
      id: 'SPU001',
      name: 'iPhone 15 Pro',
      category: '智能手机',
      brand: 'Apple',
      status: '在售',
      createTime: '2024-01-15',
      updateTime: '2024-01-20',
      skuCount: 4,
      totalStock: 1200,
      description: '最新款iPhone，配备A17 Pro芯片'
    },
    {
      id: 'SPU002',
      name: 'MacBook Pro 16',
      category: '笔记本电脑',
      brand: 'Apple',
      status: '在售',
      createTime: '2024-01-10',
      updateTime: '2024-01-18',
      skuCount: 3,
      totalStock: 800,
      description: '专业级笔记本电脑，适合创意工作者'
    },
    {
      id: 'SPU003',
      name: 'AirPods Pro',
      category: '音频设备',
      brand: 'Apple',
      status: '在售',
      createTime: '2024-01-05',
      updateTime: '2024-01-15',
      skuCount: 2,
      totalStock: 2000,
      description: '主动降噪无线耳机'
    }
  ];

  const categories = [
    { value: 'all', label: '全部分类' },
    { value: '智能手机', label: '智能手机' },
    { value: '笔记本电脑', label: '笔记本电脑' },
    { value: '音频设备', label: '音频设备' }
  ];

  const getStatusClass = (status) => {
    const statusMap = {
      '在售': 'tag-success',
      '下架': 'tag-warning',
      '草稿': 'tag-info'
    };
    return statusMap[status] || 'tag-info';
  };

  const filteredSPUs = spuList.filter(spu => {
    const matchesSearch = spu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spu.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spu.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || spu.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="spu-management">
      <div className="page-content">
        {/* 搜索和筛选 */}
        <div className="card">
          <div className="card-body">
            <div className="search-bar">
              <div className="search-input">
                <input
                  type="text"
                  className="input-field"
                  placeholder="搜索SPU名称、品牌或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchOutlined className="search-icon" />
              </div>
              <select
                className="input-field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                添加SPU
              </button>
            </div>
          </div>
        </div>

        {/* SPU列表 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">SPU列表</h3>
            <div className="card-actions">
              <button className="btn btn-secondary">
                <SettingOutlined />
                批量操作
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="spu-table">
              <table>
                <thead>
                  <tr>
                    <th>SPU信息</th>
                    <th>分类</th>
                    <th>品牌</th>
                    <th>SKU数量</th>
                    <th>总库存</th>
                    <th>状态</th>
                    <th>更新时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSPUs.map((spu) => (
                    <tr key={spu.id}>
                      <td>
                        <div className="spu-info">
                          <div className="spu-name">{spu.name}</div>
                          <div className="spu-id">ID: {spu.id}</div>
                          <div className="spu-description">{spu.description}</div>
                        </div>
                      </td>
                      <td>
                        <span className="tag tag-info">{spu.category}</span>
                      </td>
                      <td>
                        <span className="brand-tag">{spu.brand}</span>
                      </td>
                      <td>
                        <span className="sku-count">{spu.skuCount}个</span>
                      </td>
                      <td>
                        <span className="stock-count">{spu.totalStock.toLocaleString()}</span>
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(spu.status)}`}>
                          {spu.status}
                        </span>
                      </td>
                      <td>
                        <div className="time-info">
                          <div className="update-time">{spu.updateTime}</div>
                        </div>
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
              <TagsOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">总SPU数</div>
              <div className="stat-value">{spuList.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <AppstoreOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">在售SPU</div>
              <div className="stat-value">
                {spuList.filter(spu => spu.status === '在售').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <SettingOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">总SKU数</div>
              <div className="stat-value">
                {spuList.reduce((sum, spu) => sum + spu.skuCount, 0)}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <PlusOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">总库存</div>
              <div className="stat-value">
                {spuList.reduce((sum, spu) => sum + spu.totalStock, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPUManagement;
