package com.lrs.Controller;

import com.lrs.Entity.MaritalStatus;
import com.lrs.ServiceImpl.MaritalStatusService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/marital-statuses")
public class MaritalStatusController {

    private final MaritalStatusService service;

    public MaritalStatusController(MaritalStatusService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public MaritalStatus create(@RequestBody MaritalStatus status) {
        return service.save(status);
    }

    // Update
    @PutMapping("/{id}")
    public MaritalStatus update(@PathVariable Long id, @RequestBody MaritalStatus status) {
        status.setId(id);
        return service.update(status);
    }

    // Get all
    @GetMapping
    public List<MaritalStatus> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public MaritalStatus getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public MaritalStatus getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}