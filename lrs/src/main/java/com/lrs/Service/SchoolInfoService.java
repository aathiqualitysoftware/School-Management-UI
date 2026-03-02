package com.lrs.Service;

import com.lrs.Entity.Roles;
import com.lrs.Entity.SchoolInfo;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface SchoolInfoService {
    List<SchoolInfo> getSchoolInfo() throws ServiceException;
}
