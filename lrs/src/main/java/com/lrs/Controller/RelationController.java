package com.lrs.Controller;

import com.lrs.Entity.Relation;
import com.lrs.ServiceImpl.RelationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/relations")
public class RelationController {

    private final RelationService service;

    public RelationController(RelationService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Relation create(@RequestBody Relation relation) {
        return service.save(relation);
    }

    // Update
    @PutMapping("/{id}")
    public Relation update(@PathVariable Integer id, @RequestBody Relation relation) {
        relation.setId(id);
        return service.update(relation);
    }

    // Get all
    @GetMapping
    public List<Relation> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Relation getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public Relation getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}