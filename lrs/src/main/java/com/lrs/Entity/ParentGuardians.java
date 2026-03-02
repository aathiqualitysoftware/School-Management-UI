package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "parentguardians")
@Data
public class ParentGuardians {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ParentId")
    private Long id;

    @Column(name = "StudentId")
    private Long studentId;

    @Column(name = "FullName")
    private String fullName;

    @Column(name = "PrimaryPhoneNumber")
    private String primaryPhoneNumber;
    @Column(name = "WhatsappNumber")
    private String whatsappNumber;
    @Column(name = "Occupation")
    private String occupation;
    @Column(name = "SecondaryPhoneNumber")
    private String secondaryPhoneNumber;
    @Column(name = "ParentAadhaar")
    private String parentAadhaar;
    @Column(name = "ParentEmail")
    private String parentEmail;

    @Column(name = "PhotoData")
    private String photoData;
    @Column(name = "RelationId")
    private String relationId;
    @Column(name = "userId")
    private String userId;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private Timestamp createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private Timestamp updatedDateTime;
}
