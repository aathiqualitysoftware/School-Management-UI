package com.lrs.Controller;

import com.lrs.Entity.ExamResult;
import com.lrs.ServiceImpl.ExamResultService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/exam-results")
public class ExamResultController {

    private final ExamResultService service;

    public ExamResultController(ExamResultService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public ExamResult create(@RequestBody ExamResult result) {
        return service.save(result);
    }

    // Update
    @PutMapping("/{id}")
    public ExamResult update(@PathVariable Long id, @RequestBody ExamResult result) {
        result.setId(id);
        return service.update(result);
    }

    // Get all
    @GetMapping
    public List<ExamResult> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public ExamResult getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/exam/{examId}")
    public List<ExamResult> getByExam(@PathVariable Long examId) {
        return service.getByExam(examId);
    }

    @GetMapping("/student/{studentId}")
    public List<ExamResult> getByStudent(@PathVariable Long studentId) {
        return service.getByStudent(studentId);
    }

    @GetMapping("/exam/{examId}/student/{studentId}")
    public ExamResult getByExamAndStudent(@PathVariable Long examId,
                                          @PathVariable Long studentId) {
        return service.getByExamAndStudent(examId, studentId);
    }

    @GetMapping("/grade/{gradeId}")
    public List<ExamResult> getByGrade(@PathVariable Long gradeId) {
        return service.getByGrade(gradeId);
    }
}