package com.lrs.Controller;

import com.lrs.Dto.GenericResponse;
import com.lrs.Dto.SchoolInfoResponse;
import com.lrs.Dto.UserResponse;
import com.lrs.Entity.SchoolInfo;
import com.lrs.Entity.Users;
import com.lrs.Service.SchoolInfoService;
import com.lrs.Service.UserService;
import com.lrs.ServiceImpl.SchoolInfoServiceImpl;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/school-info")
@RestController
@Slf4j
public class SchoolInfoController {

    private SchoolInfoService schoolInfoService;
    private SchoolInfoServiceImpl schoolInfoServiceImpl;
    private ModelMapper modelMapper;
    @Autowired
    public SchoolInfoController(SchoolInfoService schoolInfoService,
                                ModelMapper modelMapper,
                                SchoolInfoServiceImpl schoolInfoServiceImpl){
        this.schoolInfoService = schoolInfoService;
        this.modelMapper = modelMapper;
        this.schoolInfoServiceImpl = schoolInfoServiceImpl;
    }
    @GetMapping
    public ResponseEntity<GenericResponse<List<SchoolInfoResponse>>> getSchoolInfo() throws ServiceException {
        /*get all SchoolInfo*/
        List<SchoolInfo> schoolInfos = schoolInfoService.getSchoolInfo();
//        log.info("Successfully fetched all the SchoolInfo");
/* build responce*/
        GenericResponse<List<SchoolInfoResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(schoolInfos,new TypeToken<List<SchoolInfoResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    // Create
    @PostMapping
    public SchoolInfo create(@RequestBody SchoolInfo info) {
        return schoolInfoServiceImpl.save(info);
    }

    // Update
    @PutMapping("/{id}")
    public SchoolInfo update(@PathVariable Long id, @RequestBody SchoolInfo info) {
        info.setId(id);
        return schoolInfoServiceImpl.update(info);
    }

    // Get all
    @GetMapping("/all")
    public List<SchoolInfo> getAll() {
        return schoolInfoServiceImpl.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public SchoolInfo getById(@PathVariable Long id) {
        return schoolInfoServiceImpl.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        schoolInfoServiceImpl.delete(id);
    }

    // Custom APIs
    @GetMapping("/name/{name}")
    public SchoolInfo getBySchoolName(@PathVariable String name) {
        return schoolInfoServiceImpl.getBySchoolName(name);
    }

    @GetMapping("/email/{email}")
    public SchoolInfo getByEmail(@PathVariable String email) {
        return schoolInfoServiceImpl.getByEmail(email);
    }

    @GetMapping("/phone/{phone}")
    public SchoolInfo getByPhone(@PathVariable String phone) {
        return schoolInfoServiceImpl.getByPhone(phone);
    }
}
