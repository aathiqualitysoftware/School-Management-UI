package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "class_subjects")
@Data
public class ClassSubjects {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ClassSubjectId")
    private Long id;

    @Column(name = "ClassId", nullable = false)
    private Long classId;

    @Column(name = "SectionId", nullable = false)
    private Long sectionId;

    @Column(name = "SubjectId", length = 50, nullable = false)
    private String subjectId;

    @Column(name = "TypeId")
    private Long typeId;

    @Column(name = "StaffId", length = 50)
    private String staffId;

    // Getters and Setters
}