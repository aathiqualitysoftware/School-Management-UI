package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Long> {
    List<Categories> findAll();
    Optional<Categories> findById(Long id);
    Categories findByName(String name);

}

