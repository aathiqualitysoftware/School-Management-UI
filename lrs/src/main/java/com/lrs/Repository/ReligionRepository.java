package com.lrs.Repository;

import com.lrs.Entity.Religions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReligionRepository extends JpaRepository<Religions, Long> {
    // Custom query: find by religion name
    Religions findByName(String name);
}