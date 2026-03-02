package com.lrs.Service;

import com.lrs.Dto.ExamResultsUpdate;
import com.lrs.Dto.StudentReportDashboardResponse;
import com.lrs.Dto.StudentReportResponse;
import com.lrs.Entity.ExamResults;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface ExamResultsService {
    ExamResults insertExamResults(ExamResults examResults) throws ServiceException;
    ExamResults isExist(Long id) throws ServiceException;
    ExamResults examResultsUpdate(ExamResults examResultsExist, ExamResultsUpdate examResultsUpdate) throws ServiceException;
    void examResultsDelete(Long id) throws ServiceException;
    List<ExamResults> getExamResults() throws ServiceException;
    List<StudentReportResponse> getStudentExamReport(Long studentId) throws ServiceException;
    List<StudentReportDashboardResponse> getStudentExamDashboardReport(Long studentId,Long examTypeId,String academicYear) throws ServiceException;
}
