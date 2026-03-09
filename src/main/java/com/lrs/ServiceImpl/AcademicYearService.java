package com.lrs.ServiceImpl;

import com.lrs.Entity.AcademicYear;
import com.lrs.Repository.AcademicYearRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AcademicYearService {

    private final AcademicYearRepository repository;

    public AcademicYearService(AcademicYearRepository repository) {
        this.repository = repository;
    }

    public AcademicYear save(AcademicYear year) {
        return repository.save(year);
    }

    public AcademicYear update(AcademicYear year) {
        return repository.save(year); // save works for both insert & update
    }

    public List<AcademicYear> getAll() {
        return repository.findAll();
    }

    public AcademicYear getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}