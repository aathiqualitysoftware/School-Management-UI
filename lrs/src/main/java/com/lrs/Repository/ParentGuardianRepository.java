package com.lrs.Repository;

import com.lrs.Entity.ParentGuardian;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParentGuardianRepository extends JpaRepository<ParentGuardian, Long> {

    // Find guardians by student
    List<ParentGuardian> findByStudentId(Long studentId);

    // Find guardians by relation
    List<ParentGuardian> findByRelationId(Long relationId);

    // Find guardians by Aadhaar
    ParentGuardian findByParentAadhaar(String aadhaar);

    // Find guardians by email
    ParentGuardian findByParentEmail(String email);
}