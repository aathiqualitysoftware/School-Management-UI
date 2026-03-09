package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "staffs")
@Data
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String staffId;
    private String firstName;
    private String lastName;
    private String middleName;
    private String email;
    private String phone;
    private String designation;
    private String department;

    @Column(name = "dob")
    private LocalDate dob;

    private String gender;
    private String maritalStatus;
    private String employmentType;
    private String staffStatus;

    @Column(name = "joiningDate")
    private LocalDate joiningDate;

    private String nativeLanguage;
    private String aadhar;
    private String pan;
    private String qualification;
    private String religion;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String emergencyContactName;
    private String emergencyContactRelation;
    private String emergencyContactPhone;

    private String bankAccountNumber;
    private String bankIFSC;
    private String upiId;
    private String resumePath;
    private String idProofPath;

    @Lob
    private byte[] photo;

    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDate updatedAt;
    private String updatedBy;
    private int userId;
    @Column(name = "profileImageUploadId")
    private int profileImageUploadId;
    @Column(name = "resumeUploadId")
    private int resumeUploadId;
    @Column(name = "idProofImageUploadId")
    private int idProofImageUploadId;
    @Column(name = "experienceImageUploadId")
    private int experienceImageUploadId;

    @Transient
    byte[] staffProfileImage;
    @Transient
    byte[] resumeImage;
    @Transient
    byte[] idProofImage;
    @Transient
    byte[] experienceImage;

    // getters and setters
}