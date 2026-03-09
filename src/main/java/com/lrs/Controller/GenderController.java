package com.lrs.Controller;

import com.lrs.Entity.Genders;
import com.lrs.ServiceImpl.GenderService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/genders")
public class GenderController {

    private final GenderService service;

    public GenderController(GenderService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Genders create(@RequestBody Genders gender) {
        return service.save(gender);
    }

    // Update
    @PutMapping("/{id}")
    public Genders update(@PathVariable Long id, @RequestBody Genders gender) {
        gender.setId(id);
        return service.update(gender);
    }

    // Get all
    @GetMapping
    public List<Genders> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Genders getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public Genders getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}