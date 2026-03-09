package com.lrs.Repository;

import com.lrs.Entity.Master;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MasterRepository extends JpaRepository<Master, Integer> {

    // Find by master type
    List<Master> findByMasterTypeId(Integer masterTypeId);

    // Find by parent master
    List<Master> findByParentMasterId(Integer parentMasterId);

    // Find active masters
    List<Master> findByIsActiveTrue();

    // Find by name
    Master findByName(String name);
}