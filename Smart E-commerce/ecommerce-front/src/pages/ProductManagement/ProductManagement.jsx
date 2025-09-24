import React, { useState } from 'react';
import './ProductManagement.css';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  ShoppingOutlined,
  StarOutlined,
  HeartOutlined
} from '@ant-design/icons';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 'P001',
      name: '智能手机 Pro Max',
      category: '电子产品',
      price: 5999,
      stock: 150,
      sales: 1250,
      rating: 4.8,
      status: '在售',
      image: 'https://via.placeholder.com/80x80?text=手机',
      description: '最新款智能手机，配备先进处理器'
    },
    {
      id: 'P002',
      name: '无线蓝牙耳机',
      category: '电子产品',
      price: 299,
      stock: 500,
      sales: 3200,
      rating: 4.6,
      status: '在售',
      image: 'https://via.placeholder.com/80x80?text=耳机',
      description: '高品质无线蓝牙耳机'
    },
    {
      id: 'P003',
      name: '运动鞋',
      category: '服装鞋帽',
      price: 399,
      stock: 200,
      sales: 890,
      rating: 4.5,
      status: '在售',
      image: 'https://via.placeholder.com/80x80?text=鞋子',
      description: '舒适运动鞋，适合各种运动'
    },
    {
      id: 'P004',
      name: '笔记本电脑',
      category: '电子产品',
      price: 8999,
      stock: 50,
      sales: 180,
      rating: 4.9,
      status: '在售',
      image: 'https://via.placeholder.com/80x80?text=电脑',
      description: '高性能笔记本电脑'
    },
    {
      id: 'P005',
      name: '咖啡机',
      category: '家用电器',
      price: 1299,
      stock: 0,
      sales: 45,
      rating: 4.3,
      status: '缺货',
      image: 'https://via.placeholder.com/80x80?text=咖啡机',
      description: '全自动咖啡机'
    }
  ];

  const categories = [
    { value: 'all', label: '全部分类' },
    { value: '电子产品', label: '电子产品' },
    { value: '服装鞋帽', label: '服装鞋帽' },
    { value: '家用电器', label: '家用电器' },
    { value: '图书文具', label: '图书文具' }
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">商品管理</h1>
        <p className="page-description">
          管理商品信息、库存状态、价格设置等商品相关数据
        </p>
      </div>

      <div className="page-content">
        {/* 搜索和筛选 */}
        <div className="card">
          <div className="card-body">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="input-field"
                  placeholder="搜索商品名称或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchOutlined />
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
                添加商品
              </button>
            </div>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">商品列表</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>商品信息</th>
                    <th>分类</th>
                    <th>价格</th>
                    <th>库存</th>
                    <th>销量</th>
                    <th>评分</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td>
                        <div className="stats-grid">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="product-image"
                          />
                          <div>
                            <div className="stats-grid">
                              {product.name}
                            </div>
                            <div className="stats-grid">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="tag tag-info">{product.category}</span>
                      </td>
                      <td>
                        ¥{product.price.toLocaleString()}
                      </td>
                      <td>
                        <span className={`tag ${getStockClass(product.stock)}`}>
                          {product.stock}件
                        </span>
                      </td>
                      <td>
                        {product.sales.toLocaleString()}
                      </td>
                      <td>
                        <div className="stats-grid">
                          <StarOutlined />
                          <span>{product.rating}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(product.status)}`}>
                          {product.status}
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

        {/* 统计信息 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总商品数</div>
            <div className="stat-value">
              {products.length}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">在售商品</div>
            <div className="stat-value">
              {products.filter(p => p.status === '在售').length}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">缺货商品</div>
            <div className="stat-value">
              {products.filter(p => p.stock === 0).length}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">平均评分</div>
            <div className="stat-value">
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
