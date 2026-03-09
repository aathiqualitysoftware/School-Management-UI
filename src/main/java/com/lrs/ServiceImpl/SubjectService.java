package com.lrs.ServiceImpl;

import com.lrs.Entity.Subjects;
import com.lrs.Repository.SubjectsRepository;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubjectService {

    private final SubjectsRepository repository;

    public SubjectService(SubjectsRepository repository) {
        this.repository = repository;
    }

    public Subjects save(Subjects subject) {
        subject.setCreatedAt(LocalDateTime.now());
        return repository.save(subject);
    }

    public Subjects update(Subjects subject) {
        return repository.save(subject);
    }

    public List<Subjects> getAll() {
        return repository.findAll();
    }

    public Subjects getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<Subjects> getByDepartment(String department) {
        return repository.findByDepartment(department);
    }

    public List<Subjects> getAssignedSubjects() {
        return repository.findByIsAssignedTrue();
    }

    public List<Subjects> getUnassignedSubjects() {
        return repository.findByIsAssignedFalse();
    }

    public Subjects getByName(String name) {
        return repository.findByName(name);
    }
}