package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class StudentResponse {
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
    private String createdBy;
    private Timestamp createdDateTime;
    private String updatedBy;
    private Timestamp updatedDateTime;

    public String getCreatedDateTime() {
        if(null == createdDateTime){
            return null;
        }else{
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            return simpleDateFormat.format(new Date(createdDateTime.getTime()));
        }
    }

    public void setCreatedDateTime(Timestamp createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getUpdatedDateTime() {
        if(null == updatedDateTime){
            return null;
        }else{
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            return simpleDateFormat.format(new Date(updatedDateTime.getTime()));
        }
    }

    public void setUpdatedDateTime(Timestamp updatedDateTime) {
        this.updatedDateTime = updatedDateTime;
    }
}
