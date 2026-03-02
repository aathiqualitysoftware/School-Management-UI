package com.lrs.Repository;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.ExamType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamTypesRepository extends JpaRepository<ExamType, Long> {
    List<ExamType> findAll();
    Optional<ExamType> findById(Long id);
    // Custom query: find by exam type name
    ExamType findByName(String examTypeName);

}

