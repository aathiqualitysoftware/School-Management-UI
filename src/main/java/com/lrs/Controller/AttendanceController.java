package com.lrs.Controller;

import com.lrs.Entity.Attendance;
import com.lrs.Service.AttendanceServiceTmp;
import com.lrs.ServiceImpl.AttendanceService;
import com.lrs.ServiceImpl.AttendanceServiceImpl;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    // CRUD
    @PostMapping
    public Attendance create(@RequestBody Attendance attendance) {
        return service.save(attendance);
    }

    @PostMapping("/bulk")
    public List<Attendance> bulk(@RequestBody List<Attendance> attendance) {
        return service.bulk(attendance);
    }

    @PutMapping("/{id}")
    public Attendance update(@PathVariable Long id, @RequestBody Attendance attendance) {
        attendance.setId(id);
        return service.update(attendance);
    }

    @GetMapping
    public List<Attendance> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Attendance getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/student/{studentId}")
    public List<Attendance> getByStudent(@PathVariable Long studentId) {
        return service.getByStudent(studentId);
    }

    @GetMapping("/student/{studentId}/date/{date}")
    public Attendance getByStudentAndDate(@PathVariable Long studentId, @PathVariable String date) {
        return service.getByStudentAndDate(studentId, LocalDate.parse(date));
    }

    @GetMapping("/student/{studentId}/range")
    public List<Attendance> getByStudentAndRange(@PathVariable Long studentId,
                                                 @RequestParam String from,
                                                 @RequestParam String to) {
        return service.getByStudentAndRange(studentId, LocalDate.parse(from), LocalDate.parse(to));
    }

    @GetMapping("/date/{date}")
    public List<Attendance> getByDate(@PathVariable String date) {
        return service.getByDate(LocalDate.parse(date));
    }

    @GetMapping("/student/date/{date}")
    public List<Attendance> getByDateAndStudent(@PathVariable String date,
                                                @RequestParam Long classId,
                                                @RequestParam Long sectionId) {
        return service.getByDateAndStudent(LocalDate.parse(date), classId, sectionId);
    }

    @GetMapping("/summary/{date}")
    public String getDailySummary(@PathVariable String date) {
        LocalDate d = LocalDate.parse(date);
        long present = service.countPresent(d);
        long absent = service.countAbsent(d);
        return "Date: " + d + " | Present: " + present + " | Absent: " + absent;
    }
}