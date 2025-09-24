import React from 'react';
import { Progress } from 'antd';
import './PasswordStrength.css';

const PasswordStrength = ({ password = '' }) => {
  const getPasswordStrength = (password) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    score = Object.values(checks).filter(Boolean).length;
    return { score, checks };
  };

  const { score, checks } = getPasswordStrength(password);
  const percentage = (score / 5) * 100;

  const getStrengthText = (score) => {
    switch (score) {
      case 0:
      case 1:
        return '很弱';
      case 2:
        return '弱';
      case 3:
        return '中等';
      case 4:
        return '强';
      case 5:
        return '很强';
      default:
        return '';
    }
  };

  const getStrengthColor = (score) => {
    switch (score) {
      case 0:
      case 1:
        return '#ff4d4f';
      case 2:
        return '#ff7a45';
      case 3:
        return '#faad14';
      case 4:
        return '#52c41a';
      case 5:
        return '#1890ff';
      default:
        return '#d9d9d9';
    }
  };

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="password-strength-header">
        <span>密码强度：</span>
        <span 
          className="strength-text"
          style={{ color: getStrengthColor(score) }}
        >
          {getStrengthText(score)}
        </span>
      </div>
      
      <Progress
        percent={percentage}
        showInfo={false}
        strokeColor={getStrengthColor(score)}
        className="password-strength-progress"
      />
      
      <div className="password-requirements">
        <div className={`requirement ${checks.length ? 'met' : ''}`}>
          <span className="requirement-icon">
            {checks.length ? '✓' : '○'}
          </span>
          至少8个字符
        </div>
        <div className={`requirement ${checks.lowercase ? 'met' : ''}`}>
          <span className="requirement-icon">
            {checks.lowercase ? '✓' : '○'}
          </span>
          包含小写字母
        </div>
        <div className={`requirement ${checks.uppercase ? 'met' : ''}`}>
          <span className="requirement-icon">
            {checks.uppercase ? '✓' : '○'}
          </span>
          包含大写字母
        </div>
        <div className={`requirement ${checks.number ? 'met' : ''}`}>
          <span className="requirement-icon">
            {checks.number ? '✓' : '○'}
          </span>
          包含数字
        </div>
        <div className={`requirement ${checks.special ? 'met' : ''}`}>
          <span className="requirement-icon">
            {checks.special ? '✓' : '○'}
          </span>
          包含特殊字符
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
