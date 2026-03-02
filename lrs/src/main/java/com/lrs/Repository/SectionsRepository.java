package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Sections;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SectionsRepository extends JpaRepository<Sections, Long> {
    List<Sections> findAll();
    Optional<Sections> findById(Long id);
    Sections findByIdAndClassIdAndIsActive(Long id,Long classId,boolean isActive);
    // Find sections by class
    List<Sections> findByClassId(Long classId);

    // Find active sections
    List<Sections> findByIsActiveTrue();

    // Find by section name
    Sections findBySectionName(String sectionName);

}

