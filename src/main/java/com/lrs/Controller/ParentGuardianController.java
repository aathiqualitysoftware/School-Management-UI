package com.lrs.Controller;

import com.lrs.Entity.ParentGuardian;
import com.lrs.ServiceImpl.ParentGuardianService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/parent-guardians")
public class ParentGuardianController {

    private final ParentGuardianService service;

    public ParentGuardianController(ParentGuardianService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public ParentGuardian create(@RequestBody ParentGuardian guardian) {
        return service.save(guardian);
    }

    // Update
    @PutMapping("/{id}")
    public ParentGuardian update(@PathVariable Long id, @RequestBody ParentGuardian guardian) {
        guardian.setParentId(id);
        return service.update(guardian);
    }

    // Get all
    @GetMapping
    public List<ParentGuardian> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public ParentGuardian getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/student/{studentId}")
    public List<ParentGuardian> getByStudent(@PathVariable Long studentId) {
        return service.getByStudent(studentId);
    }

    @GetMapping("/relation/{relationId}")
    public List<ParentGuardian> getByRelation(@PathVariable Long relationId) {
        return service.getByRelation(relationId);
    }

    @GetMapping("/aadhaar/{aadhaar}")
    public ParentGuardian getByAadhaar(@PathVariable String aadhaar) {
        return service.getByAadhaar(aadhaar);
    }

    @GetMapping("/email/{email}")
    public ParentGuardian getByEmail(@PathVariable String email) {
        return service.getByEmail(email);
    }
}