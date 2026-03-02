package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users_lrs")
@Data
public class Users {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId")
    private Long userId;
    @Column(name = "UserName")
    private String userName;
    @Column(name = "Email")
    private String email;
    @Column(name = "StatusId")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean statusId;
    @Column(name = "PhoneNumber")
    private String phoneNumber;
    @Column(name = "RoleId")
    private Long roleId;
    @Column(name = "Password")
    private String password;

}
