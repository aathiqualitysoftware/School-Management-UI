package com.lrs.Controller;

import com.lrs.Entity.StaffTimetable;
import com.lrs.ServiceImpl.StaffTimetableService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/staff-timetable")
public class StaffTimetableController {

    private final StaffTimetableService service;

    public StaffTimetableController(StaffTimetableService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public StaffTimetable create(@RequestBody StaffTimetable timetable) {
        return service.save(timetable);
    }

    // Update
    @PutMapping("/{id}")
    public StaffTimetable update(@PathVariable Integer id, @RequestBody StaffTimetable timetable) {
        timetable.setId(id);
        return service.update(timetable);
    }

    // Get all
    @GetMapping
    public List<StaffTimetable> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public StaffTimetable getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/staff/{staffId}")
    public List<StaffTimetable> getByStaff(@PathVariable String staffId) {
        return service.getByStaff(staffId);
    }

    @GetMapping("/timetable/{timetableId}")
    public List<StaffTimetable> getByTimetable(@PathVariable String timetableId) {
        return service.getByTimetable(timetableId);
    }

    @GetMapping("/primary")
    public List<StaffTimetable> getPrimaryAssignments() {
        return service.getPrimaryAssignments();
    }

    @GetMapping("/status/{status}")
    public List<StaffTimetable> getByStatus(@PathVariable String status) {
        return service.getByStatus(status);
    }
}