package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.Students;
import com.lrs.Entity.Users;
import com.lrs.Service.StudentService;
import com.lrs.Service.UserService;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/student")
@RestController
@Slf4j
public class StudentController {

    private StudentService studentService;
    private ModelMapper modelMapper;
    @Autowired
    public StudentController(StudentService studentService,
                             ModelMapper modelMapper){
        this.studentService = studentService;
        this.modelMapper = modelMapper;
    }
    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse<StudentDetailsProjection>> getStudentDetails(@PathVariable Long id) throws ServiceException {
        /*get student by id */
        StudentDetailsProjection students= studentService.getByStudentId(id);
        log.info("Successfully fetched student by id");
/* build responce*/
        GenericResponse<StudentDetailsProjection> response = new GenericResponse<>();
        response.setData(modelMapper.map(students,new TypeToken<StudentDetailsProjection>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<GenericResponse<List<StudentResponse>>> getAll() throws ServiceException {
        /*get student by id */
        List<Students> students = studentService.getAll();
        log.info("Successfully fetched student by id");
        /* build responce*/
        GenericResponse<List<StudentResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(students,new TypeToken<List<StudentResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/getMasterData")
    public ResponseEntity<GenericResponse<MasterDataResponse>> getMasterData() throws ServiceException {
        /*get student by id */
        MasterDataResponse students = studentService.getMasterData();
        log.info("Successfully fetched student by id");
        /* build responce*/
        GenericResponse<MasterDataResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(students,new TypeToken<MasterDataResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/getAllMasterData")
    public ResponseEntity<GenericResponse<MasterDataAllResponse>> getAllMasterData() throws ServiceException {
        /*get student by id */
        MasterDataAllResponse students = studentService.getAllMasterData();
        log.info("Successfully fetched student by id");
        /* build responce*/
        GenericResponse<MasterDataAllResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(students,new TypeToken<MasterDataAllResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<GenericResponse<StudentResponse>> save(@RequestBody StudentRequest studentRequest) throws ServiceException {
        /*get student by id */
        Students students = modelMapper.map(studentRequest,Students.class);
        Students data = studentService.insertStudent(students);
        log.info("Successfully inserted student");
        /* build responce*/
        GenericResponse<StudentResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<StudentResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/id")
    public ResponseEntity<GenericResponse<StudentResponse>> update(@PathVariable(value = "id") Long id,
            @RequestBody StudentUpdate studentUpdate) throws ServiceException {
        /*get student by id */

        Students studentExist = studentService.isExist(id);
        log.info("Successfully fetched student by id");

        Students data = studentService.studentUpdate(studentExist,studentUpdate);

        /* build responce*/
        GenericResponse<StudentResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<StudentResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<StudentResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get student by id */

        Students studentExist = studentService.isExist(id);
        log.info("Successfully fetched student by id");

        studentService.studentDelete(id);

        /* build responce*/
        GenericResponse<StudentResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(studentExist,new TypeToken<StudentResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
}
