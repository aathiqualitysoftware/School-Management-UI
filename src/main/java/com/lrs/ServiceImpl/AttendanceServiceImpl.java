package com.lrs.ServiceImpl;

import com.lrs.Dto.AttendanceUpdate;
import com.lrs.Entity.*;
import com.lrs.Repository.*;
import com.lrs.Service.AttendanceServiceTmp;
import com.lrs.Util.SecurityUtils;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class AttendanceServiceImpl implements AttendanceServiceTmp {

    AttendanceRepositoryTemp attendanceRepository;
    StudentsRepository studentsRepository;

    @Autowired
    public AttendanceServiceImpl(AttendanceRepositoryTemp attendanceRepository,
                                 StudentsRepository studentsRepository){

        this.attendanceRepository = attendanceRepository;
        this.studentsRepository = studentsRepository;
    }

    @Override
    public Attendance insertAttendance(Attendance attendance) throws ServiceException {
        validationStudent(attendance.getStudentId());
        attendance.setId(null);
        attendance.setCreatedBy(SecurityUtils.getLogInUserName());
        attendance.setCreatedDateTime(new Timestamp(System.currentTimeMillis()));
        attendance.setUpdatedBy(SecurityUtils.getLogInUserName());
        attendance.setUpdatedDateTime(new Timestamp(System.currentTimeMillis()));
        attendanceRepository.save(attendance);
        return attendance;
    }

    @Override
    public Attendance isExist(Long id) throws ServiceException {
       Optional<Attendance> attendance = attendanceRepository.findById(id);
       if(attendance.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0016);
       }
        return attendance.get();
    }

    @Override
    public Attendance attendanceUpdate(Attendance attendanceExist, AttendanceUpdate attendanceUpdate) throws ServiceException {
        attendanceExist.setAttendanceStatus(attendanceUpdate.getAttendanceStatus());
        attendanceExist.setRemarks(attendanceUpdate.getRemarks());
        // if you want update extra field add here
        attendanceExist.setUpdatedBy(SecurityUtils.getLogInUserName());
        attendanceExist.setUpdatedDateTime(new Timestamp(System.currentTimeMillis()));
        return attendanceRepository.save(attendanceExist);
    }

    @Override
    public void attendanceDelete(Long id) throws ServiceException {
        attendanceRepository.deleteById(id);
    }

    @Override
    public List<Attendance> getAttendanceReprot(Long studentId, String fromDate, String toDate) throws ServiceException {
        validationStudent(studentId);
//        return attendanceRepository.findAttendanceByStudentAndDateRange(studentId,fromDate,
//                toDate);
        List<Attendance> records = attendanceRepository.findAttendanceByStudentAndDateRange(studentId,fromDate,toDate);
        records.forEach(r -> {
            if (r.getAttendanceDate() != null) {
                r.setDayName(new SimpleDateFormat("EEEE").format(r.getAttendanceDate()));
            }
        });
        if(records.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0006);
        }
        return records;
    }

    private void validationStudent(Long id) throws ServiceException {
        Optional<Students>  data = studentsRepository.findById(id);
        if(data.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0016);
        }
    }
}
