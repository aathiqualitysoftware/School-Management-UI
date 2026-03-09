package com.lrs.Controller;

import com.lrs.Entity.ClassAssignment;
import com.lrs.ServiceImpl.ClassAssignmentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/class-assignments")
public class ClassAssignmentController {

    private final ClassAssignmentService service;

    public ClassAssignmentController(ClassAssignmentService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public ClassAssignment create(@RequestBody ClassAssignment assignment) {
        return service.save(assignment);
    }

    // Update
    @PutMapping("/{id}")
    public ClassAssignment update(@PathVariable Integer id, @RequestBody ClassAssignment assignment) {
        assignment.setClassAssignmentId(id);
        return service.update(assignment);
    }

    // Get all
    @GetMapping
    public List<ClassAssignment> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public ClassAssignment getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/class/{classId}")
    public List<ClassAssignment> getByClass(@PathVariable Integer classId) {
        return service.getByClass(classId);
    }

    @GetMapping("/section/{sectionId}")
    public List<ClassAssignment> getBySection(@PathVariable Integer sectionId) {
        return service.getBySection(sectionId);
    }

    @GetMapping("/teacher/{teacherId}")
    public List<ClassAssignment> getByTeacher(@PathVariable String teacherId) {
        return service.getByTeacher(teacherId);
    }
}