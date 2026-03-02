package com.lrs.ServiceImpl;

import com.lrs.Entity.Invoice;
import com.lrs.Repository.InvoiceRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository repository;

    public InvoiceService(InvoiceRepository repository) {
        this.repository = repository;
    }

    public Invoice save(Invoice invoice) {
        return repository.save(invoice);
    }

    public Invoice update(Invoice invoice) {
        return repository.save(invoice);
    }

    public List<Invoice> getAll() {
        return repository.findAll();
    }

    public Invoice getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<Invoice> getByStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<Invoice> getByAcademicYear(Long yearId) {
        return repository.findByAcademicYearId(yearId);
    }

    public List<Invoice> getByFeeStatus(Long statusId) {
        return repository.findByFeeStatusId(statusId);
    }

    public List<Invoice> getOverdueInvoices(LocalDate date) {
        return repository.findByDueDateBefore(date);
    }
}