package com.lrs.Controller;

import com.lrs.Entity.Department;
import com.lrs.ServiceImpl.DepartmentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService service;

    public DepartmentController(DepartmentService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Department create(@RequestBody Department dept) {
        return service.save(dept);
    }

    // Update
    @PutMapping("/{id}")
    public Department update(@PathVariable Long id, @RequestBody Department dept) {
        dept.setId(id);
        return service.update(dept);
    }

    // Get all
    @GetMapping
    public List<Department> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Department getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/deptId/{deptId}")
    public Department getByDepartmentId(@PathVariable String deptId) {
        return service.getByDepartmentId(deptId);
    }

    @GetMapping("/name/{name}")
    public Department getByDepartmentName(@PathVariable String name) {
        return service.getByDepartmentName(name);
    }

    @GetMapping("/active")
    public List<Department> getActiveDepartments() {
        return service.getActiveDepartments();
    }

    @GetMapping("/inactive")
    public List<Department> getInactiveDepartments() {
        return service.getInactiveDepartments();
    }
}