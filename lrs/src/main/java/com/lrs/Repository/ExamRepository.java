package com.lrs.Repository;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.Exams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExamRepository extends JpaRepository<Exams, Long> {
    List<Exams> findAll();
    Optional<Exams> findById(Long id);
    // Find by unique exam code
    Exams findByUniqueExamCode(String uniqueExamCode);

    // Find by academic year
    List<Exams> findByAcademicYearId(Long academicYearId);

    // Find by exam type
    List<Exams> findByExamTypeId(Long examTypeId);

    // Find by class subject
    List<Exams> findByClassSubjectId(Long classSubjectId);

    // Find exams within a date range
    List<Exams> findByStartDateBetween(LocalDate start, LocalDate end);

}

