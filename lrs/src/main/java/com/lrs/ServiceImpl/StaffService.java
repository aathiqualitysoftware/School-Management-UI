package com.lrs.ServiceImpl;

import com.lrs.Controller.Stud;
import com.lrs.Dto.AllMasterDataResponse;
import com.lrs.Dto.StudentResponse;
import com.lrs.Entity.Staff;
import com.lrs.Entity.Users;
import com.lrs.Repository.StaffRepository;
import com.lrs.Repository.StudentsRepository;
import com.lrs.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private StudentsRepository studentsRepository;
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public List<Staff> getAllStaffs() {
        return staffRepository.findAll();
    }

    public Optional<Staff> getStaffById(Integer id) {
        return staffRepository.findById(id);
    }

    public Staff createStaff(Staff staff) {
        staff.setCreatedAt(LocalDateTime.now());
        return staffRepository.save(staff);

    }
    private void userData(Staff staff){
        List<AllMasterDataResponse> allMasterData = studentsRepository.getAllMasterData();

        List<AllMasterDataResponse> roles = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("ROLES")).toList();
        roles.stream().filter(x->x.getTypeName().equalsIgnoreCase("Staff")).toList();
        Users users = new Users();
        String str = staff.getFirstName().substring(0,3);
        users.setUserName("sta"+str);
        users.setPassword(encoder.encode(str+"@123"));
        users.setRoleId(roles.get(0).getMasterId());
        users.setPhoneNumber(staff.getPhone());
        users.setStatusId(true);
        userRepository.save(users);
        staff.setUserId(Integer.parseInt(users.getUserId().toString()));
        staffRepository.save(staff);
    }

    public Staff updateStaff(Integer id, Staff staffDetails) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        staff.setFirstName(staffDetails.getFirstName());
        staff.setLastName(staffDetails.getLastName());
        staff.setDob(staffDetails.getDob());
        staff.setJoiningDate(staffDetails.getJoiningDate());
        staff.setUpdatedAt(LocalDate.now());
        staff.setUpdatedBy(staffDetails.getUpdatedBy());
        return staffRepository.save(staff);
    }

    public void deleteStaff(Integer id) {
        staffRepository.deleteById(id);
    }
    public List<Staff> searchStaffs(String department, String designation, String status) {
        return staffRepository.searchStaffs(department, designation, status);
    }

    public List<Staff> searchStaffsData(String department) {
        return staffRepository.searchStaffsData(department,  "Active");
    }


}