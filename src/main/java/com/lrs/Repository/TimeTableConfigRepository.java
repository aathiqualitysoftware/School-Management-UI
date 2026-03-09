package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.TimeTableConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimeTableConfigRepository extends JpaRepository<TimeTableConfiguration, Long> {
    List<TimeTableConfiguration> findAll();
    Optional<TimeTableConfiguration> findById(Long id);
    TimeTableConfiguration findByClassIdAndSectionId(Long classId,Long sectionId);
}

