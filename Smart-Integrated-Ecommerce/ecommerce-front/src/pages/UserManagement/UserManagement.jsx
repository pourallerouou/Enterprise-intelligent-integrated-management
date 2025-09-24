import React, { useState } from 'react';
import './UserManagement.css';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  UserOutlined,
  TeamOutlined,
  CrownOutlined,
  LockOutlined
} from '@ant-design/icons';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const users = [
    {
      id: 'U001',
      username: 'admin',
      name: '系统管理员',
      email: 'admin@example.com',
      phone: '138-0000-0001',
      role: '超级管理员',
      status: '正常',
      lastLogin: '2024-01-15 10:30:00',
      createTime: '2024-01-01 00:00:00',
      avatar: 'https://via.placeholder.com/40x40?text=A'
    },
    {
      id: 'U002',
      username: 'manager1',
      name: '张经理',
      email: 'zhang@example.com',
      phone: '138-0000-0002',
      role: '管理员',
      status: '正常',
      lastLogin: '2024-01-15 09:45:00',
      createTime: '2024-01-05 10:00:00',
      avatar: 'https://via.placeholder.com/40x40?text=Z'
    },
    {
      id: 'U003',
      username: 'operator1',
      name: '李操作员',
      email: 'li@example.com',
      phone: '138-0000-0003',
      role: '操作员',
      status: '正常',
      lastLogin: '2024-01-15 08:30:00',
      createTime: '2024-01-10 14:20:00',
      avatar: 'https://via.placeholder.com/40x40?text=L'
    },
    {
      id: 'U004',
      username: 'viewer1',
      name: '王查看员',
      email: 'wang@example.com',
      phone: '138-0000-0004',
      role: '查看员',
      status: '禁用',
      lastLogin: '2024-01-10 16:00:00',
      createTime: '2024-01-12 09:15:00',
      avatar: 'https://via.placeholder.com/40x40?text=W'
    },
    {
      id: 'U005',
      username: 'operator2',
      name: '赵操作员',
      email: 'zhao@example.com',
      phone: '138-0000-0005',
      role: '操作员',
      status: '正常',
      lastLogin: '2024-01-14 11:20:00',
      createTime: '2024-01-08 16:45:00',
      avatar: 'https://via.placeholder.com/40x40?text=Z'
    }
  ];

  const roles = [
    {
      id: 'R001',
      name: '超级管理员',
      description: '拥有所有权限',
      permissions: ['用户管理', '系统设置', '数据管理', '财务管理'],
      userCount: 1,
      status: '正常'
    },
    {
      id: 'R002',
      name: '管理员',
      description: '拥有大部分管理权限',
      permissions: ['用户管理', '商品管理', '订单管理', '营销管理'],
      userCount: 3,
      status: '正常'
    },
    {
      id: 'R003',
      name: '操作员',
      description: '拥有基础操作权限',
      permissions: ['商品管理', '订单管理', '库存管理'],
      userCount: 5,
      status: '正常'
    },
    {
      id: 'R004',
      name: '查看员',
      description: '只有查看权限',
      permissions: ['数据查看'],
      userCount: 2,
      status: '正常'
    }
  ];

  const getStatusClass = (status) => {
    const statusMap = {
      '正常': 'tag-success',
      '禁用': 'tag-error',
      '待激活': 'tag-warning'
    };
    return statusMap[status] || 'tag-info';
  };

  const getRoleClass = (role) => {
    const roleMap = {
      '超级管理员': 'tag-error',
      '管理员': 'tag-success',
      '操作员': 'tag-info',
      '查看员': 'tag-warning'
    };
    return roleMap[role] || 'tag-info';
  };

  const getRoleIcon = (role) => {
    const iconMap = {
      '超级管理员': <CrownOutlined />,
      '管理员': <UserOutlined />,
      '操作员': <TeamOutlined />,
      '查看员': <LockOutlined />
    };
    return iconMap[role] || <UserOutlined />;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === '正常').length;
  const adminUsers = users.filter(u => u.role === '超级管理员' || u.role === '管理员').length;
  const operatorUsers = users.filter(u => u.role === '操作员').length;

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">用户管理</h1>
        <p className="page-description">
          管理用户账户、角色权限、用户状态等用户相关功能
        </p>
      </div>

      <div className="page-content">
        {/* 统计概览 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">总用户数</div>
            <div className="stat-value">
              {totalUsers}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">活跃用户</div>
            <div className="stat-value">
              {activeUsers}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">管理员</div>
            <div className="stat-value">
              {adminUsers}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">操作员</div>
            <div className="stat-value">
              {operatorUsers}
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
                  placeholder="搜索用户名、姓名或邮箱..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchOutlined />
              </div>
              <select
                className="input-field"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">全部角色</option>
                <option value="超级管理员">超级管理员</option>
                <option value="管理员">管理员</option>
                <option value="操作员">操作员</option>
                <option value="查看员">查看员</option>
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                添加用户
              </button>
            </div>
          </div>
        </div>

        {/* 用户列表 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">用户列表</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>用户信息</th>
                    <th>角色</th>
                    <th>状态</th>
                    <th>联系方式</th>
                    <th>最后登录</th>
                    <th>创建时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>
                        <div className="stats-grid">
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="user-avatar"
                          />
                          <div>
                            <div className="stats-grid">
                              {user.name}
                            </div>
                            <div className="stats-grid">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`tag ${getRoleClass(user.role)}`}>
                          {getRoleIcon(user.role)}
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="stats-grid">
                          {user.email}
                        </div>
                        <div className="stats-grid">
                          {user.phone}
                        </div>
                      </td>
                      <td>
                        {user.lastLogin}
                      </td>
                      <td>
                        {user.createTime}
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

        {/* 角色管理 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">角色管理</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>角色信息</th>
                    <th>权限</th>
                    <th>用户数</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={role.id}>
                      <td>
                        <div>
                          <div className="stats-grid">
                            {role.name}
                          </div>
                          <div className="stats-grid">
                            {role.description}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stats-grid">
                          {role.permissions.map((permission, idx) => (
                            <span key={idx} className="tag tag-info">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        {role.userCount}人
                      </td>
                      <td>
                        <span className={`tag ${getStatusClass(role.status)}`}>
                          {role.status}
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

        {/* 快速操作 */}
        <div className="stats-grid">
          <div className="card">
            <div className="stats-grid">
              <UserOutlined />
            </div>
            <h4>添加用户</h4>
            <p>创建新用户账户</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <TeamOutlined />
            </div>
            <h4>角色管理</h4>
            <p>管理用户角色和权限</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <CrownOutlined />
            </div>
            <h4>权限设置</h4>
            <p>配置系统权限</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <LockOutlined />
            </div>
            <h4>安全设置</h4>
            <p>用户安全配置</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
