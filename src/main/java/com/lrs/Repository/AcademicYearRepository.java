package com.lrs.Repository;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.BloodGroups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcademicYearRepository extends JpaRepository<AcademicYear, Long> {
    List<AcademicYear> findAll();
    Optional<AcademicYear> findById(Long id);
}

