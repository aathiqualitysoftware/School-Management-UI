package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "previousacademicinfo")
@Data
public class PreviousAcademicInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;

    @Column(name = "LastAttendedClass", length = 50)
    private String lastAttendedClass;

    @Column(name = "PreviousSchoolName", length = 200)
    private String previousSchoolName;

    @Column(name = "TransferCertificateNumber", length = 100)
    private String transferCertificateNumber;

    @Lob
    @Column(name = "TransferCertificateData")
    private byte[] transferCertificateData;

    @Column(name = "TransferCertificateFileName", length = 255)
    private String transferCertificateFileName;

    // Getters and Setters
}