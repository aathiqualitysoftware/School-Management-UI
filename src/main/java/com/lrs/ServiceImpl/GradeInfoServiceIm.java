package com.lrs.ServiceImpl;

import com.lrs.Entity.GradeInfo;
import com.lrs.Repository.GradeInfoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class GradeInfoServiceIm {

    private final GradeInfoRepository repository;

    public GradeInfoServiceIm(GradeInfoRepository repository) {
        this.repository = repository;
    }

    public GradeInfo save(GradeInfo grade) {
        grade.setCreatedDateTime(LocalDate.now());
        return repository.save(grade);
    }

    public GradeInfo update(GradeInfo grade) {
        grade.setUpdatedDateTime(LocalDate.now());
        return repository.save(grade);
    }

    public List<GradeInfo> getAll() {
        return repository.findAll();
    }

    public GradeInfo getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public GradeInfo getByGradeName(String name) {
        return repository.findByGradeName(name);
    }

    public List<GradeInfo> getByMarkRange(String from, String to) {
        return repository.findByFromMarkLessThanEqualAndToMarkGreaterThanEqual(from, to);
    }
}