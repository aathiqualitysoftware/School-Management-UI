package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.Staffs;
import com.lrs.Entity.Students;
import com.lrs.Service.StaffService;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/staff")
@RestController
@Slf4j
public class StaffController {
    @Autowired
    private StaffService staffService;
    private ModelMapper modelMapper;

    @Autowired
    public StaffController(StaffService staffService,
                             ModelMapper modelMapper){
        this.staffService = staffService;
        this.modelMapper = modelMapper;
    }
    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse<StaffDetailsProjection>> getStudentDetails(@PathVariable Long id) throws ServiceException {
        /*get student by id */
        StaffDetailsProjection staff= staffService.getByStaffId(id);
        log.info("Staff fetched Successfully by id");
        /* build responce*/
        GenericResponse<StaffDetailsProjection> response = new GenericResponse<>();
        response.setData(modelMapper.map(staff,new TypeToken<StaffDetailsProjection>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GenericResponse<StaffResponse>> save(@RequestBody StaffRequest staffRequest) throws ServiceException {
        /*get student by id */
        Staffs staff = modelMapper.map(staffRequest,Staffs.class);
        Staffs data = staffService.insertStaff(staff);
        log.info("Staff inserted Successfully ");
        /* build responce*/
        GenericResponse<StaffResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<StaffResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/id")
    public ResponseEntity<GenericResponse<StaffResponse>> update(@PathVariable(value = "id") Long id,
                                                                   @RequestBody StaffUpdate staffUpdate) throws ServiceException {
        /*get student by id */

        Staffs staffExist = staffService.isExist(id);
        log.info("Staff updated Successfully");

        Staffs data = staffService.staffUpdate(staffExist,staffUpdate);

        /* build responce*/
        GenericResponse<StaffResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<StaffResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<StaffResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get student by id */

        Staffs staffsExist = staffService.isExist(id);
        log.info("Staff deleted successfully");

        staffService.staffDelete(id);

        /* build responce*/
        GenericResponse<StaffResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(staffsExist,new TypeToken<StaffResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
}
