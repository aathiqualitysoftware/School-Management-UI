package com.lrs.Controller;

import com.lrs.Entity.FeePlan;
import com.lrs.ServiceImpl.FeePlanService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feeplans")
public class FeePlanController {

    private final FeePlanService service;

    public FeePlanController(FeePlanService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public FeePlan create(@RequestBody FeePlan plan) {
        return service.save(plan);
    }

    // Update
    @PutMapping("/{id}")
    public FeePlan update(@PathVariable Integer id, @RequestBody FeePlan plan) {
        plan.setFeePlanId(id);
        return service.update(plan);
    }

    // Get all
    @GetMapping
    public List<FeePlan> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public FeePlan getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/class/{classId}")
    public List<FeePlan> getByClass(@PathVariable Long classId) {
        return service.getByClass(classId);
    }

    @GetMapping("/type/{feeType}")
    public List<FeePlan> getByFeeType(@PathVariable String feeType) {
        return service.getByFeeType(feeType);
    }
}