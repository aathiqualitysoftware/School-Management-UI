package com.lrs.Controller;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "students")
@Data
public class Stud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StudentId")
    private Integer studentId;

    @Column(name = "FirstName", length = 100, nullable = false)
    private String firstName;

    @Column(name = "LastName", length = 100)
    private String lastName;

    @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;

    @Column(name = "DateOfAdmission")
    private LocalDate dateOfAdmission;

    @Column(name = "Nationality", length = 50)
    private String nationality;

    @Column(name = "AadhaarCardNumber", length = 12)
    private String aadhaarCardNumber;

    @Lob
    @Column(name = "PermanentAddress")
    private String permanentAddress;

    @Column(name = "RollNumber", length = 20)
    private String rollNumber;

    @Lob
    @Column(name = "PhotoData")
    private byte[] photoData;

    @Column(name = "IsTransferStudent")
    private Boolean isTransferStudent;

    @Column(name = "RequiresBooks")
    private Boolean requiresBooks;

    @Column(name = "RequiresUniform")
    private Boolean requiresUniform;

    @Column(name = "RequiresTransport")
    private Boolean requiresTransport;

    @Column(name = "ClassId")
    private Integer classId;

    @Column(name = "SectionId")
    private Integer sectionId;

    @Column(name = "AcademicYearId")
    private Integer academicYearId;

    @Column(name = "GenderId")
    private Integer genderId;

    @Column(name = "ReligionId")
    private Integer religionId;

    @Column(name = "CasteCategoryId")
    private Integer casteCategoryId;

    @Column(name = "BloodGroupId")
    private Integer bloodGroupId;

    @Column(name = "AdmissionStatusId")
    private Integer admissionStatusId;

    @Column(name = "createdBy", length = 50)
    private String createdBy;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "updatedBy", length = 50)
    private String updatedBy;

    @Column(name = "updatedAt")
    private LocalDate updatedAt;

    @Column(name = "mobileNumber", length = 50)
    private String mobileNumber;

    @Column(name = "admissionNumber", length = 100)
    private String admissionNumber;

    @Column(name = "nativeLanguageId")
    private Integer nativeLanguageId;

    @Column(name = "nationalityId")
    private Integer nationalityId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "modeOfRelation")
    private Integer modeOfRelation;
    @Column(name = "parentName", length = 100)
    private String parentName;
    @Column(name = "parentMobileNumber", length = 100)
    private String parentMobileNumber;
    @Column(name = "parentEmail", length = 100)
    private String parentEmail;
    @Column(name = "userParentId", length = 100)
    private String userParentId;

//    @Transient
//    MultipartFile profileImage;

    // Getters and Setters
}