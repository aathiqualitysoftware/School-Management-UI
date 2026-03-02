package com.lrs.Service;

import com.lrs.Dto.ExamScheduleUpdate;
import com.lrs.Dto.PreviousAndUpcomingExamResponse;
import com.lrs.Entity.ExamSchedule;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface ExamScheduleService {
    ExamSchedule insertExamSchedule(ExamSchedule examSchedule) throws ServiceException;
    ExamSchedule isExist(Long id) throws ServiceException;
    ExamSchedule examScheduleUpdate(ExamSchedule examScheduleExist, ExamScheduleUpdate examScheduleUpdate) throws ServiceException;
    void examScheduleDelete(Long id) throws ServiceException;

    List<ExamSchedule> getExamSchedule() throws ServiceException;
    PreviousAndUpcomingExamResponse getData() throws ServiceException;
}
