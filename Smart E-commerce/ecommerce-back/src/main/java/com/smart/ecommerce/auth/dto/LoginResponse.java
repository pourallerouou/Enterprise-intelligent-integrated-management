package com.smart.ecommerce.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * dto/ 数据传输对象层
 * LoginResponse.java - 封装后端返回的登录/注册响应数据
 */

@Data
@NoArgsConstructor
public class LoginResponse {
    private boolean success;
    private String message;
    private String token;
    private String username;
    private String userType;

    // 简化构造函数，用于错误响应
    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // 完整构造函数，用于成功响应
    public LoginResponse(boolean success, String message, String token, String username, String userType) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.username = username;
        this.userType = userType;
    }
}
