package com.lrs.Repository;

import com.lrs.Entity.MaritalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaritalStatusRepository extends JpaRepository<MaritalStatus, Long> {
    // Custom query: find by status name
    MaritalStatus findByStatusName(String statusName);
}