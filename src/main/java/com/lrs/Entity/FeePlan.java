package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "feeplans")
@Data
public class FeePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FeePlanId")
    private Integer feePlanId;

    @Column(name = "ClassId", nullable = false)
    private Integer classId;

    @Column(name = "FeeType", length = 50, nullable = false)
    private String feeType;

    @Column(name = "TuitionFee")
    private BigDecimal tuitionFee;

    @Column(name = "AdmissionFee")
    private BigDecimal admissionFee;

    @Column(name = "BooksFee")
    private BigDecimal booksFee;

    @Column(name = "UniformFee")
    private BigDecimal uniformFee;

    @Column(name = "TransportationFee")
    private BigDecimal transportationFee;

    @Column(name = "ExamFee")
    private BigDecimal examFee;

    @Column(name = "HallTicketFee")
    private BigDecimal hallTicketFee;

    // Getters and Setters
}