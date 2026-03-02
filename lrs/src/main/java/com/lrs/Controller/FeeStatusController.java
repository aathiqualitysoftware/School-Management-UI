package com.lrs.Controller;

import com.lrs.Entity.FeeStatus;
import com.lrs.ServiceImpl.FeeStatusService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fee-status")
public class FeeStatusController {

    private final FeeStatusService service;

    public FeeStatusController(FeeStatusService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public FeeStatus create(@RequestBody FeeStatus status) {
        return service.save(status);
    }

    // Update
    @PutMapping("/{id}")
    public FeeStatus update(@PathVariable Long id, @RequestBody FeeStatus status) {
        status.setId(id);
        return service.update(status);
    }

    // Get all
    @GetMapping
    public List<FeeStatus> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public FeeStatus getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by status name
    @GetMapping("/name/{name}")
    public FeeStatus getByStatusName(@PathVariable String name) {
        return service.getByStatusName(name);
    }
}