package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "MasterType")
@Data
public class MasterType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MasterTypeId")
    private Integer masterTypeId;

    @Column(name = "TypeName", length = 100, nullable = false)
    private String typeName;

    @Column(name = "TypeCode", length = 50, nullable = false, unique = true)
    private String typeCode;

    @Column(name = "IsActive")
    private Boolean isActive;

    @Column(name = "CreatedDate")
    private LocalDateTime createdDate;

    @Column(name = "CreatedBy", length = 100)
    private String createdBy;

    // Getters and Setters
}