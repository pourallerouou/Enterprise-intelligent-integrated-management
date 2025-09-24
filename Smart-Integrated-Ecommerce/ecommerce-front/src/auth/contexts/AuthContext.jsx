import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { message } from 'antd';
import authService from '../services/authService';

const AuthContext = createContext();

// 认证状态管理
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

// 初始状态
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 初始化时检查本地存储的token
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          // 验证token是否有效
          const isValid = await authService.validateToken(token);
          if (isValid) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: JSON.parse(userData),
                token: token
              }
            });
          } else {
            // token无效，清除本地存储
            authService.clearAuthData();
            dispatch({ type: 'LOGOUT' });
          }
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.clearAuthData();
        dispatch({ type: 'LOGOUT' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();
  }, []);

  // 登录函数
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authService.login(credentials);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          token: response.token
        }
      });
      message.success('登录成功！');
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || '登录失败'
      });
      message.error(error.message || '登录失败');
      return { success: false, error: error.message };
    }
  };

  // 注册函数
  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authService.register(userData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          token: response.token
        }
      });
      message.success('注册成功！');
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || '注册失败'
      });
      message.error(error.message || '注册失败');
      return { success: false, error: error.message };
    }
  };

  // 登出函数
  const logout = () => {
    authService.clearAuthData();
    dispatch({ type: 'LOGOUT' });
    message.success('已退出登录');
  };

  // 清除错误
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
