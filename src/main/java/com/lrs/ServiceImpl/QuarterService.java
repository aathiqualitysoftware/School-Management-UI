package com.lrs.ServiceImpl;

import com.lrs.Entity.Quarter;
import com.lrs.Repository.QuarterRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

@Service
public class QuarterService {

    private final QuarterRepository repository;

    public QuarterService(QuarterRepository repository) {
        this.repository = repository;
    }

    public Quarter save(Quarter quarter) {
        quarter.setCreatedDate(LocalDateTime.now());
        return repository.save(quarter);
    }

    public Quarter update(Quarter quarter) {
        quarter.setModifiedDate(LocalDateTime.now());
        return repository.save(quarter);
    }

    public List<Quarter> getAll() {
        return repository.findAll();
    }

    public Quarter getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<Quarter> getByAcademicYear(Integer yearId) {
        return repository.findByAcademicYearId(yearId);
    }

    public List<Quarter> getActiveQuarters() {
        return repository.findByIsActiveTrue();
    }

    public List<Quarter> getByDateRange(LocalDate start, LocalDate end) {
        return repository.findByStartDateBetween(start, end);
    }

    public Quarter getByName(String name) {
        return repository.findByQuarterName(name);
    }
}