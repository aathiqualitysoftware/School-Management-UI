package com.lrs.Controller;

import com.lrs.Entity.PeriodStructure;
import com.lrs.ServiceImpl.PeriodStructureService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/period-structure")
public class PeriodStructureController {

    private final PeriodStructureService service;

    public PeriodStructureController(PeriodStructureService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public PeriodStructure create(@RequestBody PeriodStructure period) {
        return service.save(period);
    }

    // Update
    @PutMapping("/{id}")
    public PeriodStructure update(@PathVariable Long id, @RequestBody PeriodStructure period) {
        period.setPeriodId(id);
        return service.update(period);
    }

    // Get all
    @GetMapping
    public List<PeriodStructure> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public PeriodStructure getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/config/{configId}")
    public List<PeriodStructure> getByConfig(@PathVariable String configId) {
        return service.getByConfig(configId);
    }

    @GetMapping("/period-number/{number}")
    public PeriodStructure getByPeriodNumber(@PathVariable Long number) {
        return service.getByPeriodNumber(number);
    }

    @GetMapping("/breaks")
    public List<PeriodStructure> getBreaks() {
        return service.getBreaks();
    }

    @GetMapping("/teaching-periods")
    public List<PeriodStructure> getTeachingPeriods() {
        return service.getTeachingPeriods();
    }

    @GetMapping("/time-range")
    public List<PeriodStructure> getByTimeRange(@RequestParam String start,
                                                @RequestParam String end) {
        return service.getByTimeRange(LocalTime.parse(start), LocalTime.parse(end));
    }
}