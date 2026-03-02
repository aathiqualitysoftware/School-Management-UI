package com.lrs.Repository;

import com.lrs.Entity.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Long> {

    // Find payments by student
    List<PaymentHistory> findByStudentId(Long studentId);

    // Find payments by invoice
    List<PaymentHistory> findByInvoiceId(Long invoiceId);

    // Find payments by type
    List<PaymentHistory> findByPaymentTypeId(Long paymentTypeId);

    // Find payments within a date range
    List<PaymentHistory> findByPaymentDateBetween(LocalDateTime start, LocalDateTime end);
}