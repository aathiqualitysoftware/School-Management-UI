package com.lrs.ServiceImpl;

import com.lrs.Entity.Relation;
import com.lrs.Repository.RelationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RelationService {

    private final RelationRepository repository;

    public RelationService(RelationRepository repository) {
        this.repository = repository;
    }

    public Relation save(Relation relation) {
        return repository.save(relation);
    }

    public Relation update(Relation relation) {
        return repository.save(relation);
    }

    public List<Relation> getAll() {
        return repository.findAll();
    }

    public Relation getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Relation getByName(String name) {
        return repository.findByName(name);
    }
}