package com.lrs.ServiceImpl;

import com.lrs.Entity.Categories;
import com.lrs.Repository.CategoriesRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final CategoriesRepository repository;

    public CategoryService(CategoriesRepository repository) {
        this.repository = repository;
    }

    public Categories save(Categories category) {
        return repository.save(category);
    }

    public Categories update(Categories category) {
        return repository.save(category);
    }

    public List<Categories> getAll() {
        return repository.findAll();
    }

    public Categories getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Categories getByName(String name) {
        return repository.findByName(name);
    }
}