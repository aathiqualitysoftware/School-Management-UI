package com.lrs.Repository;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.ClassSubjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassSubjectsRepository extends JpaRepository<ClassSubjects, Long> {
    List<ClassSubjects> findAll();
    Optional<ClassSubjects> findById(Long id);
    // Find by class
    List<ClassSubjects> findByClassId(Long classId);

    // Find by section
    List<ClassSubjects> findBySectionId(Long sectionId);

    // Find by subject
    List<ClassSubjects> findBySubjectId(String subjectId);

    // Find by staff
    List<ClassSubjects> findByStaffId(String staffId);

    // Find by class + section
    List<ClassSubjects> findByClassIdAndSectionId(Long classId, Long sectionId);

}

