package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Religions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReligionsRepository extends JpaRepository<Religions, Long> {
    List<Religions> findAll();
    Optional<Religions> findById(Long id);
}

