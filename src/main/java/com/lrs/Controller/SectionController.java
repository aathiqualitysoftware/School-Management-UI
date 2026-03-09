package com.lrs.Controller;

import com.lrs.Entity.Sections;
import com.lrs.ServiceImpl.SectionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sections")
public class SectionController {

    private final SectionService service;

    public SectionController(SectionService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Sections create(@RequestBody Sections section) {
        return service.save(section);
    }

    // Update
    @PutMapping("/{id}")
    public Sections update(@PathVariable Long id, @RequestBody Sections section) {
        section.setId(id);
        return service.update(section);
    }

    // Get all
    @GetMapping
    public List<Sections> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Sections getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/class/{classId}")
    public List<Sections> getByClass(@PathVariable Long classId) {
        return service.getByClass(classId);
    }

    @GetMapping("/active")
    public List<Sections> getActiveSections() {
        return service.getActiveSections();
    }

    @GetMapping("/name/{name}")
    public Sections getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}