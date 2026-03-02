package com.lrs.Controller;

import com.lrs.Dto.*;
import com.lrs.Entity.ExamResults;
import com.lrs.Service.ExamResultsService;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/exam-results-tmp")
@RestController
@Slf4j
public class ExamResultsController {

    private ExamResultsService examResultsService;
    private ModelMapper modelMapper;
    @Autowired
    public ExamResultsController(ExamResultsService examResultsService,
                                 ModelMapper modelMapper){
        this.examResultsService = examResultsService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<GenericResponse<List<ExamResultsResponse>>> getExamType() throws ServiceException {
        List<ExamResults> list =  examResultsService.getExamResults();
        /* build responce*/
        GenericResponse<List<ExamResultsResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(list,new TypeToken<List<ExamResultsResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/student-exam-report")
    public ResponseEntity<GenericResponse<List<StudentReportResponse>>> getStudentExamReport(@RequestParam Long studentId) throws ServiceException {
        List<StudentReportResponse> list =  examResultsService.getStudentExamReport(studentId);
        /* build responce*/
        GenericResponse<List<StudentReportResponse>> response = new GenericResponse<>();
        response.setData(list);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/student-exam-dashboard")
    public ResponseEntity<GenericResponse<List<StudentReportDashboardResponse>>> getStudentExamDashboardReport(@RequestParam Long studentId,
                                                                                                               @RequestParam Long examTypeId,
                                                                                                               @RequestParam String academicYear) throws ServiceException {
        List<StudentReportDashboardResponse> list =  examResultsService.getStudentExamDashboardReport(studentId,examTypeId,academicYear);
        /* build responce*/
        GenericResponse<List<StudentReportDashboardResponse>> response = new GenericResponse<>();
        response.setData(list);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<GenericResponse<ExamResultsResponse>> save(@RequestBody ExamResultsRequest examsRequest) throws ServiceException {
        /*get ExamResults by id */
        ExamResults examResults = modelMapper.map(examsRequest,ExamResults.class);
        ExamResults data = examResultsService.insertExamResults(examResults);
        log.info("Successfully inserted ExamResults");
        /* build responce*/
        GenericResponse<ExamResultsResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ExamResultsResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping("/id")
    public ResponseEntity<GenericResponse<ExamResultsResponse>> update(@PathVariable(value = "id") Long id,
            @RequestBody ExamResultsUpdate examsUpdate) throws ServiceException {
        /*get ExamResults by id */

        ExamResults examExist = examResultsService.isExist(id);
        log.info("Successfully fetched ExamResults by id");

        ExamResults data = examResultsService.examResultsUpdate(examExist,examsUpdate);

        /* build responce*/
        GenericResponse<ExamResultsResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(data,new TypeToken<ExamResultsResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/id")
    public ResponseEntity<GenericResponse<ExamResultsResponse>> delete(@PathVariable(value = "id") Long id) throws ServiceException {
        /*get ExamResults by id */

        ExamResults results = examResultsService.isExist(id);
        log.info("Successfully fetched ExamResults by id");

        examResultsService.examResultsDelete(id);

        /* build responce*/
        GenericResponse<ExamResultsResponse> response = new GenericResponse<>();
        response.setData(modelMapper.map(results,new TypeToken<ExamResultsResponse>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
}
