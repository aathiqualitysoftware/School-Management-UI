package com.lrs.Controller;

import com.lrs.Entity.PreviousAcademicInfo;
import com.lrs.ServiceImpl.PreviousAcademicInfoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/previous-academic-info")
public class PreviousAcademicInfoController {

    private final PreviousAcademicInfoService service;

    public PreviousAcademicInfoController(PreviousAcademicInfoService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public PreviousAcademicInfo create(@RequestBody PreviousAcademicInfo info) {
        return service.save(info);
    }

    // Update
    @PutMapping("/{id}")
    public PreviousAcademicInfo update(@PathVariable Integer id, @RequestBody PreviousAcademicInfo info) {
        info.setStudentId(id);
        return service.update(info);
    }

    // Get all
    @GetMapping
    public List<PreviousAcademicInfo> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public PreviousAcademicInfo getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/class/{className}")
    public List<PreviousAcademicInfo> getByLastAttendedClass(@PathVariable String className) {
        return service.getByLastAttendedClass(className);
    }

    @GetMapping("/school/{schoolName}")
    public List<PreviousAcademicInfo> getByPreviousSchool(@PathVariable String schoolName) {
        return service.getByPreviousSchool(schoolName);
    }

    @GetMapping("/certificate/{certificateNumber}")
    public PreviousAcademicInfo getByCertificateNumber(@PathVariable String certificateNumber) {
        return service.getByCertificateNumber(certificateNumber);
    }
}