package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Genders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GendersRepository extends JpaRepository<Genders, Long> {
    List<Genders> findAll();
    Optional<Genders> findById(Long id);
    // Custom query: find by grade name
    Genders findByName(String name);

}

