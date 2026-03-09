package com.lrs.Controller;

import com.lrs.Entity.Subjects;
import com.lrs.ServiceImpl.SubjectService;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.Subject;
import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectService service;

    public SubjectController(SubjectService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Subjects create(@RequestBody Subjects subject) {
        return service.save(subject);
    }

    // Update
    @PutMapping("/{id}")
    public Subjects update(@PathVariable Long id, @RequestBody Subjects subject) {
        subject.setId(id);
        return service.update(subject);
    }

    // Get all
    @GetMapping
    public List<Subjects> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Subjects getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/department/{department}")
    public List<Subjects> getByDepartment(@PathVariable String department) {
        return service.getByDepartment(department);
    }

    @GetMapping("/assigned")
    public List<Subjects> getAssignedSubjects() {
        return service.getAssignedSubjects();
    }

    @GetMapping("/unassigned")
    public List<Subjects> getUnassignedSubjects() {
        return service.getUnassignedSubjects();
    }

    @GetMapping("/name/{name}")
    public Subjects getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}