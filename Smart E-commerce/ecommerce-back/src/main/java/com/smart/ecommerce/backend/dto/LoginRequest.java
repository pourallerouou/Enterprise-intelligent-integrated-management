package com.smart.ecommerce.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * dto/ 数据传输对象层
 * LoginRequest.java - 封装前端发送的登录/注册请求数据
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
    private String phone;
    private String email;
    private String userType;
}
