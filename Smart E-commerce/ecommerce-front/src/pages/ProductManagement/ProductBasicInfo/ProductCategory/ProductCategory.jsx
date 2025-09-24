import React, { useState } from 'react';
import './ProductCategory.css';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  AppstoreOutlined,
  RightOutlined,
  DownOutlined,
  MobileOutlined,
  LaptopOutlined,
  RobotOutlined,
  AppleOutlined,
  PlaySquareOutlined,
  ProjectOutlined,
  SkinOutlined,
  ManOutlined,
  WomanOutlined,
  HomeOutlined,
  SearchOutlined,
  CloseOutlined
} from '@ant-design/icons';

const ProductCategory = () => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['electronics', 'clothing']));
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'electronics',
      name: '电子产品',
      icon: <MobileOutlined />,
      children: [
        {
          id: 'smartphones',
          name: '智能手机',
          icon: <MobileOutlined />,
          children: [
            { id: 'android', name: 'Android手机', icon: <RobotOutlined /> },
            { id: 'ios', name: 'iPhone', icon: <AppleOutlined /> }
          ]
        },
        {
          id: 'laptops',
          name: '笔记本电脑',
          icon: <LaptopOutlined />,
          children: [
            { id: 'gaming', name: '游戏本', icon: <PlaySquareOutlined /> },
            { id: 'business', name: '商务本', icon: <ProjectOutlined /> }
          ]
        }
      ]
    },
    {
      id: 'clothing',
      name: '服装鞋帽',
      icon: <SkinOutlined />,
      children: [
        {
          id: 'mens',
          name: '男装',
          icon: <ManOutlined />,
          children: [
            { id: 'shirts', name: '衬衫', icon: <SkinOutlined /> },
            { id: 'pants', name: '裤子', icon: <SkinOutlined /> }
          ]
        },
        {
          id: 'womens',
          name: '女装',
          icon: <WomanOutlined />,
          children: [
            { id: 'dresses', name: '连衣裙', icon: <SkinOutlined /> },
            { id: 'tops', name: '上衣', icon: <SkinOutlined /> }
          ]
        }
      ]
    },
    {
      id: 'home',
      name: '家用电器',
      icon: <HomeOutlined />,
      children: [
        {
          id: 'kitchen',
          name: '厨房电器',
          icon: <HomeOutlined />,
          children: [
            { id: 'refrigerators', name: '冰箱', icon: <HomeOutlined /> },
            { id: 'ovens', name: '烤箱', icon: <HomeOutlined /> }
          ]
        }
      ]
    }
  ];

  // 搜索功能：找到匹配的分类ID并自动展开
  const findMatchingCategories = (categories, searchTerm) => {
    if (!searchTerm.trim()) return new Set();
    
    const matchingIds = new Set();
    const searchTermLower = searchTerm.toLowerCase();
    
    const searchInCategory = (category, parentPath = []) => {
      const matchesSearch = category.name.toLowerCase().includes(searchTermLower);
      const currentPath = [...parentPath, category.id];
      
      if (matchesSearch) {
        // 如果当前节点匹配，添加它及其所有父节点和子节点
        matchingIds.add(category.id);
        
        // 添加所有父节点
        parentPath.forEach(parentId => {
          matchingIds.add(parentId);
        });
        
        // 添加所有子节点
        if (category.children) {
          const addAllChildren = (children) => {
            children.forEach(child => {
              matchingIds.add(child.id);
              if (child.children) {
                addAllChildren(child.children);
              }
            });
          };
          addAllChildren(category.children);
        }
      }
      
      // 继续搜索子节点
      if (category.children) {
        category.children.forEach(child => {
          searchInCategory(child, currentPath);
        });
      }
    };
    
    categories.forEach(category => {
      searchInCategory(category);
    });
    
    return matchingIds;
  };


  // 处理搜索输入
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // 如果有搜索词，自动展开所有匹配的节点
    if (value.trim()) {
      const matchingIds = findMatchingCategories(categories, value);
      setExpandedCategories(matchingIds);
    } else {
      // 清空搜索时，恢复默认展开状态
      setExpandedCategories(new Set(['electronics', 'clothing']));
    }
  };

  // 清空搜索
  const clearSearch = () => {
    setSearchTerm('');
    setExpandedCategories(new Set(['electronics', 'clothing']));
  };

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // 渲染父级分类选项
  const renderParentOptions = (categories, level = 0) => {
    return categories.map(category => (
      <React.Fragment key={category.id}>
        <option value={category.id}>
          {'  '.repeat(level)} {category.name}
        </option>
        {category.children && renderParentOptions(category.children, level + 1)}
      </React.Fragment>
    ));
  };

  // 处理分类选择
  const handleCategorySelect = (category) => {
    setEditingCategory({
      id: category.id,
      name: category.name,
      icon: category.icon,
      parentId: category.parentId || '',
      description: category.description || '',
      sortOrder: category.sortOrder || 0,
      isActive: category.isActive !== false
    });
  };

  const renderCategoryTree = (categories, level = 0) => {
    return categories.map(category => {
      const isMatching = searchTerm.trim() ? category.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
      const isSearching = searchTerm.trim().length > 0;
      
      return (
        <div key={category.id} className="category-item">
          <div 
            className={`category-row level-${level} ${editingCategory?.id === category.id ? 'selected' : ''} ${isMatching && isSearching ? 'search-match' : ''}`}
            onClick={() => {
              toggleCategory(category.id);
              handleCategorySelect(category);
            }}
          >
            <div className="category-info">
              {category.children && category.children.length > 0 ? (
                <span className="category-icon">
                  {expandedCategories.has(category.id) ? 
                    <DownOutlined /> : 
                    <RightOutlined />
                  }
                </span>
              ) : (
                <span className="category-icon-placeholder"></span>
              )}
              <span className="category-emoji">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </div>
            <div className="category-actions">
              <button className="btn btn-sm btn-primary" title="编辑">
                <EditOutlined />
              </button>
              <button className="btn btn-sm btn-danger" title="删除">
                <DeleteOutlined />
              </button>
            </div>
          </div>
          {category.children && expandedCategories.has(category.id) && (
            <div className="category-children">
              {renderCategoryTree(category.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="product-category">
      <div className="page-content">

        {/* 分类树和编辑区域 */}
        <div className="category-container">
          {/* 分类树 */}
          <div className="card category-card">
            <div className="card-header">
              <h3 className="card-title">分类层级</h3>
              <div className="search-container">
                <div className="search-input-wrapper">
                  <SearchOutlined className="search-icon" />
                  <input
                    type="text"
                    placeholder="搜索分类..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button 
                      className="search-clear-btn"
                      onClick={clearSearch}
                      title="清空搜索"
                    >
                      <CloseOutlined />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="category-tree">
                {renderCategoryTree(categories)}
              </div>
            </div>
          </div>

           {/* 编辑区域 */}
           <div className="edit-card">
             {/* 操作栏 */}
             <div className="card">
               <div className="card-body">
                 <div className="action-bar">
                   <button className="btn btn-primary">
                     <PlusOutlined />
                     添加分类
                   </button>
                   <button className="btn btn-secondary">
                     <AppstoreOutlined />
                     批量操作
                   </button>
                 </div>
               </div>
             </div>

             {/* 编辑表单 */}
             <div className="card">
               <div className="card-body">
                 <div className="edit-form">
                <div className="form-group">
                  <label className="form-label">分类名称</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="请输入分类名称"
                    value={editingCategory?.name || ''}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">分类图标</label>
                  <div className="icon-selector">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="选择或输入图标"
                      value={editingCategory?.icon || ''}
                      onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                    />
                    <div className="icon-preview">
                      {editingCategory?.icon || '📁'}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">父级分类</label>
                  <select 
                    className="form-select"
                    value={editingCategory?.parentId || ''}
                    onChange={(e) => setEditingCategory({...editingCategory, parentId: e.target.value})}
                  >
                    <option value="">无（顶级分类）</option>
                    {renderParentOptions(categories)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">分类描述</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="请输入分类描述"
                    rows="3"
                    value={editingCategory?.description || ''}
                    onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">排序权重</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="数字越小排序越靠前"
                    value={editingCategory?.sortOrder || ''}
                    onChange={(e) => setEditingCategory({...editingCategory, sortOrder: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={editingCategory?.isActive !== false}
                      onChange={(e) => setEditingCategory({...editingCategory, isActive: e.target.checked})}
                    />
                    <span className="checkbox-text">启用此分类</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button className="btn btn-primary">
                    <EditOutlined />
                    保存修改
                  </button>
                  <button className="btn btn-secondary">
                    重置
                  </button>
                  <button className="btn btn-danger">
                    <DeleteOutlined />
                    删除分类
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* 统计信息 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总分类数</div>
            <div className="stat-value">12</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">一级分类</div>
            <div className="stat-value">3</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">二级分类</div>
            <div className="stat-value">6</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">三级分类</div>
            <div className="stat-value">3</div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default ProductCategory;
