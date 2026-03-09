package com.lrs.ServiceImpl;

import com.lrs.Entity.Designation;
import com.lrs.Repository.DesignationRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DesignationService {

    private final DesignationRepository repository;

    public DesignationService(DesignationRepository repository) {
        this.repository = repository;
    }

    public Designation save(Designation designation) {
        designation.setCreatedAt(LocalDateTime.now());
        return repository.save(designation);
    }

    public Designation update(Designation designation) {
        return repository.save(designation);
    }

    public List<Designation> getAll() {
        return repository.findAll();
    }

    public Designation getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Designation getByDesignationId(String designationId) {
        return repository.findByDesignationId(designationId);
    }

    public Designation getByDesignationName(String name) {
        return repository.findByDesignationName(name);
    }

    public List<Designation> getByDepartmentId(String deptId) {
        return repository.findByDepartmentId(deptId);
    }

    public List<Designation> getActiveDesignations() {
        return repository.findByIsActiveTrue();
    }

    public List<Designation> getInactiveDesignations() {
        return repository.findByIsActiveFalse();
    }
}