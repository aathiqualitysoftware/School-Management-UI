package com.lrs.Controller;

import com.lrs.Entity.SubjectType;
import com.lrs.ServiceImpl.SubjectTypeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subject-types")
public class SubjectTypeController {

    private final SubjectTypeService service;

    public SubjectTypeController(SubjectTypeService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public SubjectType create(@RequestBody SubjectType type) {
        return service.save(type);
    }

    // Update
    @PutMapping("/{id}")
    public SubjectType update(@PathVariable Integer id, @RequestBody SubjectType type) {
        type.setTypeId(id);
        return service.update(type);
    }

    // Get all
    @GetMapping
    public List<SubjectType> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public SubjectType getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public SubjectType getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}