package com.smart.ecommerce.repository;

import com.smart.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * repository/ 数据访问层
 * UserRepository.java - 用户数据访问接口
 * 
 * 功能：
 * 继承 JPA：提供基本的 CRUD 操作
 * 自定义查询：根据用户名和邮箱查找用户
 * 类型安全：使用 Optional 避免空指针异常
 */




@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserName(String userName);
    Optional<User> findByUserEmail(String userEmail);
}
