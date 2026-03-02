package com.lrs.Controller;

import com.lrs.Entity.Religions;
import com.lrs.ServiceImpl.ReligionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/religions")
public class ReligionController {

    private final ReligionService service;

    public ReligionController(ReligionService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Religions create(@RequestBody Religions religion) {
        return service.save(religion);
    }

    // Update
    @PutMapping("/{id}")
    public Religions update(@PathVariable Long id, @RequestBody Religions religion) {
        religion.setId(id);
        return service.update(religion);
    }

    // Get all
    @GetMapping
    public List<Religions> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Religions getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public Religions getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}