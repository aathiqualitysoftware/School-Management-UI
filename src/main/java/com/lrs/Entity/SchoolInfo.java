package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "school_info")
@Data
public class SchoolInfo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "school_name")
    private String schoolName;
    @Column(name = "email_id")
    private String emailId;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "address_1")
    private String address1;
    @Column(name = "address_2")
    private String address2;
    @Column(name = "whatup_link")
    private String whatupLink;
    @Column(name = "fb_link")
    private String fbLink;
    @Column(name = "twitter_link")
    private String twitterLink;
    @Column(name = "instagram_link")
    private String instagramLink;

    @Column(name = "createdBy", length = 50)
    private String createdBy;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "updatedBy", length = 50)
    private String updatedBy;

    @Column(name = "updatedAt")
    private LocalDate updatedAt;

}
