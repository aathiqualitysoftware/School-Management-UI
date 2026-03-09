package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Weeks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WeeksRepository extends JpaRepository<Weeks, Long> {
    List<Weeks> findAll();
    Optional<Weeks> findById(Long id);
}

