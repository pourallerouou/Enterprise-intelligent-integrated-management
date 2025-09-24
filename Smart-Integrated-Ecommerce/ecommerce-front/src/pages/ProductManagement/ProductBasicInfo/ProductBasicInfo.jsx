import React, { useState } from 'react';
import './ProductBasicInfo.css';
import { 
  AppstoreOutlined, 
  TagsOutlined, 
  DatabaseOutlined, 
  PictureOutlined 
} from '@ant-design/icons';

// 导入四个三级组件
import ProductCategory from './ProductCategory/ProductCategory';
import SPUManagement from './SPUManagement/SPUManagement';
import SKUManagement from './SKUManagement/SKUManagement';
import ProductMedia from './ProductMedia/ProductMedia';

const ProductBasicInfo = () => {
  const [activeTab, setActiveTab] = useState('category');

  const tabs = [
    { key: 'category', label: '商品分类', icon: <AppstoreOutlined /> },
    { key: 'spu', label: 'SPU管理', icon: <TagsOutlined /> },
    { key: 'sku', label: 'SKU管理', icon: <DatabaseOutlined /> },
    { key: 'media', label: '商品媒体', icon: <PictureOutlined /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'category':
        return <ProductCategory />;
      case 'spu':
        return <SPUManagement />;
      case 'sku':
        return <SKUManagement />;
      case 'media':
        return <ProductMedia />;
      default:
        return <ProductCategory />;
    }
  };

  return (
    <div className="product-basic-info">

      <div className="basic-info-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="basic-info-main">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductBasicInfo;
