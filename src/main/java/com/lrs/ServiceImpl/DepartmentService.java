package com.lrs.ServiceImpl;

import com.lrs.Entity.Department;
import com.lrs.Repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public Department save(Department dept) {
        dept.setCreatedAt(LocalDateTime.now());
        return repository.save(dept);
    }

    public Department update(Department dept) {
        return repository.save(dept);
    }

    public List<Department> getAll() {
        return repository.findAll();
    }

    public Department getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Department getByDepartmentId(String deptId) {
        return repository.findByDepartmentId(deptId);
    }

    public Department getByDepartmentName(String name) {
        return repository.findByDepartmentName(name);
    }

    public List<Department> getActiveDepartments() {
        return repository.findByIsActiveTrue();
    }

    public List<Department> getInactiveDepartments() {
        return repository.findByIsActiveFalse();
    }
}