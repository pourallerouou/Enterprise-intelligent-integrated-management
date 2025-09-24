import React, { useState } from 'react';
import './SystemManagement.css';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  SettingOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';

const SystemManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const systemInfo = [
    {
      key: '1',
      name: 'CPU使用率',
      value: '45%',
      status: '正常',
      threshold: 80,
      current: 45,
    },
    {
      key: '2',
      name: '内存使用率',
      value: '62%',
      status: '正常',
      threshold: 85,
      current: 62,
    },
    {
      key: '3',
      name: '磁盘使用率',
      value: '78%',
      status: '警告',
      threshold: 80,
      current: 78,
    },
    {
      key: '4',
      name: '网络带宽',
      value: '35%',
      status: '正常',
      threshold: 90,
      current: 35,
    },
  ];

  const logs = [
    {
      key: '1',
      id: 'LOG001',
      level: 'INFO',
      message: '用户登录成功',
      module: '用户管理',
      time: '2024-01-15 10:30:00',
      user: 'admin',
    },
    {
      key: '2',
      id: 'LOG002',
      level: 'WARN',
      message: '磁盘空间不足警告',
      module: '系统监控',
      time: '2024-01-15 10:25:00',
      user: 'system',
    },
    {
      key: '3',
      id: 'LOG003',
      level: 'ERROR',
      message: '数据库连接失败',
      module: '数据库',
      time: '2024-01-15 10:20:00',
      user: 'system',
    },
    {
      key: '4',
      id: 'LOG004',
      level: 'INFO',
      message: '订单处理完成',
      module: '订单管理',
      time: '2024-01-15 10:15:00',
      user: 'admin',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      '正常': 'tag-success',
      '警告': 'tag-warning',
      '错误': 'tag-error',
    };
    return colors[status] || 'tag-info';
  };

  const getLevelColor = (level) => {
    const colors = {
      'INFO': 'tag-info',
      'WARN': 'tag-warning',
      'ERROR': 'tag-error',
      'DEBUG': 'tag-info',
    };
    return colors[level] || 'tag-info';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      '正常': <CheckCircleOutlined />,
      '警告': <WarningOutlined />,
      '错误': <ExclamationCircleOutlined />
    };
    return iconMap[status] || <CheckCircleOutlined />;
  };

  const getLevelIcon = (level) => {
    const iconMap = {
      'INFO': <CheckCircleOutlined />,
      'WARN': <WarningOutlined />,
      'ERROR': <ExclamationCircleOutlined />,
      'DEBUG': <CheckCircleOutlined />
    };
    return iconMap[level] || <CheckCircleOutlined />;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1 className="page-title">系统管理</h1>
        <p className="page-description">
          系统监控、日志管理、配置管理等系统维护功能
        </p>
      </div>

      <div className="page-content">
        {/* 系统监控 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">系统监控</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                  <tr>
                    <th>监控项</th>
                    <th>当前值</th>
                    <th>状态</th>
                    <th>使用率</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {systemInfo.map((item, index) => (
                    <tr key={item.key}>
                      <td>
                        {item.name}
                      </td>
                      <td>
                        {item.value}
                      </td>
                      <td>
                        <span className={`tag ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{
                                background: item.current > item.threshold ? '#f5222d' : '#52c41a'
                              }}
                            ></div>
                          </div>
                          <div className="progress-text">
                            阈值: {item.threshold}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stats-grid">
                          <button className="btn btn-secondary" title="配置">
                            <SettingOutlined />
                          </button>
                          <button className="btn btn-primary" title="刷新">
                            <ReloadOutlined />
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

        {/* 系统配置和系统信息 */}
        <div className="stats-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">系统配置</h3>
            </div>
            <div className="card-body">
              <div className="stats-grid">
                <div className="stats-grid">
                  <span>自动备份</span>
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>
                      <span></span>
                    </span>
                  </label>
                </div>
                <div className="stats-grid">
                  每天凌晨2点自动备份数据库
                </div>
              </div>
              <div className="stats-grid">
                <div className="stats-grid">
                  <span>邮件通知</span>
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>
                      <span></span>
                    </span>
                  </label>
                </div>
                <div className="stats-grid">
                  系统异常时发送邮件通知
                </div>
              </div>
              <div className="stats-grid">
                <div className="stats-grid">
                  <span>日志记录</span>
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>
                      <span></span>
                    </span>
                  </label>
                </div>
                <div className="stats-grid">
                  记录系统操作日志
                </div>
              </div>
              <div>
                <div className="stats-grid">
                  <span>维护模式</span>
                  <label>
                    <input type="checkbox" />
                    <span>
                      <span></span>
                    </span>
                  </label>
                </div>
                <div className="stats-grid">
                  开启后系统将暂停服务进行维护
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">系统信息</h3>
            </div>
            <div className="card-body">
              <div className="stats-grid">
                <div className="stats-grid">系统版本</div>
                <div className="stats-grid">v1.0.0</div>
              </div>
              <div className="stats-grid">
                <div className="stats-grid">运行时间</div>
                <div className="stats-grid">15天 8小时 32分钟</div>
              </div>
              <div className="stats-grid">
                <div className="stats-grid">数据库版本</div>
                <div className="stats-grid">MySQL 8.0.25</div>
              </div>
              <div>
                <div className="stats-grid">最后更新</div>
                <div className="stats-grid">2024-01-15 10:30:00</div>
              </div>
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
                  placeholder="搜索日志内容..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchOutlined />
              </div>
              <select 
                className="input-field" 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="all">全部级别</option>
                <option value="INFO">INFO</option>
                <option value="WARN">WARN</option>
                <option value="ERROR">ERROR</option>
                <option value="DEBUG">DEBUG</option>
              </select>
              <button className="btn btn-primary">
                <PlusOutlined />
                导出日志
              </button>
            </div>
          </div>
        </div>

        {/* 系统日志 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">系统日志</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <table>
                <thead>
                    <tr>
                    <th>日志ID</th>
                    <th>级别</th>
                    <th>消息</th>
                    <th>模块</th>
                    <th>用户</th>
                    <th>时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <tr key={log.key}>
                      <td>
                        {log.id}
                      </td>
                      <td>
                        <span className={`tag ${getLevelColor(log.level)}`}>
                          {getLevelIcon(log.level)}
                          {log.level}
                        </span>
                      </td>
                      <td>
                        {log.message}
                      </td>
                      <td>
                        {log.module}
                      </td>
                      <td>
                        {log.user}
                      </td>
                      <td>
                        {log.time}
                      </td>
                      <td>
                        <div className="stats-grid">
                          <button className="btn btn-secondary" title="查看详情">
                            <EyeOutlined />
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
              <SettingOutlined />
            </div>
            <h4>系统配置</h4>
            <p>配置系统参数</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <ReloadOutlined />
            </div>
            <h4>系统重启</h4>
            <p>重启系统服务</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <CheckCircleOutlined />
            </div>
            <h4>健康检查</h4>
            <p>检查系统健康状态</p>
          </div>
          <div className="card">
            <div className="stats-grid">
              <ExclamationCircleOutlined />
            </div>
            <h4>异常处理</h4>
            <p>处理系统异常</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemManagement;
