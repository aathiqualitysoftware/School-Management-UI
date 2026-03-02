package com.lrs.Service;

import com.lrs.Dto.ExamTypesUpdate;
import com.lrs.Dto.GradeInfoUpdate;
import com.lrs.Entity.ExamType;
import com.lrs.Entity.GradeInfo;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface ExamTypesService {
    ExamType insertExamType(ExamType examType) throws ServiceException;
    ExamType isExist(Long id) throws ServiceException;
    ExamType examTypeUpdate(ExamType examTypeExist, ExamTypesUpdate examTypeUpdate) throws ServiceException;
    void examTypeDelete(Long id) throws ServiceException;

    List<ExamType> getExamType() throws ServiceException;
}
