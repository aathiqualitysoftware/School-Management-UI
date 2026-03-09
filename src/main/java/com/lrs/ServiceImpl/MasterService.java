package com.lrs.ServiceImpl;

import com.lrs.Entity.Master;
import com.lrs.Repository.MasterRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MasterService {

    private final MasterRepository repository;

    public MasterService(MasterRepository repository) {
        this.repository = repository;
    }

    public Master save(Master master) {
        master.setCreatedDate(LocalDateTime.now());
        return repository.save(master);
    }

    public Master update(Master master) {
        master.setModifiedDate(LocalDateTime.now());
        return repository.save(master);
    }

    public List<Master> getAll() {
        return repository.findAll();
    }

    public Master getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<Master> getByMasterType(Integer typeId) {
        return repository.findByMasterTypeId(typeId);
    }

    public List<Master> getByParentMaster(Integer parentId) {
        return repository.findByParentMasterId(parentId);
    }

    public List<Master> getActiveMasters() {
        return repository.findByIsActiveTrue();
    }

    public Master getByName(String name) {
        return repository.findByName(name);
    }
}