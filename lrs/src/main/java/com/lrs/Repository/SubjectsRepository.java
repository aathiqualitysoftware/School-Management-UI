package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.security.auth.Subject;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectsRepository extends JpaRepository<Subjects, Long> {
    List<Subjects> findAll();
    Optional<Subjects> findById(Long id);
    // Find by department
    List<Subjects> findByDepartment(String department);

    // Find assigned subjects
    List<Subjects> findByIsAssignedTrue();

    // Find unassigned subjects
    List<Subjects> findByIsAssignedFalse();

    // Find by subject name
    Subjects findByName(String subjectName);

}

