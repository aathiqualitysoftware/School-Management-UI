package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "leave_applications")
@Data
public class LeaveApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LeaveId")
    private Long leaveId;

    @Column(name = "StudentId", nullable = false)
    private Long studentId;

    @Column(name = "StartDate")
    private LocalDate startDate;

    @Column(name = "EndDate")
    private LocalDate endDate;

    @Column(name = "Reason", columnDefinition = "TEXT")
    private String reason;

    @Column(name = "Status", length = 20)
    private String status;

    @Column(name = "RequestedBy", length = 100)
    private String requestedBy;

    @Column(name = "ApprovedBy", length = 100)
    private String approvedBy;

    // Getters and Setters
}