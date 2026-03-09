package com.lrs.Repository;

import com.lrs.Entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParentRepository extends JpaRepository<Parent, Integer> {
    List<Parent> findByStudentId(Integer studentId);
    List<Parent> findByModeOfRelation(Integer modeOfRelation);
    Optional<Parent> findByEmail(String email);
    Optional<Parent> findByMobileNumber(String mobileNumber);
}