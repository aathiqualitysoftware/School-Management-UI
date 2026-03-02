package com.lrs.ServiceImpl;

import com.lrs.Entity.Genders;
import com.lrs.Repository.GendersRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GenderService {

    private final GendersRepository repository;

    public GenderService(GendersRepository repository) {
        this.repository = repository;
    }

    public Genders save(Genders gender) {
        return repository.save(gender);
    }

    public Genders update(Genders gender) {
        return repository.save(gender);
    }

    public List<Genders> getAll() {
        return repository.findAll();
    }

    public Genders getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Genders getByName(String name) {
        return repository.findByName(name);
    }
}