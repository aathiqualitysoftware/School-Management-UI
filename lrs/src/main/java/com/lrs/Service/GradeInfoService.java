package com.lrs.Service;

import com.lrs.Dto.GradeInfoUpdate;
import com.lrs.Entity.GradeInfo;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface GradeInfoService {
    GradeInfo insertGradeInfo(GradeInfo gradeInfo) throws ServiceException;
    GradeInfo isExist(Long id) throws ServiceException;
    GradeInfo gradeInfoUpdate(GradeInfo gradeInfoExist, GradeInfoUpdate gradeInfoUpdate) throws ServiceException;
    void gradeInfoDelete(Long id) throws ServiceException;

    List<GradeInfo> getGradeInfo() throws ServiceException;
}
