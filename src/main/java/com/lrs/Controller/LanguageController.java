package com.lrs.Controller;

import com.lrs.Entity.Languages;
import com.lrs.ServiceImpl.LanguageService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/languages")
public class LanguageController {

    private final LanguageService service;

    public LanguageController(LanguageService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Languages create(@RequestBody Languages language) {
        return service.save(language);
    }

    // Update
    @PutMapping("/{id}")
    public Languages update(@PathVariable Long id, @RequestBody Languages language) {
        language.setId(id);
        return service.update(language);
    }

    // Get all
    @GetMapping
    public List<Languages> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Languages getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public Languages getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}