package com.lrs.ServiceImpl;

import com.lrs.Entity.PaymentType;
import com.lrs.Repository.PaymentTypeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaymentTypeService {

    private final PaymentTypeRepository repository;

    public PaymentTypeService(PaymentTypeRepository repository) {
        this.repository = repository;
    }

    public PaymentType save(PaymentType type) {
        return repository.save(type);
    }

    public PaymentType update(PaymentType type) {
        return repository.save(type);
    }

    public List<PaymentType> getAll() {
        return repository.findAll();
    }

    public PaymentType getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public PaymentType getByName(String name) {
        return repository.findByTypeName(name);
    }
}