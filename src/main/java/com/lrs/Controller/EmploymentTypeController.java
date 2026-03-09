package com.lrs.Controller;

import com.lrs.Entity.EmploymentType;
import com.lrs.ServiceImpl.EmploymentTypeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employment-types")
public class EmploymentTypeController {

    private final EmploymentTypeService service;

    public EmploymentTypeController(EmploymentTypeService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public EmploymentType create(@RequestBody EmploymentType type) {
        return service.save(type);
    }

    // Update
    @PutMapping("/{id}")
    public EmploymentType update(@PathVariable Long id, @RequestBody EmploymentType type) {
        type.setId(id);
        return service.update(type);
    }

    // Get all
    @GetMapping
    public List<EmploymentType> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public EmploymentType getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by type name
    @GetMapping("/name/{typeName}")
    public EmploymentType getByTypeName(@PathVariable String typeName) {
        return service.getByTypeName(typeName);
    }
}