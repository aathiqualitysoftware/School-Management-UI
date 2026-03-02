package com.lrs.ServiceImpl;

import com.lrs.Dto.*;
import com.lrs.Entity.ExamResults;
import com.lrs.Entity.Exams;
import com.lrs.Repository.ExamRepository;
import com.lrs.Repository.ExamResultsRepository;
import com.lrs.Service.ExamResultsService;
import com.lrs.Service.ExamsService;
import com.lrs.Util.SecurityUtils;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ExamResultsServiceImpl implements ExamResultsService {

    ExamResultsRepository examResultsRepository;

    @Autowired
    public ExamResultsServiceImpl(ExamResultsRepository examResultsRepository){

        this.examResultsRepository = examResultsRepository;
    }

    @Override
    public ExamResults insertExamResults(ExamResults examResults) throws ServiceException {
        examResults.setId(null);
        examResultsRepository.save(examResults);
        return examResults;
    }

    @Override
    public ExamResults isExist(Long id) throws ServiceException {
       Optional<ExamResults> exam = examResultsRepository.findById(id);
       if(exam.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0027);
       }
        return exam.get();
    }

    @Override
    public ExamResults examResultsUpdate(ExamResults examsExist, ExamResultsUpdate examUpdate) throws ServiceException {
        examsExist.setMarks(examUpdate.getMarks());
        return examResultsRepository.save(examsExist);
    }

    @Override
    public void examResultsDelete(Long id) throws ServiceException {
        examResultsRepository.deleteById(id);
    }

    @Override
    public List<ExamResults> getExamResults() throws ServiceException {
        List<ExamResults> exams = examResultsRepository.findAll();
        if(exams.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0027);
        }
        return exams;
    }

    @Override
    public List<StudentReportResponse> getStudentExamReport(Long studentId) throws ServiceException {
        List<StudentReportResponse> studentReportResponses = new ArrayList<>();
        studentReportResponses = examResultsRepository.getStudentExamReport(studentId);
        if(studentReportResponses.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0006);
        }
        return studentReportResponses;
    }

    @Override
    public List<StudentReportDashboardResponse> getStudentExamDashboardReport(Long studentId, Long examTypeId, String academicYear) throws ServiceException {
        List<StudentReportDashboardResponse> studentReportDashboardResponses = new ArrayList<>();
        studentReportDashboardResponses= examResultsRepository.findStudentStudentReportDashboard(studentId,examTypeId,academicYear);
        if(studentReportDashboardResponses.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0006);
        }
        return studentReportDashboardResponses;
    }
}
