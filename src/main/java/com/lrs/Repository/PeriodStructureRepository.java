package com.lrs.Repository;

import com.lrs.Entity.PeriodStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalTime;
import java.util.List;

public interface PeriodStructureRepository extends JpaRepository<PeriodStructure, Long> {

    // Find by config
    List<PeriodStructure> findByConfigId(String configId);

    // Find by period number
    PeriodStructure findByPeriodNumber(Long periodNumber);

    // Find breaks only
    List<PeriodStructure> findByIsBreakTrue();

    // Find teaching periods only
    List<PeriodStructure> findByIsBreakFalse();

    // Find periods within a time range
    List<PeriodStructure> findByStartTimeBetween(LocalTime start, LocalTime end);
}