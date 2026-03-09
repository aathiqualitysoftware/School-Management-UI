package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.Exams;
import com.lrs.Entity.MaritalStatus;
import com.lrs.Service.ExamsService;
import com.lrs.ServiceImpl.ExamsServiceImpl;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("/api/exams")
@RestController
@Slf4j
public class ExamsController {

    private ExamsService examsService;
    private ModelMapper modelMapper;
    ExamsServiceImpl service;
    @Autowired
    public ExamsController(ExamsService examsService,
                           ModelMapper modelMapper,
                           ExamsServiceImpl service){
        this.examsService = examsService;
        this.modelMapper = modelMapper;
        this.service = service;
    }

    // Create
    @PostMapping
    public Exams create(@RequestBody Exams status) {
        return service.save(status);
    }

    // Update
    @PutMapping("/{id}")
    public Exams update(@PathVariable Long id, @RequestBody Exams status) {
        status.setId(id);
        return service.update(status);
    }

    // Get all
    @GetMapping
    public List<Exams> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Exams getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/code/{code}")
    public Exams getByUniqueExamCode(@PathVariable String code) {
        return service.getByUniqueExamCode(code);
    }

    @GetMapping("/academic-year/{yearId}")
    public List<Exams> getByAcademicYear(@PathVariable Long yearId) {
        return service.getByAcademicYear(yearId);
    }

    @GetMapping("/exam-type/{typeId}")
    public List<Exams> getByExamType(@PathVariable Long typeId) {
        return service.getByExamType(typeId);
    }

    @GetMapping("/class-subject/{subjectId}")
    public List<Exams> getByClassSubject(@PathVariable Long subjectId) {
        return service.getByClassSubject(subjectId);
    }

    @GetMapping("/date-range")
    public List<Exams> getByDateRange(@RequestParam String start,
                                     @RequestParam String end) {
        return service.getByDateRange(LocalDate.parse(start), LocalDate.parse(end));
    }
}
