package com.lrs.ServiceImpl;

import com.lrs.Entity.EmploymentType;
import com.lrs.Repository.EmploymentTypeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmploymentTypeService {

    private final EmploymentTypeRepository repository;

    public EmploymentTypeService(EmploymentTypeRepository repository) {
        this.repository = repository;
    }

    public EmploymentType save(EmploymentType type) {
        return repository.save(type);
    }

    public EmploymentType update(EmploymentType type) {
        return repository.save(type);
    }

    public List<EmploymentType> getAll() {
        return repository.findAll();
    }

    public EmploymentType getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public EmploymentType getByTypeName(String typeName) {
        return repository.findByTypeName(typeName);
    }
}