package com.lrs.ServiceImpl;

import com.lrs.Entity.Languages;
import com.lrs.Repository.LanguagesRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LanguageService {

    private final LanguagesRepository repository;

    public LanguageService(LanguagesRepository repository) {
        this.repository = repository;
    }

    public Languages save(Languages language) {
        return repository.save(language);
    }

    public Languages update(Languages language) {
        return repository.save(language);
    }

    public List<Languages> getAll() {
        return repository.findAll();
    }

    public Languages getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Languages getByName(String name) {
        return repository.findByLanguageName(name);
    }
}