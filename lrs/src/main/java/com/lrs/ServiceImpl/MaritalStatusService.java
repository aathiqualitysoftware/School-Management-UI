package com.lrs.ServiceImpl;

import com.lrs.Entity.MaritalStatus;
import com.lrs.Repository.MaritalStatusRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MaritalStatusService {

    private final MaritalStatusRepository repository;

    public MaritalStatusService(MaritalStatusRepository repository) {
        this.repository = repository;
    }

    public MaritalStatus save(MaritalStatus status) {
        return repository.save(status);
    }

    public MaritalStatus update(MaritalStatus status) {
        return repository.save(status);
    }

    public List<MaritalStatus> getAll() {
        return repository.findAll();
    }

    public MaritalStatus getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public MaritalStatus getByName(String name) {
        return repository.findByStatusName(name);
    }
}