package com.lrs.ServiceImpl;

import com.lrs.Entity.ClassSubjects;
import com.lrs.Repository.ClassSubjectsRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClassSubjectService {

    private final ClassSubjectsRepository repository;

    public ClassSubjectService(ClassSubjectsRepository repository) {
        this.repository = repository;
    }

    public ClassSubjects save(ClassSubjects subject) {
        return repository.save(subject);
    }

    public ClassSubjects update(ClassSubjects subject) {
        return repository.save(subject);
    }

    public List<ClassSubjects> getAll() {
        return repository.findAll();
    }

    public ClassSubjects getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<ClassSubjects> getByClass(Long classId) {
        return repository.findByClassId(classId);
    }

    public List<ClassSubjects> getBySection(Long sectionId) {
        return repository.findBySectionId(sectionId);
    }

    public List<ClassSubjects> getBySubject(String subjectId) {
        return repository.findBySubjectId(subjectId);
    }

    public List<ClassSubjects> getByStaff(String staffId) {
        return repository.findByStaffId(staffId);
    }

    public List<ClassSubjects> getByClassAndSection(Long classId, Long sectionId) {
        return repository.findByClassIdAndSectionId(classId, sectionId);
    }
}