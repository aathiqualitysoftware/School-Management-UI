package com.lrs.ServiceImpl;

import com.lrs.Entity.BloodGroups;
import com.lrs.Repository.BloodGroupsRepository;
import jakarta.persistence.OptimisticLockException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BloodGroupService {

    private final BloodGroupsRepository repository;

    public BloodGroupService(BloodGroupsRepository repository) {
        this.repository = repository;
    }
    @Transactional
    public BloodGroups save(BloodGroups bloodGroup) {
        try {
            repository.save(bloodGroup);
        } catch (OptimisticLockException e) {
            // handle conflict: reload entity, retry, or notify user
        }
        return bloodGroup;
    }

    public BloodGroups update(BloodGroups bloodGroup) {
        return repository.save(bloodGroup);
    }

    public List<BloodGroups> getAll() {
        return repository.findAll();
    }

    public BloodGroups getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public BloodGroups getByName(String name) {
        return repository.findByName(name);
    }
}