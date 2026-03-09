package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "roles")
@Data
public class Roles {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoleId")
    private Long roleId;
    @Column(name = "RoleName")
    private String roleName;
    @Column(name = "RoleCategory")
    private String roleCategory;
}
