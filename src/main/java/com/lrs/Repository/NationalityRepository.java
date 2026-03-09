package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Nationality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NationalityRepository extends JpaRepository<Nationality, Long> {
    List<Nationality> findAll();
    Optional<Nationality> findById(Long id);
    // Custom query: find by nationality name
    Nationality findByName(String name);
}

