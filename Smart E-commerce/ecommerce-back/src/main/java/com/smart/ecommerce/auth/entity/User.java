package com.smart.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_name", unique = true, nullable = false, length = 50)
    private String userName;

    @Column(name = "user_pwd", nullable = false, length = 50)
    private String userPwd;

    @Column(name = "user_type", length = 50)
    private String userType;

    @Column(name = "user_email", unique = true, length = 50)
    private String userEmail;

    @Column(name = "user_phone", unique = true, length = 20)
    private String userPhone;
}
