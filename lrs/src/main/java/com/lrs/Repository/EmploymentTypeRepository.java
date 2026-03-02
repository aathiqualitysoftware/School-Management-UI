package com.lrs.Repository;

import com.lrs.Entity.EmploymentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmploymentTypeRepository extends JpaRepository<EmploymentType, Long> {
    // Custom query: find by type name
    EmploymentType findByTypeName(String typeName);
}