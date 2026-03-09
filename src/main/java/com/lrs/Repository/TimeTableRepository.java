package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.TimeTable;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimeTableRepository extends JpaRepository<TimeTable, Long> {

    List<TimeTable> findAll();
    Optional<TimeTable> findById(Long id);
    List<TimeTable> findByClassIdAndSectionId(Long classId,Long sectionId);


}

