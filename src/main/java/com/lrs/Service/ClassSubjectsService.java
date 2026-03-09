package com.lrs.Service;

import com.lrs.Dto.ClassSubjectsUpdate;
import com.lrs.Dto.ExamsUpdate;
import com.lrs.Entity.ClassSubjects;
import com.lrs.Entity.Exams;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface ClassSubjectsService {
    ClassSubjects insertClassSubjects(ClassSubjects classSubjects) throws ServiceException;
    ClassSubjects isExist(Long id) throws ServiceException;
    ClassSubjects classSubjectsUpdate(ClassSubjects classSubjects, ClassSubjectsUpdate classSubjectsUpdate) throws ServiceException;
    void classSubjectsDelete(Long id) throws ServiceException;
    List<ClassSubjects> getClassSubjects() throws ServiceException;
}
