package com.lrs.ServiceImpl;

import com.lrs.Entity.Parent;
import com.lrs.Repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ParentService {
    @Autowired
    private ParentRepository parentRepository;

    public List<Parent> getAllParents() {
        return parentRepository.findAll();
    }

    public Optional<Parent> getParentById(Integer id) {
        return parentRepository.findById(id);
    }

    public Parent createParent(Parent parent) {
        parent.setCreatedAt(LocalDateTime.now());
        return parentRepository.save(parent);
    }

    public Parent updateParent(Integer id, Parent parentDetails) {
        Parent parent = parentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        parent.setName(parentDetails.getName());
        parent.setEmail(parentDetails.getEmail());
        parent.setMobileNumber(parentDetails.getMobileNumber());
        parent.setModeOfRelation(parentDetails.getModeOfRelation());
        parent.setUpdatedAt(LocalDateTime.now());
        parent.setUpdatedBy(parentDetails.getUpdatedBy());
        return parentRepository.save(parent);
    }

    public void deleteParent(Integer id) {
        parentRepository.deleteById(id);
    }

    public List<Parent> getParentsByStudent(Integer studentId) {
        return parentRepository.findByStudentId(studentId);
    }
}