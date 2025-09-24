import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider 
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: '#667eea',
            borderRadius: 12,
            colorBgContainer: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
