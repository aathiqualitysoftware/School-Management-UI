package com.lrs.ServiceImpl;

import com.lrs.Entity.Religions;
import com.lrs.Repository.ReligionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReligionService {

    private final ReligionRepository repository;

    public ReligionService(ReligionRepository repository) {
        this.repository = repository;
    }

    public Religions save(Religions religion) {
        return repository.save(religion);
    }

    public Religions update(Religions religion) {
        return repository.save(religion);
    }

    public List<Religions> getAll() {
        return repository.findAll();
    }

    public Religions getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Religions getByName(String name) {
        return repository.findByName(name);
    }
}