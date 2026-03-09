package com.lrs.Repository;

import com.lrs.Entity.SubjectType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectTypeRepository extends JpaRepository<SubjectType, Integer> {
    // Custom query: find by type name
    SubjectType findByTypeName(String typeName);
}