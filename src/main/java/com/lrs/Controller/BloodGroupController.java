package com.lrs.Controller;

import com.lrs.Entity.BloodGroups;
import com.lrs.ServiceImpl.BloodGroupService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bloodgroups")
public class BloodGroupController {

    private final BloodGroupService service;

    public BloodGroupController(BloodGroupService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public BloodGroups create(@RequestBody BloodGroups bloodGroup) {
        return service.save(bloodGroup);
    }

    // Update
    @PutMapping("/{id}")
    public BloodGroups update(@PathVariable Long id, @RequestBody BloodGroups bloodGroup) {
        bloodGroup.setId(id);
        return service.update(bloodGroup);
    }

    // Get all
    @GetMapping
    public List<BloodGroups> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public BloodGroups getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Get by Name
    @GetMapping("/name/{name}")
    public BloodGroups getByName(@PathVariable String name) {
        return service.getByName(name);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}