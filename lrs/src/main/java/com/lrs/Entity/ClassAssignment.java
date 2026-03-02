package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "class_assignments")
@Data
public class ClassAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ClassAssignmentId")
    private Integer classAssignmentId;

    @Column(name = "ClassId", nullable = false)
    private Integer classId;

    @Column(name = "SectionId", nullable = false)
    private Integer sectionId;

    @Column(name = "ClassTeacherId", length = 50)
    private String classTeacherId;

    @Column(name = "Capacity")
    private Integer capacity;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    // Getters and Setters
}