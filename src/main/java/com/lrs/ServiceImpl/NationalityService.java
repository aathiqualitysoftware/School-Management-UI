package com.lrs.ServiceImpl;

import com.lrs.Entity.Nationality;
import com.lrs.Repository.NationalityRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NationalityService {

    private final NationalityRepository repository;

    public NationalityService(NationalityRepository repository) {
        this.repository = repository;
    }

    public Nationality save(Nationality nationality) {
        nationality.setCreatedAt(LocalDateTime.now());
        return repository.save(nationality);
    }

    public Nationality update(Nationality nationality) {
        nationality.setUpdatedAt(LocalDateTime.now());
        return repository.save(nationality);
    }

    public List<Nationality> getAll() {
        return repository.findAll();
    }

    public Nationality getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Nationality getByName(String name) {
        return repository.findByName(name);
    }
}