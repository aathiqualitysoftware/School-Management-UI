package com.lrs.ServiceImpl;

import com.lrs.Controller.Stud;
import com.lrs.Dto.AllMasterDataResponse;
import com.lrs.Entity.Roles;
import com.lrs.Entity.Staff;
import com.lrs.Entity.UploadImage;
import com.lrs.Entity.Users;
import com.lrs.Repository.*;
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
    @Autowired
    private UploadImageRepository uploadImageRepository;


    private UserRepository userRep;
    private final RolesRepository rolesRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public StaffService(
            UserRepository userRep,
            RolesRepository rolesRepository) {
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
    }

    public List<Staff> getAllStaffs() {
        return staffRepository.findAll();
    }

    public Optional<Staff> getStaffById(Integer id) {
        return staffRepository.findById(id);
    }

    public Staff createStaff(Staff staff) {
        staff.setCreatedAt(LocalDateTime.now());

        userData(staff);
        staffRepository.save(staff);
        return staff;
    }

    private void userData(Staff staff) {
//        List<AllMasterDataResponse> allMasterData = studentsRepository.getAllMasterData();

//        List<AllMasterDataResponse> roles = allMasterData.stream()
//                .filter(x->x.getTypeName().equalsIgnoreCase("ROLES")).toList();
//        roles.stream().filter(x->x.getTypeName().equalsIgnoreCase("Staff")).toList();

        Optional<Roles> roles = rolesRepository.findByRoleName("Teaching Staff");

        Users users = new Users();
        String str = staff.getFirstName().substring(0, 3);
        users.setUserName(staff.getPhone());
        users.setPassword(encoder.encode(str + "@123"));
        users.setRoleId(roles.get().getRoleId());
        users.setPhoneNumber(staff.getPhone());
        users.setStatusId(true);
        userRepository.save(users);
        staff.setUserId(Integer.parseInt(users.getUserId().toString()));
        staffRepository.save(staff);
    }

    public Staff updateStaff(Integer id, Staff staffDetails) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
//        staff.setFirstName(staffDetails.getFirstName());
//        staff.setLastName(staffDetails.getLastName());
//        staff.setDob(staffDetails.getDob());
//        staff.setJoiningDate(staffDetails.getJoiningDate());

        staff.setFirstName(staffDetails.getFirstName());
        staff.setLastName(staffDetails.getLastName());
        staff.setMiddleName(staffDetails.getMiddleName());
        staff.setEmail(staffDetails.getEmail());
        staff.setPhone(staffDetails.getPhone());
        staff.setDesignation(staffDetails.getDesignation());
        staff.setDepartment(staffDetails.getDepartment());

        staff.setDob(staffDetails.getDob());
        staff.setJoiningDate(staffDetails.getJoiningDate());

        staff.setGender(staffDetails.getGender());
        staff.setMaritalStatus(staffDetails.getMaritalStatus());  // ✅ IMPORTANT
        staff.setEmploymentType(staffDetails.getEmploymentType());
        staff.setStaffStatus(staffDetails.getStaffStatus());

        staff.setNativeLanguage(staffDetails.getNativeLanguage());
        staff.setAadhar(staffDetails.getAadhar());
        staff.setPan(staffDetails.getPan());
        staff.setQualification(staffDetails.getQualification());
        staff.setReligion(staffDetails.getReligion());

        staff.setAddress(staffDetails.getAddress());

        staff.setEmergencyContactName(staffDetails.getEmergencyContactName());
        staff.setEmergencyContactRelation(staffDetails.getEmergencyContactRelation());
        staff.setEmergencyContactPhone(staffDetails.getEmergencyContactPhone());

        staff.setBankAccountNumber(staffDetails.getBankAccountNumber());
        staff.setBankIFSC(staffDetails.getBankIFSC());
        staff.setUpiId(staffDetails.getUpiId());


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
        List<Staff> staffList = staffRepository.searchStaffsData(department, "1");
        for (Staff staff:staffList) {
            Optional<UploadImage> profileUploadImage= uploadImageRepository.findById((long) staff.getProfileImageUploadId());
            if(profileUploadImage.isPresent()){
                staff.setStaffProfileImage(profileUploadImage.get().getImageData());
            }
            Optional<UploadImage> idProofUploadImage= uploadImageRepository.findById((long) staff.getIdProofImageUploadId());
            if(idProofUploadImage.isPresent()){
                staff.setIdProofImage(idProofUploadImage.get().getImageData());
            }
            Optional<UploadImage> experienceUploadImage= uploadImageRepository.findById((long) staff.getExperienceImageUploadId());
            if(experienceUploadImage.isPresent()){
                staff.setExperienceImage(experienceUploadImage.get().getImageData());
            }
            Optional<UploadImage> resumeUploadImage= uploadImageRepository.findById((long) staff.getResumeUploadId());
            if(resumeUploadImage.isPresent()){
                staff.setResumeImage(resumeUploadImage.get().getImageData());
            }
        }
        return staffList;
    }


}