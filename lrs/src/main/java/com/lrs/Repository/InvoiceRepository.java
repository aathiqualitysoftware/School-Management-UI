package com.lrs.Repository;

import com.lrs.Entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    // Find invoices by student
    List<Invoice> findByStudentId(Long studentId);

    // Find invoices by academic year
    List<Invoice> findByAcademicYearId(Long academicYearId);

    // Find invoices by fee status
    List<Invoice> findByFeeStatusId(Long feeStatusId);

    // Find overdue invoices
    List<Invoice> findByDueDateBefore(LocalDate date);
}