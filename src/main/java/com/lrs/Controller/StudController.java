package com.lrs.Controller;

import com.lrs.Controller.Stud;
import com.lrs.ServiceImpl.StudService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/studs")
public class StudController {

    private final StudService service;

    public StudController(StudService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Stud create(@RequestBody Stud stud) throws IOException {
//        stud.setPhotoData(stud.getim.isEmpty()?null:profileImage.getBytes());
        return service.save(stud);
    }

    // Update
    @PutMapping("/{id}")
    public Stud update(@PathVariable Integer id, @RequestBody Stud Stud) {
        Stud.setStudentId(id);
        return service.update(Stud);
    }

    // Get all
    @GetMapping
    public List<Stud> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Stud getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // Custom APIs
    @GetMapping("/admission/{admissionNumber}")
    public Stud getByAdmissionNumber(@PathVariable String admissionNumber) {
        return service.getByAdmissionNumber(admissionNumber);
    }

    @GetMapping("/roll/{rollNumber}")
    public Stud getByRollNumber(@PathVariable String rollNumber) {
        return service.getByRollNumber(rollNumber);
    }

    @GetMapping("/class-section")
    public List<Stud> getByClassAndSection(@RequestParam Integer classId,
                                              @RequestParam Integer sectionId) {
        return service.getByClassAndSection(classId, sectionId);
    }

    @GetMapping("/academic-year/{yearId}")
    public List<Stud> getByAcademicYear(@PathVariable Integer yearId) {
        return service.getByAcademicYear(yearId);
    }

    @GetMapping("/transfer")
    public List<Stud> getTransferStuds() {
        return service.getTransferStuds();
    }

    @GetMapping("/mobile/{mobileNumber}")
    public Stud getByMobileNumber(@PathVariable String mobileNumber) {
        return service.getByMobileNumber(mobileNumber);
    }
}