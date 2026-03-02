package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "parentguardians")
@Data
public class ParentGuardian {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parentId;

    @Column(name = "StudentId", nullable = false)
    private Long studentId;

    @Column(name = "FullName", length = 200, nullable = false)
    private String fullName;

    @Column(name = "PrimaryPhoneNumber", length = 15)
    private String primaryPhoneNumber;

    @Column(name = "WhatsappNumber", length = 15)
    private String whatsappNumber;

    @Column(name = "Occupation", length = 100)
    private String occupation;

    @Column(name = "SecondaryPhoneNumber", length = 15)
    private String secondaryPhoneNumber;

    @Column(name = "ParentAadhaar", length = 12)
    private String parentAadhaar;

    @Column(name = "ParentEmail", length = 100)
    private String parentEmail;

    @Lob
    @Column(name = "PhotoData")
    private byte[] photoData;

    @Column(name = "RelationId")
    private Long relationId;

    @Column(name = "userId")
    private Long userId;

    @Column(name = "createdBy", length = 50)
    private String createdBy;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "updatedBy", length = 50)
    private String updatedBy;

    @Column(name = "updatedAt")
    private LocalDate updatedAt;

    // Getters and Setters
}