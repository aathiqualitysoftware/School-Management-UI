package com.lrs.ServiceImpl;

import com.lrs.Entity.FeePlan;
import com.lrs.Repository.FeePlanRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeePlanService {

    private final FeePlanRepository repository;

    public FeePlanService(FeePlanRepository repository) {
        this.repository = repository;
    }

    public FeePlan save(FeePlan plan) {
        return repository.save(plan);
    }

    public FeePlan update(FeePlan plan) {
        return repository.save(plan);
    }

    public List<FeePlan> getAll() {
        return repository.findAll();
    }

    public FeePlan getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<FeePlan> getByClass(Long classId) {
        return repository.findByClassId(classId);
    }

    public List<FeePlan> getByFeeType(String feeType) {
        return repository.findByFeeType(feeType);
    }
}