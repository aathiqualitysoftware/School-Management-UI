package com.lrs.Controller;

import com.lrs.Entity.Staff;
import com.lrs.Entity.Staffs;
import com.lrs.ServiceImpl.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staffs")
public class StaffsController {
    @Autowired
    private StaffService staffService;

    @GetMapping
    public List<Staff> getAllStaffs() {
        return staffService.getAllStaffs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Integer id) {
        return staffService.getStaffById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Staff createStaff(@RequestBody Staff staff) {
        return staffService.createStaff(staff);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Integer id, @RequestBody Staff staffDetails) {
        return staffService.updateStaff(id, staffDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Integer id) {
        staffService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/filterBy")
    public List<Staff> searchStaffs(String department, String designation, String status) {
        return staffService.searchStaffs(department, designation, status);
    }
    @GetMapping("/filterByDepartment")
    public List<Staff> searchStaffs(String department) {
        return staffService.searchStaffsData(department);
    }
}