// API 基础配置
const API_BASE_URL = 'http://localhost:8080/api';

// Token管理类
class TokenManager {
  constructor() {
    this.TOKEN_KEY = 'token';
    this.USER_DATA_KEY = 'userData';
    this.TOKEN_EXPIRY_KEY = 'tokenExpiry';
    this.TOKEN_DURATION = 24 * 60 * 60 * 1000; // 24小时
  }

  // 生成token
  generateToken() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return btoa(`${timestamp}-${random}`);
  }

  // 保存认证数据
  saveAuthData(user, token) {
    const expiryTime = Date.now() + this.TOKEN_DURATION;
    
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  // 获取token
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // 获取用户数据
  getUserData() {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // 检查token是否过期
  isTokenExpired() {
    const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiryTime) return true;
    
    return Date.now() > parseInt(expiryTime);
  }

  // 验证token有效性
  validateToken(token) {
    const storedToken = this.getToken();
    if (!storedToken || storedToken !== token) {
      return false;
    }
    
    return !this.isTokenExpired();
  }

  // 清除认证数据
  clearAuthData() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  // 刷新token
  refreshToken() {
    const userData = this.getUserData();
    if (userData) {
      const newToken = this.generateToken();
      this.saveAuthData(userData, newToken);
      return newToken;
    }
    return null;
  }
}

const tokenManager = new TokenManager();

// 认证服务
export const authService = {
  // 发送HTTP请求
  async request(url, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '请求失败');
      }
      
      return data;
    } catch (error) {
      console.error('API请求错误:', error);
      throw error;
    }
  },

  // 登录验证
  async login(credentials) {
    const { username, password } = credentials;

    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    if (!response.success) {
      throw new Error(response.message || '登录失败');
    }

    // 使用后端返回的JWT token
    const token = response.token;
    
    // 构建用户数据
    const user = {
      id: response.username, // 使用username作为id
      username: response.username,
      email: response.username + '@example.com', // 默认邮箱
      role: response.userType || 'user',
      name: response.username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.username}`,
      lastLogin: new Date().toISOString()
    };
    
    // 保存认证数据
    tokenManager.saveAuthData(user, token);

    return {
      user,
      token
    };
  },

  // 注册用户
  async register(userData) {
    const { username, email, password, confirmPassword, userType } = userData;

    // 验证密码确认
    if (password !== confirmPassword) {
      throw new Error('两次输入的密码不一致');
    }

    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
        userType
      })
    });

    if (!response.success) {
      throw new Error(response.message || '注册失败');
    }

    // 注册成功后自动登录
    return await this.login({ username, password });
  },

  // 验证token
  async validateToken(token) {
    // 对于JWT token，我们简单检查是否存在且格式正确
    if (!token || typeof token !== 'string') {
      return false;
    }
    
    // 检查token格式（JWT应该有3个部分用.分隔）
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    
    // 检查是否过期（简单检查，实际应该解析JWT）
    try {
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  },

  // 刷新token
  async refreshToken() {
    const newToken = tokenManager.refreshToken();
    if (!newToken) {
      throw new Error('无法刷新token');
    }
    
    return newToken;
  },

  // 登出
  async logout() {
    tokenManager.clearAuthData();
    return true;
  },

  // 获取当前用户信息
  getCurrentUser() {
    const userData = tokenManager.getUserData();
    const token = tokenManager.getToken();
    
    if (!userData || !token || tokenManager.isTokenExpired()) {
      return null;
    }
    
    return userData;
  },

  // 检查是否已登录
  isAuthenticated() {
    const token = tokenManager.getToken();
    return token && !tokenManager.isTokenExpired();
  },

  // 清除认证数据
  clearAuthData() {
    tokenManager.clearAuthData();
  }
};

export default authService;
