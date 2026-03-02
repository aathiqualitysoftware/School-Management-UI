package com.lrs.Service;

import com.lrs.Dto.AttendanceUpdate;
import com.lrs.Entity.Attendance;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface AttendanceServiceTmp {
    Attendance insertAttendance(Attendance attendance) throws ServiceException;
    Attendance isExist(Long id) throws ServiceException;
    Attendance attendanceUpdate(Attendance attendanceExist, AttendanceUpdate attendanceUpdate) throws ServiceException;
    void attendanceDelete(Long id) throws ServiceException;

    List<Attendance> getAttendanceReprot(Long studentId, String fromDate, String toDate) throws ServiceException;
}
