package com.lrs.Dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Data
public class StaffRequest {
    private String firstName;
    private String lastName;
    private String middleName;
    private String email;
    private String phone;
    private String designation;
    private String department;
    private Date dob;
    private String gender;
    private String maritalStatus;
    private String employmentType;
    private String staffStatus;
    private Date joiningDate;
    private String nativeLanguage;
    private String aadhar;
    private String pan;
    private String qualification;
    private String religion;
    private String address;
    private String emergencyContactName;
    private String emergencyContactRelation;
    private String emergencyContactPhone;
    private String bankAccountNumber;
    private String bankIFSC;
    private String upiId;
    private String resumePath;
    private String idProofPath;
    private String photo;
 }
