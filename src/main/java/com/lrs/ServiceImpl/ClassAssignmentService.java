package com.lrs.ServiceImpl;

import com.lrs.Entity.ClassAssignment;
import com.lrs.Repository.ClassAssignmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClassAssignmentService {

    private final ClassAssignmentRepository repository;

    public ClassAssignmentService(ClassAssignmentRepository repository) {
        this.repository = repository;
    }

    public ClassAssignment save(ClassAssignment assignment) {
        assignment.setCreatedAt(LocalDateTime.now());
        return repository.save(assignment);
    }

    public ClassAssignment update(ClassAssignment assignment) {
        assignment.setUpdatedAt(LocalDateTime.now());
        return repository.save(assignment);
    }

    public List<ClassAssignment> getAll() {
        return repository.findAll();
    }

    public ClassAssignment getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<ClassAssignment> getByClass(Integer classId) {
        return repository.findByClassId(classId);
    }

    public List<ClassAssignment> getBySection(Integer sectionId) {
        return repository.findBySectionId(sectionId);
    }

    public List<ClassAssignment> getByTeacher(String teacherId) {
        return repository.findByClassTeacherId(teacherId);
    }
}