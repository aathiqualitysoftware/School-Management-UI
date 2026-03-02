package com.lrs.ServiceImpl;

import com.lrs.Entity.SubjectType;
import com.lrs.Repository.SubjectTypeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubjectTypeService {

    private final SubjectTypeRepository repository;

    public SubjectTypeService(SubjectTypeRepository repository) {
        this.repository = repository;
    }

    public SubjectType save(SubjectType type) {
        return repository.save(type);
    }

    public SubjectType update(SubjectType type) {
        return repository.save(type);
    }

    public List<SubjectType> getAll() {
        return repository.findAll();
    }

    public SubjectType getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public SubjectType getByName(String name) {
        return repository.findByTypeName(name);
    }
}