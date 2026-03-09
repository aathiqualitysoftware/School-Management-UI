package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.ExamSchedule;
import com.lrs.Repository.ExamScheduleRepository;
import com.lrs.Service.ExamScheduleService;
import com.lrs.ServiceImpl.ExamScheduleServiceImpl;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("/api/exam-schedule")
@RestController
@Slf4j
public class ExamScheduleController {

    private ExamScheduleService examScheduleService;

    private ModelMapper modelMapper;
    ExamScheduleServiceImpl service;

    private  ExamScheduleRepository repository;
    @Autowired
    public ExamScheduleController(ExamScheduleService examScheduleService,
                                  ModelMapper modelMapper,
                                  ExamScheduleRepository repository,
                                  ExamScheduleServiceImpl service){
        this.examScheduleService = examScheduleService;
        this.modelMapper = modelMapper;
        this.repository =repository;
        this.service = service;
    }

    @GetMapping("/pre-upcoming-exam")
    public ResponseEntity<GenericResponse<PreviousAndUpcomingExamResponse>> getStudentDetails() throws ServiceException {
        /*get PreviousAndUpcomingExam by id */
        PreviousAndUpcomingExamResponse previousAndUpcomingExamResponse= examScheduleService.getData();
        log.info("Successfully fetched PreviousAndUpcomingExam by id");
        /* build responce*/
        GenericResponse<PreviousAndUpcomingExamResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(previousAndUpcomingExamResponse,new TypeToken<PreviousAndUpcomingExamResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<GenericResponse<List<ExamScheduleResponse>>> getExamSchedule() throws ServiceException {
        List<ExamSchedule> list =  examScheduleService.getExamSchedule();
        /* build responce*/
        GenericResponse<List<ExamScheduleResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(list,new TypeToken<List<ExamScheduleResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<GenericResponse<ExamScheduleResponse>> save(@RequestBody ExamScheduleRequest examScheduleRequest) throws ServiceException {
        /*get ExamSchedule by id */
        ExamSchedule ExamSchedule = modelMapper.map(examScheduleRequest,ExamSchedule.class);
        ExamSchedule data = examScheduleService.insertExamSchedule(ExamSchedule);
        log.info("Successfully inserted ExamSchedule");
        /* build responce*/
        GenericResponse<ExamScheduleResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ExamScheduleResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/id")
    public ResponseEntity<GenericResponse<ExamScheduleResponse>> update(@PathVariable(value = "id") Long id,
            @RequestBody ExamScheduleUpdate examScheduleUpdate) throws ServiceException {
        /*get ExamSchedule by id */

        ExamSchedule examScheduleExist = examScheduleService.isExist(id);
        log.info("Successfully fetched ExamSchedule by id");

        ExamSchedule data = examScheduleService.examScheduleUpdate(examScheduleExist,examScheduleUpdate);

        /* build responce*/
        GenericResponse<ExamScheduleResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ExamScheduleResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<ExamScheduleResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get ExamSchedule by id */

        ExamSchedule examScheduleServiceExist = examScheduleService.isExist(id);
        log.info("Successfully fetched ExamSchedule by id");

        examScheduleService.examScheduleDelete(id);

        /* build responce*/
        GenericResponse<ExamScheduleResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(examScheduleServiceExist,new TypeToken<ExamScheduleResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
    // Get all
    @GetMapping("/all")
    public List<ExamSchedule> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public ExamSchedule getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Custom APIs
    @GetMapping("/exam-type/{examTypeId}")
    public List<ExamSchedule> getByExamType(@PathVariable Long examTypeId) {
        return service.getByExamType(examTypeId);
    }

    @GetMapping("/class-subject/{classSubjectId}")
    public List<ExamSchedule> getByClassSubject(@PathVariable Long classSubjectId) {
        return service.getByClassSubject(classSubjectId);
    }

    @GetMapping("/academic-year/{academicYearId}")
    public List<ExamSchedule> getByAcademicYear(@PathVariable Long academicYearId) {
        return service.getByAcademicYear(academicYearId);
    }

    @GetMapping("/date-range")
    public List<ExamSchedule> getByDateRange(@RequestParam String start,
                                             @RequestParam String end) {
        return service.getByDateRange(LocalDate.parse(start), LocalDate.parse(end));
    }

    @GetMapping("/completed")
    public List<ExamSchedule> getCompletedSchedules() {
        return service.getCompletedSchedules();
    }

    @GetMapping("/pending")
    public List<ExamSchedule> getPendingSchedules() {
        return service.getPendingSchedules();
    }
}
