package com.lrs.Repository;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.GradeInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GradeInfoRepository extends JpaRepository<GradeInfo, Long> {
    List<GradeInfo> findAll();
    Optional<GradeInfo> findById(Long id);
    // Find by grade name
    GradeInfo findByGradeName(String gradeName);

    // Find by mark range (students scoring within range)
    List<GradeInfo> findByFromMarkLessThanEqualAndToMarkGreaterThanEqual(String from, String to);

}

