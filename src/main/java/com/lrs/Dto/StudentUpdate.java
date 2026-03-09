package com.lrs.Dto;

import lombok.Data;

import java.util.Date;

@Data
public class StudentUpdate {
    private Long id;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private Date dateOfAdmission;
    private String nationality;
    private String aadhaarCardNumber;
    private String permanentAddress;
    private String rollNumber;
    private String photoData;
    private Boolean isTransferStudent;
    private Boolean requiresBooks;
    private Boolean requiresUniform;
    private Boolean requiresTransport;
    private Long classId;
    private Long sectionId;
    private Long academicYearId;
    private Long genderId;
    private Long religionId;
    private Long casteCategoryId;
    private Long bloodGroupId;
    private Boolean admissionStatusId;
    private String mobileNumber;
    private String admissionNumber;
    private Long nativeLanguageId;
    private Long nationalityId;
}
