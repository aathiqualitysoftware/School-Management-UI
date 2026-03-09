package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Classes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassesRepository extends JpaRepository<Classes, Long> {
    List<Classes> findAll();
    Optional<Classes> findById(Long id);
}

