import React, { useState } from 'react';
import './ProductMedia.css';
import { 
  PlusOutlined, 
  SearchOutlined,
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  UploadOutlined,
  DownloadOutlined,
  SettingOutlined
} from '@ant-design/icons';

const ProductMedia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const mediaList = [
    {
      id: 'MEDIA001',
      name: 'iPhone 15 Pro 主图',
      type: 'image',
      productId: 'SPU001',
      productName: 'iPhone 15 Pro',
      url: '/images/iPhone 15 Pro 主图.png',
      size: '2.5MB',
      dimensions: '3000x3000',
      format: 'JPEG',
      status: '已发布',
      createTime: '2024-01-15',
      updateTime: '2024-01-20',
      tags: ['主图', '产品图', '官方']
    },
    {
      id: 'MEDIA002',
      name: 'iPhone 15 Pro 详情图1',
      type: 'image',
      productId: 'SPU001',
      productName: 'iPhone 15 Pro',
      url: '/images/iPhone 15 Pro 详情图1.png',
      size: '1.8MB',
      dimensions: '1200x800',
      format: 'PNG',
      status: '已发布',
      createTime: '2024-01-15',
      updateTime: '2024-01-20',
      tags: ['详情图', '功能展示']
    },
    {
      id: 'MEDIA003',
      name: 'MacBook Pro 宣传视频',
      type: 'video',
      productId: 'SPU002',
      productName: 'MacBook Pro 16',
      url: '/images/MacBook Pro 16.png',
      size: '45.2MB',
      dimensions: '1920x1080',
      format: 'MP4',
      status: '已发布',
      createTime: '2024-01-10',
      updateTime: '2024-01-18',
      tags: ['宣传视频', '产品介绍']
    },
    {
      id: 'MEDIA004',
      name: 'AirPods Pro 说明书',
      type: 'document',
      productId: 'SPU003',
      productName: 'AirPods Pro',
      url: '/images/AirPods Pro.png',
      size: '3.2MB',
      dimensions: 'A4',
      format: 'PDF',
      status: '草稿',
      createTime: '2024-01-05',
      updateTime: '2024-01-15',
      tags: ['说明书', '文档']
    },
    {
      id: 'MEDIA005',
      name: 'iPhone 15 Pro 360度展示',
      type: 'image',
      productId: 'SPU001',
      productName: 'iPhone 15 Pro',
      url: '/images/iPhone 15 Pro.png',
      size: '4.1MB',
      dimensions: '2000x2000',
      format: 'JPEG',
      status: '已发布',
      createTime: '2024-01-16',
      updateTime: '2024-01-21',
      tags: ['360度', '交互展示']
    }
  ];

  const typeOptions = [
    { value: 'all', label: '全部类型' },
    { value: 'image', label: '图片' },
    { value: 'video', label: '视频' },
    { value: 'document', label: '文档' }
  ];

  const productOptions = [
    { value: 'all', label: '全部产品' },
    { value: 'SPU001', label: 'iPhone 15 Pro' },
    { value: 'SPU002', label: 'MacBook Pro 16' },
    { value: 'SPU003', label: 'AirPods Pro' }
  ];

  const getTypeIcon = (type) => {
    const iconMap = {
      'image': <PictureOutlined />,
      'video': <VideoCameraOutlined />,
      'document': <FileTextOutlined />
    };
    return iconMap[type] || <FileTextOutlined />;
  };

  const getTypeClass = (type) => {
    const classMap = {
      'image': 'type-image',
      'video': 'type-video',
      'document': 'type-document'
    };
    return classMap[type] || 'type-document';
  };

  const getStatusClass = (status) => {
    const statusMap = {
      '已发布': 'tag-success',
      '草稿': 'tag-warning',
      '审核中': 'tag-info'
    };
    return statusMap[status] || 'tag-info';
  };

  const filteredMedia = mediaList.filter(media => {
    const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         media.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || media.type === selectedType;
    const matchesProduct = selectedProduct === 'all' || media.productId === selectedProduct;
    return matchesSearch && matchesType && matchesProduct;
  });

  const totalSize = mediaList.reduce((sum, media) => {
    const size = parseFloat(media.size.replace('MB', ''));
    return sum + size;
  }, 0);

  return (
    <div className="product-media">
      <div className="page-content">
        {/* 搜索和筛选 */}
        <div className="card">
          <div className="card-body">
            <div className="search-bar">
              <div className="search-input">
                <input
                  type="text"
                  className="input-field"
                  placeholder="搜索媒体名称或产品名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchOutlined className="search-icon" />
              </div>
              <select
                className="input-field"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                className="input-field"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {productOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary">
                <UploadOutlined />
                上传媒体
              </button>
            </div>
          </div>
        </div>

        {/* 视图切换和操作 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">商品详情</h3>
            <div className="card-actions">
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="网格视图"
                >
                  <SettingOutlined />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="列表视图"
                >
                  <FileTextOutlined />
                </button>
              </div>
              <button className="btn btn-secondary">
                <SettingOutlined />
                批量操作
              </button>
            </div>
          </div>
          <div className="card-body">
            {viewMode === 'grid' ? (
              <div className="media-grid">
                {filteredMedia.map((media) => (
                  <div key={media.id} className="media-card">
                    <div className="media-preview">
                      <img 
                        src={media.url} 
                        alt={media.name}
                        className="media-image"
                      />
                      <div className="media-overlay">
                        <div className="media-actions">
                          <button className="action-btn" title="预览">
                            <EyeOutlined />
                          </button>
                          <button className="action-btn" title="下载">
                            <DownloadOutlined />
                          </button>
                          <button className="action-btn" title="编辑">
                            <EditOutlined />
                          </button>
                          <button className="action-btn" title="删除">
                            <DeleteOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="media-info">
                      <div className="media-name">{media.name}</div>
                      <div className="media-meta">
                        <span className={`media-type ${getTypeClass(media.type)}`}>
                          {getTypeIcon(media.type)}
                          {media.type === 'image' ? '图片' : media.type === 'video' ? '视频' : '文档'}
                        </span>
                        <span className="media-size">{media.size}</span>
                      </div>
                      <div className="media-product">{media.productName}</div>
                      <div className="media-tags">
                        {media.tags.map((tag, index) => (
                          <span key={index} className="tag tag-info">{tag}</span>
                        ))}
                      </div>
                      <div className="media-status">
                        <span className={`tag ${getStatusClass(media.status)}`}>
                          {media.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="media-table">
                <table>
                  <thead>
                    <tr>
                      <th>媒体信息</th>
                      <th>类型</th>
                      <th>产品</th>
                      <th>尺寸/格式</th>
                      <th>大小</th>
                      <th>状态</th>
                      <th>更新时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedia.map((media) => (
                      <tr key={media.id}>
                        <td>
                          <div className="media-info-cell">
                            <img 
                              src={media.url} 
                              alt={media.name}
                              className="media-thumbnail"
                            />
                            <div className="media-details">
                              <div className="media-name">{media.name}</div>
                              <div className="media-id">ID: {media.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`media-type ${getTypeClass(media.type)}`}>
                            {getTypeIcon(media.type)}
                            {media.type === 'image' ? '图片' : media.type === 'video' ? '视频' : '文档'}
                          </span>
                        </td>
                        <td>
                          <div className="product-info">
                            <div className="product-name">{media.productName}</div>
                            <div className="product-id">{media.productId}</div>
                          </div>
                        </td>
                        <td>
                          <div className="format-info">
                            <div className="dimensions">{media.dimensions}</div>
                            <div className="format">{media.format}</div>
                          </div>
                        </td>
                        <td>
                          <span className="media-size">{media.size}</span>
                        </td>
                        <td>
                          <span className={`tag ${getStatusClass(media.status)}`}>
                            {media.status}
                          </span>
                        </td>
                        <td>
                          <div className="time-info">
                            <div className="update-time">{media.updateTime}</div>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-sm btn-secondary" title="预览">
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
            )}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <PictureOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">总媒体数</div>
              <div className="stat-value">{mediaList.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <VideoCameraOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">图片数量</div>
              <div className="stat-value">
                {mediaList.filter(media => media.type === 'image').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FileTextOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">视频数量</div>
              <div className="stat-value">
                {mediaList.filter(media => media.type === 'video').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <UploadOutlined />
            </div>
            <div className="stat-content">
              <div className="stat-title">总大小</div>
              <div className="stat-value">{totalSize.toFixed(1)}MB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMedia;
