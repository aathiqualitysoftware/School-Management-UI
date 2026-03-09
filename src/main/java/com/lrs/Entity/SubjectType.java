package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "subject_types")
@Data
public class SubjectType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TypeId")
    private Integer typeId;

    @Column(name = "TypeName", length = 100, nullable = false)
    private String typeName;

    // Getters and Setters
}