package com.smart.ecommerce.backend.controller;

import com.smart.ecommerce.backend.dto.LoginRequest;
import com.smart.ecommerce.backend.dto.LoginResponse;
import com.smart.ecommerce.backend.entity.User;
import com.smart.ecommerce.backend.repository.UserRepository;
import com.smart.ecommerce.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;



/**
 * controller/ 控制层
 * AuthController.java - 认证控制器
 *
 * 功能：
 * 用户登录：验证用户名和密码，返回 JWT token
 * 用户注册：检查用户名和邮箱是否已存在，创建新用户账户
 * 跨域支持：允许前端 localhost:3000 访问
 * 统一响应：返回标准化的 JSON 响应格式
 * 
 * API 端点：
 * POST /api/auth/login - 用户登录
 * POST /api/auth/register - 用户注册
 */




@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> userOpt = userRepository.findByUserName(loginRequest.getUsername());
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.ok(new LoginResponse(false, "用户名不存在"));
            }

            User user = userOpt.get();
            
            // 验证密码（这里假设密码是明文存储，实际项目中应该加密存储）
            if (!user.getUserPwd().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(new LoginResponse(false, "密码错误"));
            }

            String token = jwtUtil.generateToken(user.getUserName());
            
            return ResponseEntity.ok(new LoginResponse(
                true, 
                "登录成功", 
                token, 
                user.getUserName(), 
                user.getUserType()
            ));
            
        } catch (Exception e) {
            return ResponseEntity.ok(new LoginResponse(false, "登录失败: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody LoginRequest registerRequest) {
        try {
            // 检查用户名是否已存在
            if (userRepository.findByUserName(registerRequest.getUsername()).isPresent()) {
                return ResponseEntity.ok(new LoginResponse(false, "用户名已存在"));
            }

            // 检查邮箱是否已存在
            if (registerRequest.getEmail() != null && 
                userRepository.findByUserEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.ok(new LoginResponse(false, "邮箱已存在"));
            }

            // 创建新用户
            User newUser = new User();
            newUser.setUserName(registerRequest.getUsername());
            newUser.setUserPwd(registerRequest.getPassword());
            // 使用用户选择的用户类型，如果没有提供则默认为 "user"
            newUser.setUserType(registerRequest.getUserType() != null && !registerRequest.getUserType().isEmpty() 
                ? registerRequest.getUserType() : "user");
            
            // 使用用户提供的邮箱，如果没有则生成默认邮箱
            if (registerRequest.getEmail() != null && !registerRequest.getEmail().isEmpty()) {
                newUser.setUserEmail(registerRequest.getEmail());
            } else {
                newUser.setUserEmail(registerRequest.getUsername() + "@example.com");
            }
            
            // 使用用户提供的手机号，如果没有则生成唯一手机号
            if (registerRequest.getPhone() != null && !registerRequest.getPhone().isEmpty()) {
                newUser.setUserPhone(registerRequest.getPhone());
            } else {
                // 生成唯一的手机号（基于时间戳）
                newUser.setUserPhone("138" + String.format("%08d", System.currentTimeMillis() % 100000000));
            }

            userRepository.save(newUser);

            return ResponseEntity.ok(new LoginResponse(true, "注册成功"));
            
        } catch (Exception e) {
            return ResponseEntity.ok(new LoginResponse(false, "注册失败: " + e.getMessage()));
        }
    }
}
