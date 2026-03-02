package com.lrs.Repository;

import com.lrs.Entity.FeePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeePlanRepository extends JpaRepository<FeePlan, Long> {

    // Find by class
    List<FeePlan> findByClassId(Long classId);

    // Find by fee type
    List<FeePlan> findByFeeType(String feeType);
}