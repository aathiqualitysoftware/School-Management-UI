//package com.lrs.Controller;
//
//import com.lrs.Entity.Invoice;
//import com.lrs.ServiceImpl.InvoiceService;
//import org.springframework.web.bind.annotation.*;
//import java.time.LocalDate;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/invoices")
//public class InvoiceController {
//
//    private final InvoiceService service;
//
//    public InvoiceController(InvoiceService service) {
//        this.service = service;
//    }
//
//    // Create
//    @PostMapping
//    public Invoice create(@RequestBody Invoice invoice) {
//        return service.save(invoice);
//    }
//
//    // Update
//    @PutMapping("/{id}")
//    public Invoice update(@PathVariable Long id, @RequestBody Invoice invoice) {
//        invoice.setInvoiceId(id);
//        return service.update(invoice);
//    }
//
//    // Get all
//    @GetMapping
//    public List<Invoice> getAll() {
//        return service.getAll();
//    }
//
//    // Get by ID
//    @GetMapping("/{id}")
//    public Invoice getById(@PathVariable Long id) {
//        return service.getById(id);
//    }
//
//    // Delete
//    @DeleteMapping("/{id}")
//    public void delete(@PathVariable Long id) {
//        service.delete(id);
//    }
//
//    // Custom APIs
//    @GetMapping("/student/{studentId}")
//    public List<Invoice> getByStudent(@PathVariable Long studentId) {
//        return service.getByStudent(studentId);
//    }
//
//    @GetMapping("/academic-year/{yearId}")
//    public List<Invoice> getByAcademicYear(@PathVariable Long yearId) {
//        return service.getByAcademicYear(yearId);
//    }
//
//    @GetMapping("/status/{statusId}")
//    public List<Invoice> getByFeeStatus(@PathVariable Long statusId) {
//        return service.getByFeeStatus(statusId);
//    }
//
//    @GetMapping("/overdue")
//    public List<Invoice> getOverdueInvoices(@RequestParam String date) {
//        return service.getOverdueInvoices(LocalDate.parse(date));
//    }
//}