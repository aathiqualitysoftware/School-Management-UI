package com.lrs.ServiceImpl;

import com.lrs.Entity.Settings;
import com.lrs.Repository.SettingsRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class SettingService {

    private final SettingsRepository repository;

    public SettingService(SettingsRepository repository) {
        this.repository = repository;
    }

    public Settings save(Settings setting) {
        setting.setCreatedAt(LocalDate.now());
        return repository.save(setting);
    }

    public Settings update(Settings setting) {
        setting.setUpdatedAt(LocalDate.now());
        return repository.save(setting);
    }

    public List<Settings> getAll() {
        return repository.findAll();
    }

    public Settings getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Settings getByCode(String code) {
        return repository.findByCode(code);
    }
}