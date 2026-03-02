package com.lrs.Controller;

import com.lrs.Entity.LeaveApplication;
import com.lrs.ServiceImpl.LeaveApplicationService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/leave-applications")
public class LeaveApplicationController {

    private final LeaveApplicationService service;

    public LeaveApplicationController(LeaveApplicationService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public LeaveApplication create(@RequestBody LeaveApplication leave) {
        return service.save(leave);
    }

    // Update
    @PutMapping("/{id}")
    public LeaveApplication update(@PathVariable Long id, @RequestBody LeaveApplication leave) {
        leave.setLeaveId(id);
        return service.update(leave);
    }

    // Get all
    @GetMapping
    public List<LeaveApplication> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public LeaveApplication getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/student/{studentId}")
    public List<LeaveApplication> getByStudent(@PathVariable Long studentId) {
        return service.getByStudent(studentId);
    }

    @GetMapping("/status/{status}")
    public List<LeaveApplication> getByStatus(@PathVariable String status) {
        return service.getByStatus(status);
    }

    @GetMapping("/date-range")
    public List<LeaveApplication> getByDateRange(@RequestParam String start,
                                                 @RequestParam String end) {
        return service.getByDateRange(LocalDate.parse(start), LocalDate.parse(end));
    }

    @GetMapping("/pending")
    public List<LeaveApplication> getPendingApprovals() {
        return service.getPendingApprovals();
    }
}