package com.lrs.ServiceImpl;

import com.lrs.Dto.*;
import com.lrs.Entity.ExamSchedule;
import com.lrs.Repository.ExamScheduleRepository;
import com.lrs.Service.ExamScheduleService;
import com.lrs.Util.SecurityUtils;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ExamScheduleServiceImpl implements ExamScheduleService {

    ExamScheduleRepository examScheduleRepository;

    @Autowired
    public ExamScheduleServiceImpl(ExamScheduleRepository examScheduleRepository){

        this.examScheduleRepository = examScheduleRepository;
    }

    @Override
    public ExamSchedule insertExamSchedule(ExamSchedule examSchedule) throws ServiceException {
        examSchedule.setId(null);
        examSchedule.setCreatedBy(SecurityUtils.getLogInUserName());
        examSchedule.setCreatedDateTime(new Timestamp(System.currentTimeMillis()));
        examSchedule.setUpdatedBy(SecurityUtils.getLogInUserName());
        examSchedule.setUpdatedDateTime(new Timestamp(System.currentTimeMillis()));
        examScheduleRepository.save(examSchedule);
        return examSchedule;
    }

    @Override
    public ExamSchedule isExist(Long id) throws ServiceException {
       Optional<ExamSchedule> examSchedule = examScheduleRepository.findById(id);
       if(examSchedule.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0031);
       }
        return examSchedule.get();
    }

    @Override
    public ExamSchedule examScheduleUpdate(ExamSchedule examScheduleExist, ExamScheduleUpdate examScheduleUpdate) throws ServiceException {
        examScheduleExist.setIsDone(examScheduleUpdate.getIsDone());
        // if you want update extra field add here
        examScheduleExist.setUpdatedBy(SecurityUtils.getLogInUserName());
        examScheduleExist.setUpdatedDateTime(new Timestamp(System.currentTimeMillis()));
        return examScheduleRepository.save(examScheduleExist);
    }

    @Override
    public void examScheduleDelete(Long id) throws ServiceException {
        examScheduleRepository.deleteById(id);
    }

    @Override
    public List<ExamSchedule> getExamSchedule() throws ServiceException {
        List<ExamSchedule> examSchedule = examScheduleRepository.findAll();
        if(examSchedule.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0024);
        }
        return examSchedule;
    }

    @Override
    public PreviousAndUpcomingExamResponse getData() throws ServiceException {
        PreviousAndUpcomingExamResponse previousAndUpcomingExamResponse = new PreviousAndUpcomingExamResponse();
        LogInStudentResponse logInStudentResponse = SecurityUtils.getLogInStudent();

        List<UpcomingExamRequest> results = examScheduleRepository.findUpcomingExamRequest(logInStudentResponse.getClassId(),
                logInStudentResponse.getSectionId());
        previousAndUpcomingExamResponse.setUpcomingExamRequest(results);

        List<PreviousExamResultRequest> data = examScheduleRepository.findPreviousExamResultRequest(logInStudentResponse.getClassId(),
                logInStudentResponse.getSectionId());
        previousAndUpcomingExamResponse.setPreviousExamResultRequest(data);


        return previousAndUpcomingExamResponse;
    }
    public List<ExamSchedule> getAll() {
        return examScheduleRepository.findAll();
    }

    public ExamSchedule getById(Long id) {
        return examScheduleRepository.findById(id).orElse(null);
    }


    public List<ExamSchedule> getByExamType(Long examTypeId) {
        return examScheduleRepository.findByExamTypeId(examTypeId);
    }

    public List<ExamSchedule> getByClassSubject(Long classSubjectId) {
        return examScheduleRepository.findByClassSubjectId(classSubjectId);
    }

    public List<ExamSchedule> getByAcademicYear(Long academicYearId) {
        return examScheduleRepository.findByAcademicYearId(academicYearId);
    }

    public List<ExamSchedule> getByDateRange(LocalDate start, LocalDate end) {
        return examScheduleRepository.findByFromDateBetween(start, end);
    }

    public List<ExamSchedule> getCompletedSchedules() {
        return examScheduleRepository.findByIsDoneTrue();
    }

    public List<ExamSchedule> getPendingSchedules() {
        return examScheduleRepository.findByIsDoneFalse();
    }
}
