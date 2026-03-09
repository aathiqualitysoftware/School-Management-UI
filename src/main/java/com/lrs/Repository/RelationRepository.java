package com.lrs.Repository;

import com.lrs.Entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelationRepository extends JpaRepository<Relation, Integer> {
    // Custom query: find by relation name
    Relation findByName(String name);
}