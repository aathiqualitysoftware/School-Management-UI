package com.lrs.ServiceImpl;

import com.lrs.Controller.Stud;
import com.lrs.Dto.AllMasterDataResponse;
import com.lrs.Entity.Students;
import com.lrs.Entity.Users;
import com.lrs.Repository.ParentRepository;
import com.lrs.Repository.StudRepository;
import com.lrs.Repository.StudentsRepository;
import com.lrs.Repository.UserRepository;
import com.lrs.Util.SecurityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class StudService {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private final StudRepository repository;
    private UserRepository userRepository;
    private StudentsRepository studentsRepository;
    private StudRepository studRepository;

    public StudService(StudRepository repository,
                       UserRepository userRepository,
                       StudentsRepository studentsRepository,
                       StudRepository studRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.studentsRepository = studentsRepository;
        this.studRepository = studRepository;
    }

    public Stud save(Stud stud) {
        stud.setUpdatedAt(LocalDate.now());
        stud.setUpdatedBy(SecurityUtils.getLogInUserName());
        stud.setCreatedAt(LocalDate.now());
        stud.setCreatedBy(SecurityUtils.getLogInUserName());
         repository.save(stud);
        parentData(stud);
        studentData(stud);

        return stud;
    }
private void parentData(Stud stud){
    List<AllMasterDataResponse> allMasterData = studentsRepository.getAllMasterData();

    List<AllMasterDataResponse> roles = allMasterData.stream()
            .filter(x->x.getTypeName().equalsIgnoreCase("ROLES")).toList();
    roles.stream().filter(x->x.getTypeName().equalsIgnoreCase("Parent")).toList();
    Users users = new Users();
    String str = stud.getParentName().substring(0,3);
    users.setUserName("par"+str);
    users.setPassword(encoder.encode(str+"@123"));
    users.setRoleId(roles.get(0).getMasterId());
    users.setPhoneNumber(stud.getParentMobileNumber());
    users.setStatusId(true);
    userRepository.save(users);
    stud.setUserParentId(String.valueOf(users.getUserId()));
    studRepository.save(stud);
}
    private void studentData(Stud stud){
        List<AllMasterDataResponse> allMasterData = studentsRepository.getAllMasterData();

        List<AllMasterDataResponse> roles = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("ROLES")).toList();
        roles.stream().filter(x->x.getTypeName().equalsIgnoreCase("Student")).toList();
        Users users = new Users();
        String str = stud.getFirstName().substring(0,3);
        users.setUserName("stu"+str);
        users.setPassword(encoder.encode(str+"@123"));
        users.setRoleId(roles.get(0).getMasterId());
        users.setPhoneNumber(stud.getMobileNumber());
        users.setStatusId(true);
        userRepository.save(users);
        stud.setUserId(Integer.parseInt(String.valueOf(users.getUserId())));
        repository.save(stud);
    }
    public Stud update(Stud Stud) {
        Stud.setUpdatedAt(LocalDate.now());
        Stud.setUpdatedBy(SecurityUtils.getLogInUserName());
        return repository.save(Stud);
    }

    public List<Stud> getAll() {
        return repository.findAll();
    }

    public Stud getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Stud getByAdmissionNumber(String admissionNumber) {
        return repository.findByAdmissionNumber(admissionNumber);
    }

    public Stud getByRollNumber(String rollNumber) {
        return repository.findByRollNumber(rollNumber);
    }

    public List<Stud> getByClassAndSection(Integer classId, Integer sectionId) {
        return repository.findByClassIdAndSectionId(classId, sectionId);
    }

    public List<Stud> getByAcademicYear(Integer yearId) {
        return repository.findByAcademicYearId(yearId);
    }

    public List<Stud> getTransferStuds() {
        return repository.findByIsTransferStudentTrue();
    }

    public Stud getByMobileNumber(String mobileNumber) {
        return repository.findByMobileNumber(mobileNumber);
    }
}