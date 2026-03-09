package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "reportsendhistory")
@Data
public class ReportSendHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HistoryId")
    private Integer historyId;

    @Column(name = "StudentId", nullable = false)
    private Integer studentId;

    @Column(name = "AcademicYearId", nullable = false)
    private Integer academicYearId;

    @Column(name = "ClassId", nullable = false)
    private Integer classId;

    @Column(name = "SectionId", nullable = false)
    private Integer sectionId;

    @Column(name = "ReportPeriod", length = 100)
    private String reportPeriod;

    @Column(name = "SentDate")
    private LocalDateTime sentDate;

    @Column(name = "ParentContact", length = 50)
    private String parentContact;

    @Column(name = "SentByUserId")
    private Integer sentByUserId;

    @Column(name = "ReportDataJson", columnDefinition = "NVARCHAR(MAX)")
    private String reportDataJson;

    @Column(name = "QuarterId")
    private Integer quarterId;

    // Getters and Setters
}