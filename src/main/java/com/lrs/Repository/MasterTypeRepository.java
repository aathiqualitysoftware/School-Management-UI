package com.lrs.Repository;

import com.lrs.Entity.MasterType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MasterTypeRepository extends JpaRepository<MasterType, Integer> {

    // Find by type code
    MasterType findByTypeCode(String typeCode);

    // Find by type name
    MasterType findByTypeName(String typeName);

    // Find active master types
    List<MasterType> findByIsActiveTrue();
}