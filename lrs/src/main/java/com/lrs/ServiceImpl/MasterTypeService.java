package com.lrs.ServiceImpl;

import com.lrs.Entity.MasterType;
import com.lrs.Repository.MasterTypeRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MasterTypeService {

    private final MasterTypeRepository repository;

    public MasterTypeService(MasterTypeRepository repository) {
        this.repository = repository;
    }

    public MasterType save(MasterType masterType) {
        masterType.setCreatedDate(LocalDateTime.now());
        return repository.save(masterType);
    }

    public MasterType update(MasterType masterType) {
        return repository.save(masterType);
    }

    public List<MasterType> getAll() {
        return repository.findAll();
    }

    public MasterType getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public MasterType getByCode(String code) {
        return repository.findByTypeCode(code);
    }

    public MasterType getByName(String name) {
        return repository.findByTypeName(name);
    }

    public List<MasterType> getActiveTypes() {
        return repository.findByIsActiveTrue();
    }
}