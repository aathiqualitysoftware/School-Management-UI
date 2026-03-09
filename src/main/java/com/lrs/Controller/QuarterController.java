package com.lrs.Controller;

import com.lrs.Entity.Quarter;
import com.lrs.ServiceImpl.QuarterService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/quarters")
public class QuarterController {

    private final QuarterService service;

    public QuarterController(QuarterService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Quarter create(@RequestBody Quarter quarter) {
        return service.save(quarter);
    }

    // Update
    @PutMapping("/{id}")
    public Quarter update(@PathVariable Integer id, @RequestBody Quarter quarter) {
        quarter.setQuarterId(id);
        return service.update(quarter);
    }

    // Get all
    @GetMapping
    public List<Quarter> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Quarter getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/academic-year/{yearId}")
    public List<Quarter> getByAcademicYear(@PathVariable Integer yearId) {
        return service.getByAcademicYear(yearId);
    }

    @GetMapping("/active")
    public List<Quarter> getActiveQuarters() {
        return service.getActiveQuarters();
    }

    @GetMapping("/date-range")
    public List<Quarter> getByDateRange(@RequestParam String start,
                                        @RequestParam String end) {
        return service.getByDateRange(LocalDate.parse(start), LocalDate.parse(end));
    }

    @GetMapping("/name/{name}")
    public Quarter getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}