package com.lrs.Repository;
import com.lrs.Entity.BloodGroups;
import com.lrs.Entity.Settings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SettingsRepository extends JpaRepository<Settings, Long> {
    List<Settings> findAll();
    Optional<Settings> findById(Long id);
    // Find by code
    Settings findByCode(String code);
}

