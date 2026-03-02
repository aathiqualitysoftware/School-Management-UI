package com.lrs.Repository;

import com.lrs.Entity.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentTypeRepository extends JpaRepository<PaymentType, Long> {
    // Custom query: find by type name
    PaymentType findByTypeName(String typeName);
}