package com.lrs.Controller;

import com.lrs.Entity.Settings;
import com.lrs.ServiceImpl.SettingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/settings")
public class SettingController {

    private final SettingService service;

    public SettingController(SettingService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Settings create(@RequestBody Settings setting) {
        return service.save(setting);
    }

    // Update
    @PutMapping("/{id}")
    public Settings update(@PathVariable Long id, @RequestBody Settings setting) {
        setting.setId(id);
        return service.update(setting);
    }

    // Get all
    @GetMapping
    public List<Settings> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Settings getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by code
    @GetMapping("/code/{code}")
    public Settings getByCode(@PathVariable String code) {
        return service.getByCode(code);
    }
}