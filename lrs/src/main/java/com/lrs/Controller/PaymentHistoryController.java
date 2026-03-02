package com.lrs.Controller;

import com.lrs.Entity.PaymentHistory;
import com.lrs.ServiceImpl.PaymentHistoryService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/payment-history")
public class PaymentHistoryController {

    private final PaymentHistoryService service;

    public PaymentHistoryController(PaymentHistoryService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public PaymentHistory create(@RequestBody PaymentHistory payment) {
        return service.save(payment);
    }

    // Update
    @PutMapping("/{id}")
    public PaymentHistory update(@PathVariable Long id, @RequestBody PaymentHistory payment) {
        payment.setPaymentId(id);
        return service.update(payment);
    }

    // Get all
    @GetMapping
    public List<PaymentHistory> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public PaymentHistory getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/student/{studentId}")
    public List<PaymentHistory> getByStudent(@PathVariable Long studentId) {
        return service.getByStudent(studentId);
    }

    @GetMapping("/invoice/{invoiceId}")
    public List<PaymentHistory> getByInvoice(@PathVariable Long invoiceId) {
        return service.getByInvoice(invoiceId);
    }

    @GetMapping("/type/{typeId}")
    public List<PaymentHistory> getByPaymentType(@PathVariable Long typeId) {
        return service.getByPaymentType(typeId);
    }

    @GetMapping("/date-range")
    public List<PaymentHistory> getByDateRange(@RequestParam String start,
                                               @RequestParam String end) {
        return service.getByDateRange(LocalDateTime.parse(start), LocalDateTime.parse(end));
    }
}