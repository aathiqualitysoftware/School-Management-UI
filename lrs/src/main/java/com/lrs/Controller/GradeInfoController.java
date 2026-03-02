package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.GradeInfo;
import com.lrs.Service.GradeInfoService;
import com.lrs.ServiceImpl.GradeInfoServiceIm;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/grade-info")
@RestController
@Slf4j
public class GradeInfoController {

    private GradeInfoService gradeInfoService;
    private ModelMapper modelMapper;
    GradeInfoServiceIm service;

    @Autowired
    public GradeInfoController(GradeInfoService gradeInfoService,
                               ModelMapper modelMapper,
                               GradeInfoServiceIm service){
        this.gradeInfoService = gradeInfoService;
        this.modelMapper = modelMapper;
        this.service =service;
    }

    @GetMapping
    public ResponseEntity<GenericResponse<List<GradeInfoResponse>>> getGradeInfo() throws ServiceException {
        List<GradeInfo> list =  gradeInfoService.getGradeInfo();
        /* build responce*/
        GenericResponse<List<GradeInfoResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(list,new TypeToken<List<GradeInfoResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<GenericResponse<GradeInfoResponse>> save(@RequestBody AttendanceRequest attendanceRequest) throws ServiceException {
        /*get GradeInfo by id */
        GradeInfo gradeInfo = modelMapper.map(attendanceRequest,GradeInfo.class);
        GradeInfo data = gradeInfoService.insertGradeInfo(gradeInfo);
        log.info("Successfully inserted GradeInfo");
        /* build responce*/
        GenericResponse<GradeInfoResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<GradeInfoResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/id")
    public ResponseEntity<GenericResponse<GradeInfoResponse>> update(@PathVariable(value = "id") Long id,
            @RequestBody GradeInfoUpdate gradeInfoUpdate) throws ServiceException {
        /*get GradeInfo by id */

        GradeInfo gradeInfoExist = gradeInfoService.isExist(id);
        log.info("Successfully fetched GradeInfo by id");

        GradeInfo data = gradeInfoService.gradeInfoUpdate(gradeInfoExist,gradeInfoUpdate);

        /* build responce*/
        GenericResponse<GradeInfoResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<GradeInfoResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<GradeInfoResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get GradeInfo by id */

        GradeInfo gradeInfoServiceExist = gradeInfoService.isExist(id);
        log.info("Successfully fetched GradeInfo by id");

        gradeInfoService.gradeInfoDelete(id);

        /* build responce*/
        GenericResponse<GradeInfoResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(gradeInfoServiceExist,new TypeToken<GradeInfoResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
    // Custom APIs
    @GetMapping("/name/{name}")
    public GradeInfo getByGradeName(@PathVariable String name) {
        return service.getByGradeName(name);
    }

    @GetMapping("/range")
    public List<GradeInfo> getByMarkRange(@RequestParam String from,
                                          @RequestParam String to) {
        return service.getByMarkRange(from, to);
    }

}
