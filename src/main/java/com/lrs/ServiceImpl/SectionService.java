package com.lrs.ServiceImpl;

import com.lrs.Entity.Sections;
import com.lrs.Repository.SectionsRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class SectionService {

    private final SectionsRepository repository;

    public SectionService(SectionsRepository repository) {
        this.repository = repository;
    }

    public Sections save(Sections section) {
        section.setCreatedAt(LocalDate.now());
        return repository.save(section);
    }

    public Sections update(Sections section) {
        section.setUpdatedAt(LocalDate.now());
        return repository.save(section);
    }

    public List<Sections> getAll() {
        return repository.findAll();
    }

    public Sections getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<Sections> getByClass(Long classId) {
        return repository.findByClassId(classId);
    }

    public List<Sections> getActiveSections() {
        return repository.findByIsActiveTrue();
    }

    public Sections getByName(String name) {
        return repository.findBySectionName(name);
    }
}