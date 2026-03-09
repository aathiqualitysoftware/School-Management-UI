package com.lrs.Controller;

import com.lrs.Entity.AcademicYear;
import com.lrs.ServiceImpl.AcademicYearService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/academic-years")
public class AcademicYearController {

    private final AcademicYearService service;

    public AcademicYearController(AcademicYearService service) {
        this.service = service;
    }

    @PostMapping
    public AcademicYear create(@RequestBody AcademicYear year) {
        return service.save(year);
    }

    @PutMapping("/{id}")
    public AcademicYear update(@PathVariable Long id, @RequestBody AcademicYear year) {
        year.setId(id);
        return service.update(year);
    }

    @GetMapping
    public List<AcademicYear> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public AcademicYear getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}