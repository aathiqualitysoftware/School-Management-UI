package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Languages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LanguagesRepository extends JpaRepository<Languages, Long> {
    List<Languages> findAll();
    Optional<Languages> findById(Long id);
    // Custom query: find by language name
    Languages findByLanguageName(String languageName);

}

