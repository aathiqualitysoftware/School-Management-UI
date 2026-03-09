package com.lrs.Controller;

import com.lrs.Entity.ClassSubjects;
import com.lrs.ServiceImpl.ClassSubjectService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/class-subjects")
public class ClassSubjectController {

    private final ClassSubjectService service;

    public ClassSubjectController(ClassSubjectService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public ClassSubjects create(@RequestBody ClassSubjects subject) {
        return service.save(subject);
    }

    // Update
    @PutMapping("/{id}")
    public ClassSubjects update(@PathVariable Long id, @RequestBody ClassSubjects subject) {
        subject.setId(id);
        return service.update(subject);
    }

    // Get all
    @GetMapping
    public List<ClassSubjects> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public ClassSubjects getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/class/{classId}")
    public List<ClassSubjects> getByClass(@PathVariable Long classId) {
        return service.getByClass(classId);
    }

    @GetMapping("/section/{sectionId}")
    public List<ClassSubjects> getBySection(@PathVariable Long sectionId) {
        return service.getBySection(sectionId);
    }

    @GetMapping("/subject/{subjectId}")
    public List<ClassSubjects> getBySubject(@PathVariable String subjectId) {
        return service.getBySubject(subjectId);
    }

    @GetMapping("/staff/{staffId}")
    public List<ClassSubjects> getByStaff(@PathVariable String staffId) {
        return service.getByStaff(staffId);
    }

    @GetMapping("/class/{classId}/section/{sectionId}")
    public List<ClassSubjects> getByClassAndSection(@PathVariable Long classId,
                                                   @PathVariable Long sectionId) {
        return service.getByClassAndSection(classId, sectionId);
    }
}