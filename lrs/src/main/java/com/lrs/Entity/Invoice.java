package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "invoice")
@Data
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Long invoiceId;

    @Column(name = "StudentId", nullable = false)
    private Long studentId;

    @Column(name = "academic_year_id", nullable = false)
    private Long academicYearId;

    @Column(name = "total_fee")
    private BigDecimal totalFee;

    @Column(name = "paid_till_now")
    private BigDecimal paidTillNow;

    @Column(name = "balance_due")
    private BigDecimal balanceDue;

    @Column(name = "fee_status_id")
    private Long feeStatusId;

    @Column(name = "invoice_date")
    private LocalDate invoiceDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    // Getters and Setters
}