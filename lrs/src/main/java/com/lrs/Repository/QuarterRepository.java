package com.lrs.Repository;

import com.lrs.Entity.Quarter;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface QuarterRepository extends JpaRepository<Quarter, Integer> {

    // Find quarters by academic year
    List<Quarter> findByAcademicYearId(Integer academicYearId);

    // Find active quarters
    List<Quarter> findByIsActiveTrue();

    // Find quarters within a date range
    List<Quarter> findByStartDateBetween(LocalDate start, LocalDate end);

    // Find by quarter name
    Quarter findByQuarterName(String quarterName);
}