package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BloodGroupsRepository extends JpaRepository<BloodGroups, Long> {
    List<BloodGroups> findAll();
    Optional<BloodGroups> findById(Long id);
    BloodGroups findByName(String name);

}

