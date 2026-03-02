package com.lrs.Controller;

import com.lrs.Entity.Nationality;
import com.lrs.ServiceImpl.NationalityService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/nationalities")
public class NationalityController {

    private final NationalityService service;

    public NationalityController(NationalityService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Nationality create(@RequestBody Nationality nationality) {
        return service.save(nationality);
    }

    // Update
    @PutMapping("/{id}")
    public Nationality update(@PathVariable Integer id, @RequestBody Nationality nationality) {
        nationality.setId(id);
        return service.update(nationality);
    }

    // Get all
    @GetMapping
    public List<Nationality> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Nationality getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public Nationality getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}