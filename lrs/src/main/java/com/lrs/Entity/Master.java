package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "Master")
@Data
public class Master {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MasterId")
    private Integer masterId;

    @Column(name = "MasterTypeId", nullable = false)
    private Integer masterTypeId;

    @Column(name = "ParentMasterId")
    private Integer parentMasterId;

    @Column(name = "Name", length = 150, nullable = false)
    private String name;

    @Column(name = "Description", length = 500)
    private String description;

    @Column(name = "DisplayOrder")
    private Integer displayOrder;

    @Column(name = "IsActive")
    private Boolean isActive;

    @Column(name = "CreatedDate")
    private LocalDateTime createdDate;

    @Column(name = "CreatedBy", length = 100)
    private String createdBy;

    @Column(name = "ModifiedDate")
    private LocalDateTime modifiedDate;

    @Column(name = "ModifiedBy", length = 100)
    private String modifiedBy;

    // Getters and Setters
}