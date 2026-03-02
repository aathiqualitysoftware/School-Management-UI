package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "paymenthistory")
@Data
public class PaymentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "invoice_id", nullable = false)
    private Long invoiceId;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "amount_paid")
    private BigDecimal amountPaid;

    @Column(name = "payment_type_id")
    private Long paymentTypeId;

    @Column(name = "notes", columnDefinition = "NVARCHAR(MAX)")
    private String notes;

    // Getters and Setters
}