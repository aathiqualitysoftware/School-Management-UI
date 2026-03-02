package com.lrs.ServiceImpl;

import com.lrs.Entity.FeeStatus;
import com.lrs.Repository.FeeStatusRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeeStatusService {

    private final FeeStatusRepository repository;

    public FeeStatusService(FeeStatusRepository repository) {
        this.repository = repository;
    }

    public FeeStatus save(FeeStatus status) {
        return repository.save(status);
    }

    public FeeStatus update(FeeStatus status) {
        return repository.save(status);
    }

    public List<FeeStatus> getAll() {
        return repository.findAll();
    }

    public FeeStatus getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public FeeStatus getByStatusName(String name) {
        return repository.findByStatusName(name);
    }
}