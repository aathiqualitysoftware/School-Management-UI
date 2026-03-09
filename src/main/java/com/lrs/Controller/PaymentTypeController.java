package com.lrs.Controller;

import com.lrs.Entity.PaymentType;
import com.lrs.ServiceImpl.PaymentTypeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payment-types")
public class PaymentTypeController {

    private final PaymentTypeService service;

    public PaymentTypeController(PaymentTypeService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public PaymentType create(@RequestBody PaymentType type) {
        return service.save(type);
    }

    // Update
    @PutMapping("/{id}")
    public PaymentType update(@PathVariable Long id, @RequestBody PaymentType type) {
        type.setId(id);
        return service.update(type);
    }

    // Get all
    @GetMapping
    public List<PaymentType> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public PaymentType getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public PaymentType getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}