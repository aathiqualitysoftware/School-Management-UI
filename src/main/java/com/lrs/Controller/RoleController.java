package com.lrs.Controller;

import com.lrs.Entity.Roles;
import com.lrs.ServiceImpl.RolesServiceImpl;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RolesServiceImpl service;

    public RoleController(RolesServiceImpl service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Roles create(@RequestBody Roles role) {
        return service.save(role);
    }

    // Update
    @PutMapping("/{id}")
    public Roles update(@PathVariable Long id, @RequestBody Roles role) {
        role.setRoleId(id);
        return service.update(role);
    }

    // Get all
    @GetMapping
    public List<Roles> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Roles getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/name/{name}")
    public Optional<Roles> getByName(@PathVariable String name) {
        return service.getByName(name);
    }

    @GetMapping("/category/{category}")
    public List<Roles> getByCategory(@PathVariable String category) {
        return service.getByCategory(category);
    }
}