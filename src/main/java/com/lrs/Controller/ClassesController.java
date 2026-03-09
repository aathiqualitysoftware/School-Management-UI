package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.Classes;
import com.lrs.Service.ClassesService;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/classes")
@RestController
@Slf4j
public class ClassesController {

    private ClassesService classesService;
    private ModelMapper modelMapper;
    @Autowired
    public ClassesController(ClassesService classesService,
                             ModelMapper modelMapper){
        this.classesService = classesService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<GenericResponse<List<ClassesResponse>>> getClasses() throws ServiceException {
        List<Classes> list =  classesService.getClasses();
        /* build responce*/
        GenericResponse<List<ClassesResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(list,new TypeToken<List<ClassesResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<GenericResponse<ClassesResponse>> save(@RequestBody ClassesRequest classesRequest) throws ServiceException {
        /*get Classes by id */
        Classes classes = modelMapper.map(classesRequest,Classes.class);
        Classes data = classesService.insertClasses(classes);
        log.info("Successfully inserted Classes");
        /* build responce*/
        GenericResponse<ClassesResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ClassesResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<GenericResponse<ClassesResponse>> update(@PathVariable Long id,
            @RequestBody ClassesUpdate classesUpdate) throws ServiceException {
        /*get Classes by id */

        Classes classesExist = classesService.isExist(id);
        log.info("Successfully fetched Classes by id");

        Classes data = classesService.ClassesUpdate(classesExist,classesUpdate);

        /* build responce*/
        GenericResponse<ClassesResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ClassesResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<ClassesResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get Classes by id */

        Classes classesServiceExist = classesService.isExist(id);
        log.info("Successfully fetched Classes by id");

        classesService.ClassesDelete(id);

        /* build responce*/
        GenericResponse<ClassesResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(classesServiceExist,new TypeToken<ClassesResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
}
