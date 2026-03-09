package com.lrs.Repository;

import com.lrs.Entity.ClassAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClassAssignmentRepository extends JpaRepository<ClassAssignment, Integer> {

    // Find by class
    List<ClassAssignment> findByClassId(Integer classId);

    // Find by section
    List<ClassAssignment> findBySectionId(Integer sectionId);

    // Find by teacher
    List<ClassAssignment> findByClassTeacherId(String classTeacherId);
}