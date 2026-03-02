package com.lrs.Controller;

import com.lrs.Entity.ReportSendHistory;
import com.lrs.ServiceImpl.ReportSendHistoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/report-send-history")
public class ReportSendHistoryController {

    private final ReportSendHistoryService service;

    public ReportSendHistoryController(ReportSendHistoryService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public ReportSendHistory create(@RequestBody ReportSendHistory history) {
        return service.save(history);
    }

    // Update
    @PutMapping("/{id}")
    public ReportSendHistory update(@PathVariable Integer id, @RequestBody ReportSendHistory history) {
        history.setHistoryId(id);
        return service.update(history);
    }

    // Get all
    @GetMapping
    public List<ReportSendHistory> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public ReportSendHistory getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/student/{studentId}")
    public List<ReportSendHistory> getByStudent(@PathVariable Integer studentId) {
        return service.getByStudent(studentId);
    }

    @GetMapping("/academic-year/{yearId}")
    public List<ReportSendHistory> getByAcademicYear(@PathVariable Integer yearId) {
        return service.getByAcademicYear(yearId);
    }

    @GetMapping("/class-section")
    public List<ReportSendHistory> getByClassAndSection(@RequestParam Integer classId,
                                                        @RequestParam Integer sectionId) {
        return service.getByClassAndSection(classId, sectionId);
    }

    @GetMapping("/period/{period}")
    public List<ReportSendHistory> getByReportPeriod(@PathVariable String period) {
        return service.getByReportPeriod(period);
    }

    @GetMapping("/date-range")
    public List<ReportSendHistory> getByDateRange(@RequestParam String start,
                                                  @RequestParam String end) {
        return service.getByDateRange(LocalDateTime.parse(start), LocalDateTime.parse(end));
    }

    @GetMapping("/quarter/{quarterId}")
    public List<ReportSendHistory> getByQuarter(@PathVariable Integer quarterId) {
        return service.getByQuarter(quarterId);
    }
}