package com.lrs.Service;

import com.lrs.Dto.*;
import com.lrs.Entity.Students;
import com.lrs.Entity.Users;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface StudentService {
    StudentDetailsProjection getByStudentId(Long id) throws ServiceException;
    MasterDataResponse getMasterData() throws ServiceException;
    MasterDataAllResponse getAllMasterData() throws ServiceException;
    List<Students> getAll() throws ServiceException;
    Students insertStudent(Students students) throws ServiceException;
    Students isExist(Long id) throws ServiceException;
    Students studentUpdate(Students studentExist, StudentUpdate studentUpdate) throws ServiceException;
    void studentDelete(Long id) throws ServiceException;
    StudentDetailsProjection getByUserId(Long id) throws ServiceException;
}
