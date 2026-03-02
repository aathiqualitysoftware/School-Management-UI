package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "parent")
@Data
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String mobileNumber;
    private Integer studentId;     // FK to students table
    private Integer modeOfRelation; // e.g. Father, Mother, Guardian

    private String createdBy;
    private LocalDateTime createdAt;
    private String updatedBy;
    private LocalDateTime updatedAt;

    // getters and setters
}