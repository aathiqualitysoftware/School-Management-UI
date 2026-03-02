package com.lrs.Controller;

import com.lrs.Entity.MasterType;
import com.lrs.ServiceImpl.MasterTypeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/master-types")
public class MasterTypeController {

    private final MasterTypeService service;

    public MasterTypeController(MasterTypeService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public MasterType create(@RequestBody MasterType masterType) {
        return service.save(masterType);
    }

    // Update
    @PutMapping("/{id}")
    public MasterType update(@PathVariable Integer id, @RequestBody MasterType masterType) {
        masterType.setMasterTypeId(id);
        return service.update(masterType);
    }

    // Get all
    @GetMapping
    public List<MasterType> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public MasterType getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/code/{code}")
    public MasterType getByCode(@PathVariable String code) {
        return service.getByCode(code);
    }

    @GetMapping("/name/{name}")
    public MasterType getByName(@PathVariable String name) {
        return service.getByName(name);
    }

    @GetMapping("/active")
    public List<MasterType> getActiveTypes() {
        return service.getActiveTypes();
    }

}