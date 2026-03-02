package com.lrs.Controller;

import com.lrs.Entity.Master;
import com.lrs.ServiceImpl.MasterService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/masters")
public class MasterController {

    private final MasterService service;

    public MasterController(MasterService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Master create( @RequestBody Master master) {
        return service.save(master);
    }

    // Update
    @PutMapping("/{id}")
    public Master update(@PathVariable Integer id,  @RequestBody Master master) {
        master.setMasterId(id);
        return service.update(master);
    }

    // Get all
    @GetMapping
    public List<Master> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Master getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/type/{typeId}")
    public List<Master> getByMasterType(@PathVariable Integer typeId) {
        return service.getByMasterType(typeId);
    }

    @GetMapping("/parent/{parentId}")
    public List<Master> getByParentMaster(@PathVariable Integer parentId) {
        return service.getByParentMaster(parentId);
    }

    @GetMapping("/active")
    public List<Master> getActiveMasters() {
        return service.getActiveMasters();
    }

    @GetMapping("/name/{name}")
    public Master getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}