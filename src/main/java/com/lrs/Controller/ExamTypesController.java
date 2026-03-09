package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.ExamType;
import com.lrs.Service.ExamTypesService;
import com.lrs.ServiceImpl.ExamTpesServiceImpl;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/exam-types")
@RestController
@Slf4j
public class ExamTypesController {

    private ExamTypesService examTypesService;
    private ModelMapper modelMapper;
    ExamTpesServiceImpl service;
    @Autowired
    public ExamTypesController(ExamTypesService examTypesService,
                               ModelMapper modelMapper,
                               ExamTpesServiceImpl service){
        this.examTypesService = examTypesService;
        this.modelMapper = modelMapper;
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<GenericResponse<List<ExamTypesResponse>>> getExamType() throws ServiceException {
        List<ExamType> list =  examTypesService.getExamType();
        /* build responce*/
        GenericResponse<List<ExamTypesResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(list,new TypeToken<List<ExamTypesResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<GenericResponse<ExamTypesResponse>> save(@RequestBody ExamTypesRequest examTypesRequest) throws ServiceException {
        /*get ExamType by id */
        ExamType examType = modelMapper.map(examTypesRequest,ExamType.class);
        ExamType data = examTypesService.insertExamType(examType);
        log.info("Successfully inserted ExamType");
        /* build responce*/
        GenericResponse<ExamTypesResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ExamTypesResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/id")
    public ResponseEntity<GenericResponse<ExamTypesResponse>> update(@PathVariable(value = "id") Long id,
            @RequestBody ExamTypesUpdate examTypesUpdate) throws ServiceException {
        /*get ExamType by id */

        ExamType examTypeExist = examTypesService.isExist(id);
        log.info("Successfully fetched ExamType by id");

        ExamType data = examTypesService.examTypeUpdate(examTypeExist,examTypesUpdate);

        /* build responce*/
        GenericResponse<ExamTypesResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ExamTypesResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<ExamTypesResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get ExamType by id */

        ExamType examType = examTypesService.isExist(id);
        log.info("Successfully fetched ExamType by id");

        examTypesService.examTypeDelete(id);

        /* build responce*/
        GenericResponse<ExamTypesResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(examType,new TypeToken<ExamTypesResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
    // Custom API: Get by name
    @GetMapping("/name/{name}")
    public ExamType getByName(@PathVariable String name) {
        return service.getByName(name);
    }

}
