package com.lrs.Service;

import com.lrs.Dto.StaffDetailsProjection;
import com.lrs.Dto.StaffUpdate;
import com.lrs.Dto.StudentDetailsProjection;
import com.lrs.Dto.StudentUpdate;
import com.lrs.Entity.Staffs;
import com.lrs.Entity.Students;
import com.lrs.exception.ServiceException;

public interface StaffService
{

    StaffDetailsProjection getByStaffId(Long id) throws ServiceException;
    Staffs insertStaff(Staffs staffs) throws ServiceException;
    Staffs isExist(Long id) throws ServiceException;
    Staffs staffUpdate(Staffs staffExist, StaffUpdate staffUpdate) throws ServiceException;
    void staffDelete(Long id) throws ServiceException;
}
