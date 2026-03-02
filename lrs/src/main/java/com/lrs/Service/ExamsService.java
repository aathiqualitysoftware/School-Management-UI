package com.lrs.Service;

import com.lrs.Dto.ExamTypesUpdate;
import com.lrs.Dto.ExamsUpdate;
import com.lrs.Entity.ExamType;
import com.lrs.Entity.Exams;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface ExamsService {
    Exams insertExams(Exams exams) throws ServiceException;
    Exams isExist(Long id) throws ServiceException;
    Exams examUpdate(Exams examTypeExist, ExamsUpdate examsUpdate) throws ServiceException;
    void examDelete(Long id) throws ServiceException;
    List<Exams> getExams() throws ServiceException;
}
