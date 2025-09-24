package com.smart.ecommerce.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;




/**
 * util/ 工具层
 * 7️⃣ util/ 工具层
 * JwtUtil.java - JWT 工具类
 * 
 * 功能：
 * Token 生成：根据用户名生成 JWT token
 * Token 解析：提取 token 中的用户名和过期时间
 * Token 验证：验证 token 的有效性和过期状态
 * 过期管理：设置 24 小时过期时间
 * 安全签名：使用 HMAC-SHA256 算法签名
 * 
 * 主要方法：
 * generateToken() - 生成 token
 * extractUsername() - 提取用户名
 * validateToken() - 验证 token
 * isTokenExpired() - 检查是否过期
 * isTokenExpired() - 检查是否过期
 */






@Component
public class JwtUtil {
    private static final String SECRET_KEY = "mySecretKey123456789012345678901234567890";
    private static final int JWT_EXPIRATION = 86400000; // token有效期24小时(后端控制)

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, java.util.function.Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }
}
