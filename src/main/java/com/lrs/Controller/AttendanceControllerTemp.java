package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.Attendance;
import com.lrs.Service.AttendanceServiceTmp;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/attendance-tmp")
@RestController
@Slf4j
public class AttendanceControllerTemp {

    private AttendanceServiceTmp attendanceService;
    private ModelMapper modelMapper;
    @Autowired
    public AttendanceControllerTemp(AttendanceServiceTmp attendanceService,
                                    ModelMapper modelMapper){
        this.attendanceService = attendanceService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<GenericResponse<List<AttendanceResponse>>> getAttendance(@RequestParam Long studentId , @RequestParam String fromDate,
                                                                                   @RequestParam String toDate) throws ServiceException {
        List<Attendance> list =  attendanceService.getAttendanceReprot(studentId, fromDate,toDate);
        /* build responce*/
        GenericResponse<List<AttendanceResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(list,new TypeToken<List<AttendanceResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<GenericResponse<AttendanceResponse>> save(@RequestBody AttendanceRequest attendanceRequest) throws ServiceException {
        /*get Attendance by id */
        Attendance attendance = modelMapper.map(attendanceRequest,Attendance.class);
        Attendance data = attendanceService.insertAttendance(attendance);
        log.info("Successfully inserted Attendance");
        /* build responce*/
        GenericResponse<AttendanceResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<AttendanceResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/id")
    public ResponseEntity<GenericResponse<AttendanceResponse>> update(@PathVariable(value = "id") Long id,
            @RequestBody AttendanceUpdate attendanceUpdate) throws ServiceException {
        /*get Attendance by id */

        Attendance attendanceExist = attendanceService.isExist(id);
        log.info("Successfully fetched Attendance by id");

        Attendance data = attendanceService.attendanceUpdate(attendanceExist,attendanceUpdate);

        /* build responce*/
        GenericResponse<AttendanceResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<AttendanceResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<AttendanceResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get Attendance by id */

        Attendance attendanceExist = attendanceService.isExist(id);
        log.info("Successfully fetched Attendance by id");

        attendanceService.attendanceDelete(id);

        /* build responce*/
        GenericResponse<AttendanceResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(attendanceExist,new TypeToken<AttendanceResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
}
