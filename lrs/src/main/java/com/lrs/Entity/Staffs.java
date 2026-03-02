package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "staffs")
@Data
public class Staffs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "StaffId")
    private Long staffid;
    @Column(name = "FirstName")
    private String firstName;
    @Column(name = "LastName")
    private String lastName;
    @Column(name = "MiddleName")
    private String middleName;
    @Column(name = "Email")
    private String email;
    @Column(name = "Phone")
    private String phone;
    @Column(name = "Designation")
    private String designation;
    @Column(name = "Department")
    private String department;
    @Column(name = "Dob")
    private Date dob;
    @Column(name = "Gender")
    private String gender;
    @Column(name = "MaritalStatus")
    private String maritalStatus;
    @Column(name = "EmploymentType")
    private String employmentType;
    @Column(name = "StaffStatus")
    private String staffStatus;
    @Column(name = "JoiningDate")
    private Date joiningDate;
    @Column(name = "NativeLanguage")
    private String nativeLanguage;
    @Column(name = "Aadhar")
    private String aadhar;
    @Column(name = "PAN")
    private String pan;
    @Column(name = "Qualification")
    private String qualification;
    @Column(name = "Religion")
    private String religion;
    @Column(name = "Address")
    private String address;
    @Column(name = "EmergencyContactName")
    private String emergencyContactName;
    @Column(name = "EmergencyContactRelation")
    private String emergencyContactRelation;
    @Column(name = "EmergencyContactPhone")
    private String emergencyContactPhone;
    @Column(name = "BankAccountNumber")
    private String bankAccountNumber;
    @Column(name = "BankIFSC")
    private String bankIFSC;
    @Column(name = "UPIID")
    private String upiId;
    @Column(name = "ResumePath")
    private String resumePath;
    @Column(name = "IdProofPath")
    private String idProofPath;
    @Column(name = "Photo")
    private String photo;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private Timestamp createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private Timestamp updatedDateTime;
}
