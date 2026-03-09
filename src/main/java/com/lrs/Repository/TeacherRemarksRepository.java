package com.lrs.Repository;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.TeacherRemarks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRemarksRepository extends JpaRepository<TeacherRemarks, Long> {
    List<TeacherRemarks> findAll();
    Optional<TeacherRemarks> findById(Long id);
}

