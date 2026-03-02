package com.lrs.Controller;

import com.lrs.Entity.Parent;
import com.lrs.ServiceImpl.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
public class ParentController {
    @Autowired
    private ParentService parentService;

    @GetMapping
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Parent> getParentById(@PathVariable Integer id) {
        return parentService.getParentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Parent createParent(@RequestBody Parent parent) {
        return parentService.createParent(parent);
    }

    @PutMapping("/{id}")
    public Parent updateParent(@PathVariable Integer id, @RequestBody Parent parentDetails) {
        return parentService.updateParent(id, parentDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParent(@PathVariable Integer id) {
        parentService.deleteParent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public List<Parent> getParentsByStudent(@PathVariable Integer studentId) {
        return parentService.getParentsByStudent(studentId);
    }
}