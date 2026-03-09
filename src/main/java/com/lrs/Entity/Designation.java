package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "Designations")
@Data
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "DesignationId", length = 20, nullable = false)
    private String designationId;

    @Column(name = "DesignationName", length = 100, nullable = false)
    private String designationName;

    @Column(name = "DepartmentId", length = 20, nullable = false)
    private String departmentId;

    @Column(name = "Description", length = 500)
    private String description;

    @Column(name = "IsActive")
    private Boolean isActive;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    // Getters and Setters
}