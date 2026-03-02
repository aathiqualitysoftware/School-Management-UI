package com.lrs.Service;

import com.lrs.Dto.WeekScheduleResponse;
import com.lrs.Entity.Users;
import com.lrs.exception.ServiceException;

import java.util.List;
import java.util.Map;

public interface TimeTableService {
    List<WeekScheduleResponse> getTimeTable(Long classId, Long sectionId) throws ServiceException;
}
