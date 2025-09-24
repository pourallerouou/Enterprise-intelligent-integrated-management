# 商品管理模块

## 文件结构

```
ProductManagement/
├── ProductManagement.jsx                    # 原始商品管理页面
├── ProductManagement.css                    # 原始样式文件
├── ProductManagementWithTabs.jsx            # 集成示例（主标签 + 基础信息）
├── ProductBasicInfo/                        # 商品基础信息管理文件夹
│   ├── ProductBasicInfo.jsx                 # 主组件（标签导航）
│   ├── ProductBasicInfo.css                 # 主组件样式
│   ├── ProductCategory/                     # 商品分类管理
│   │   ├── ProductCategory.jsx              # 分类管理组件
│   │   └── ProductCategory.css              # 分类管理样式
│   ├── SPUManagement/                       # SPU管理
│   │   ├── SPUManagement.jsx                # SPU管理组件
│   │   └── SPUManagement.css                # SPU管理样式
│   ├── SKUManagement/                       # SKU管理
│   │   ├── SKUManagement.jsx                # SKU管理组件
│   │   └── SKUManagement.css                # SKU管理样式
│   └── ProductMedia/                        # 商品媒体管理
│       ├── ProductMedia.jsx                 # 媒体管理组件
│       └── ProductMedia.css                 # 媒体管理样式
└── README.md                                # 说明文档
```

## 组件说明

### 1. ProductBasicInfo.jsx
商品基础信息管理的主组件，包含四个三级页面：

- **商品分类** - 管理商品分类层级结构（树形展示，支持展开/折叠）
- **SPU管理** - 管理商品标准化产品单元（列表展示，支持搜索筛选）
- **SKU管理** - 管理商品库存单元（详细规格管理，价格库存控制）
- **商品媒体** - 管理商品多媒体资源（图片/视频/文档，网格/列表视图）

### 2. 三级组件详情

#### ProductCategory（商品分类）
- 树形结构展示分类层级
- 支持展开/折叠操作
- 分类统计信息
- 响应式设计

#### SPUManagement（SPU管理）
- 表格形式展示SPU列表
- 支持按分类和状态筛选
- SPU详细信息展示
- 批量操作功能

#### SKUManagement（SKU管理）
- 详细的SKU规格管理
- 价格、成本、库存管理
- 规格属性展示
- 利润计算

#### ProductMedia（商品媒体）
- 网格/列表双视图模式
- 支持图片、视频、文档管理
- 媒体预览和操作
- 文件大小和格式信息

### 2. 特性

#### 标签导航
- 紧凑的标签设计，节约空间
- 图标 + 文字的组合显示
- 响应式设计，移动端只显示图标
- 平滑的过渡动画效果

#### 样式特点
- 与现有设计系统保持一致
- 支持深色主题
- 移动端优化
- 现代化的视觉效果

### 3. 使用方法

#### 独立使用
```jsx
import ProductBasicInfo from './ProductManagement/ProductBasicInfo';

function App() {
  return <ProductBasicInfo />;
}
```

#### 集成到现有页面
```jsx
import ProductManagementWithTabs from './ProductManagement/ProductManagementWithTabs';

function App() {
  return <ProductManagementWithTabs />;
}
```

### 4. 自定义配置

#### 修改标签
在 `ProductBasicInfo.jsx` 中修改 `tabs` 数组：

```jsx
const tabs = [
  { key: 'category', label: '商品分类', icon: <AppstoreOutlined /> },
  { key: 'spu', label: 'SPU管理', icon: <TagsOutlined /> },
  // 添加更多标签...
];
```

#### 修改样式
在 `ProductBasicInfo.css` 中自定义样式变量：

```css
.tab-button {
  padding: 12px 20px; /* 调整标签内边距 */
  font-size: 14px;    /* 调整字体大小 */
}
```

### 5. 响应式断点

- **桌面端**: > 768px - 显示完整标签
- **平板端**: 768px - 紧凑标签
- **移动端**: < 480px - 仅显示图标

### 6. 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 开发说明

### 添加新的三级页面

1. 在 `ProductBasicInfo.jsx` 中添加新的组件
2. 在 `tabs` 数组中添加新标签
3. 在 `renderContent` 函数中添加新的 case
4. 更新样式（如需要）

### 样式定制

所有样式都使用 CSS 变量，可以通过修改全局样式变量来统一调整主题色彩。
