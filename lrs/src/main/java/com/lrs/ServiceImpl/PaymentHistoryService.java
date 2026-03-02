package com.lrs.ServiceImpl;

import com.lrs.Entity.PaymentHistory;
import com.lrs.Repository.PaymentHistoryRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentHistoryService {

    private final PaymentHistoryRepository repository;

    public PaymentHistoryService(PaymentHistoryRepository repository) {
        this.repository = repository;
    }

    public PaymentHistory save(PaymentHistory payment) {
        payment.setPaymentDate(LocalDateTime.now());
        return repository.save(payment);
    }

    public PaymentHistory update(PaymentHistory payment) {
        return repository.save(payment);
    }

    public List<PaymentHistory> getAll() {
        return repository.findAll();
    }

    public PaymentHistory getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<PaymentHistory> getByStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<PaymentHistory> getByInvoice(Long invoiceId) {
        return repository.findByInvoiceId(invoiceId);
    }

    public List<PaymentHistory> getByPaymentType(Long typeId) {
        return repository.findByPaymentTypeId(typeId);
    }

    public List<PaymentHistory> getByDateRange(LocalDateTime start, LocalDateTime end) {
        return repository.findByPaymentDateBetween(start, end);
    }
}