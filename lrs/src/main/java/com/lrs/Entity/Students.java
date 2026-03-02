package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "students")
@Data
public class Students {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StudentId")
    private Long id;
    @Column(name = "FirstName")
    private String firstName;
    @Column(name = "LastName")
    private String lastName;
    @Column(name = "DateOfBirth")
    private Date dateOfBirth;
    @Column(name = "DateOfAdmission")
    private Date dateOfAdmission;
    @Column(name = "Nationality")
    private String nationality;
    @Column(name = "AadhaarCardNumber")
    private String aadhaarCardNumber;
    @Column(name = "PermanentAddress")
    private String permanentAddress;
    @Column(name = "RollNumber")
    private String rollNumber;
    @Column(name = "PhotoData")
    private String photoData;
    @Column(name = "IsTransferStudent")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean isTransferStudent;
    @Column(name = "RequiresBooks")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean requiresBooks;
    @Column(name = "RequiresUniform")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean requiresUniform;
    @Column(name = "RequiresTransport")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean requiresTransport;
    @Column(name = "ClassId")
    private Long classId;
    @Column(name = "SectionId")
    private Long sectionId;
    @Column(name = "AcademicYearId")
    private Long academicYearId;
    @Column(name = "GenderId")
    private Long genderId;
    @Column(name = "ReligionId")
    private Long religionId;
    @Column(name = "CasteCategoryId")
    private Long casteCategoryId;
    @Column(name = "BloodGroupId")
    private Long bloodGroupId;
    @Column(name = "AdmissionStatusId")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean admissionStatusId;
    @Column(name = "mobileNumber")
    private String mobileNumber;
    @Column(name = "admissionNumber")
    private String admissionNumber;
    @Column(name = "nativeLanguageId")
    private Long nativeLanguageId;
    @Column(name = "nationalityId")
    private Long nationalityId;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private Timestamp createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private Timestamp updatedDateTime;
    @Transient
    private String parentName;
    @Transient
    private String parentMobileNumber;
    @Transient
    private String parentEmail;
    @Transient
    private Long modeOfRelation;
}
