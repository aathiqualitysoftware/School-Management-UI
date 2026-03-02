package com.lrs.Repository;

import com.lrs.Entity.FeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeStatusRepository extends JpaRepository<FeeStatus, Long> {
    // Custom query: find by status name
    FeeStatus findByStatusName(String statusName);
}