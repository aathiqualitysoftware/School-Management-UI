package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.ClassSubjects;
import com.lrs.Service.ClassSubjectsService;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/class-subjects-tmp")
@RestController
@Slf4j
public class ClassSubjectsController {

    private ClassSubjectsService classSubjectsService;
    private ModelMapper modelMapper;
    @Autowired
    public ClassSubjectsController(ClassSubjectsService classSubjectsService,
                                   ModelMapper modelMapper){
        this.classSubjectsService = classSubjectsService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<GenericResponse<List<ClassSubjectsResponse>>> getClassSubjects() throws ServiceException {
        List<ClassSubjects> list =  classSubjectsService.getClassSubjects();
        /* build responce*/
        GenericResponse<List<ClassSubjectsResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(list,new TypeToken<List<ClassSubjectsResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<GenericResponse<ClassSubjectsResponse>> save(@RequestBody ClassSubjectsRequest classSubjectsRequest) throws ServiceException {
        /*get ClassSubjects by id */
        ClassSubjects classSubjects = modelMapper.map(classSubjectsRequest,ClassSubjects.class);
        ClassSubjects data = classSubjectsService.insertClassSubjects(classSubjects);
        log.info("Successfully inserted ClassSubjects");
        /* build responce*/
        GenericResponse<ClassSubjectsResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ClassSubjectsResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/id")
    public ResponseEntity<GenericResponse<ClassSubjectsResponse>> update(@PathVariable(value = "id") Long id,
            @RequestBody ClassSubjectsUpdate classSubjectsUpdate) throws ServiceException {
        /*get ClassSubjects by id */

        ClassSubjects classSubjectsExist = classSubjectsService.isExist(id);
        log.info("Successfully fetched ClassSubjects by id");

        ClassSubjects data = classSubjectsService.classSubjectsUpdate(classSubjectsExist,classSubjectsUpdate);

        /* build responce*/
        GenericResponse<ClassSubjectsResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ClassSubjectsResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<ClassSubjectsResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get ClassSubjects by id */

        ClassSubjects classSubjects = classSubjectsService.isExist(id);
        log.info("Successfully fetched ClassSubjects by id");

        classSubjectsService.classSubjectsDelete(id);

        /* build responce*/
        GenericResponse<ClassSubjectsResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(classSubjects,new TypeToken<ClassSubjectsResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
}
