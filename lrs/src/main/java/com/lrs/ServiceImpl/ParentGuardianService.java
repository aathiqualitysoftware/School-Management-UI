package com.lrs.ServiceImpl;

import com.lrs.Entity.ParentGuardian;
import com.lrs.Repository.ParentGuardianRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ParentGuardianService {

    private final ParentGuardianRepository repository;

    public ParentGuardianService(ParentGuardianRepository repository) {
        this.repository = repository;
    }

    public ParentGuardian save(ParentGuardian guardian) {
        guardian.setCreatedAt(LocalDate.now());
        return repository.save(guardian);
    }

    public ParentGuardian update(ParentGuardian guardian) {
        guardian.setUpdatedAt(LocalDate.now());
        return repository.save(guardian);
    }

    public List<ParentGuardian> getAll() {
        return repository.findAll();
    }

    public ParentGuardian getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<ParentGuardian> getByStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<ParentGuardian> getByRelation(Long relationId) {
        return repository.findByRelationId(relationId);
    }

    public ParentGuardian getByAadhaar(String aadhaar) {
        return repository.findByParentAadhaar(aadhaar);
    }

    public ParentGuardian getByEmail(String email) {
        return repository.findByParentEmail(email);
    }
}