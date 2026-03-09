package com.lrs.Service;

import com.lrs.Dto.ClassesUpdate;
import com.lrs.Entity.Classes;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface ClassesService {
    Classes insertClasses(Classes Classes) throws ServiceException;
    Classes isExist(Long id) throws ServiceException;
    Classes ClassesUpdate(Classes classesExist, ClassesUpdate classesUpdate) throws ServiceException;
    void ClassesDelete(Long id) throws ServiceException;

    List<Classes> getClasses() throws ServiceException;
}
