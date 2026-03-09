package com.lrs.Controller;

import com.lrs.Entity.Designation;
import com.lrs.ServiceImpl.DesignationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {

    private final DesignationService service;

    public DesignationController(DesignationService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Designation create(@RequestBody Designation designation) {
        return service.save(designation);
    }

    // Update
    @PutMapping("/{id}")
    public Designation update(@PathVariable Long id, @RequestBody Designation designation) {
        designation.setId(id);
        return service.update(designation);
    }

    // Get all
    @GetMapping
    public List<Designation> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Designation getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/designationId/{designationId}")
    public Designation getByDesignationId(@PathVariable String designationId) {
        return service.getByDesignationId(designationId);
    }

    @GetMapping("/name/{name}")
    public Designation getByDesignationName(@PathVariable String name) {
        return service.getByDesignationName(name);
    }

    @GetMapping("/department/{deptId}")
    public List<Designation> getByDepartmentId(@PathVariable String deptId) {
        return service.getByDepartmentId(deptId);
    }

    @GetMapping("/active")
    public List<Designation> getActiveDesignations() {
        return service.getActiveDesignations();
    }

    @GetMapping("/inactive")
    public List<Designation> getInactiveDesignations() {
        return service.getInactiveDesignations();
    }
}