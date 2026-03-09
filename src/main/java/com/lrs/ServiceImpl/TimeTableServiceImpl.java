package com.lrs.ServiceImpl;

import com.lrs.Dto.WeekScheduleResponse;
import com.lrs.Entity.*;
import com.lrs.Repository.*;
import com.lrs.Service.TimeTableService;
import com.lrs.Service.UserService;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Service
public class TimeTableServiceImpl implements TimeTableService {

    TimeTableConfigRepository timeTableConfigRepository;
    TimeTableRepository timeTableRepository;
    WeeksRepository weeksRepository;
    SubjectsRepository subjectsRepository;


    @Autowired
    public TimeTableServiceImpl(TimeTableConfigRepository timeTableConfigRepository,
                                TimeTableRepository timeTableRepository,
                                WeeksRepository weeksRepository,
                                SubjectsRepository subjectsRepository){
        this.timeTableConfigRepository = timeTableConfigRepository;
        this.timeTableRepository = timeTableRepository;
        this.weeksRepository = weeksRepository;
        this.subjectsRepository = subjectsRepository;
    }

    @Override
    public List<WeekScheduleResponse> getTimeTable(Long classId, Long sectionId) throws ServiceException {
        TimeTableConfiguration timeTableConfiguration =
                timeTableConfigRepository.findByClassIdAndSectionId(classId, sectionId);

        if (timeTableConfiguration == null) {
            throw new ServiceException(ErrorCode.SVS_ERR_0021);
        }

        List<TimeTable> periods =
                timeTableRepository.findByClassIdAndSectionId(classId, sectionId);

        // Preload weeks into maps
        Map<Long, String> weekNames = weeksRepository.findAll().stream()
                .collect(Collectors.toMap(Weeks::getId, Weeks::getName));

        Map<Long, Long> weekOrder = weeksRepository.findAll().stream()
                .collect(Collectors.toMap(Weeks::getId, Weeks::getId));

        Map<Long, String> subjectNames = subjectsRepository.findAll().stream()
                .collect(Collectors.toMap(Subjects::getId, Subjects::getName));

        // Group by weekId, then convert to DTOs
        return periods.stream()
                .collect(Collectors.groupingBy(TimeTable::getWeekId))
                .entrySet().stream()
                .sorted(Comparator.comparing(e -> weekOrder.getOrDefault((Object) e.getKey(), (long) Integer.MAX_VALUE)))
                .map(entry -> {
                    String weekName = weekNames.getOrDefault(entry.getKey(), "Unknown");
                    List<TimeTable> list = entry.getValue();
                    list.sort(Comparator.comparing(TimeTable::getId));

                    List<String> subjects = list.stream()
                            .map(p -> IntStream.rangeClosed(1, Math.toIntExact(timeTableConfiguration.getTotalPeriods()))
                                    .mapToObj(periodNo -> {
                                        Long subjectId = getSubjectIdForPeriod(p, periodNo);
                                        return subjectNames.getOrDefault(subjectId, "Unknown");
                                    })
                                    .toList())
                            .flatMap(List::stream)
                            .toList();

                    return new WeekScheduleResponse(weekName, subjects,timeTableConfiguration.getTotalPeriods(),
                            timeTableConfiguration.getLunchBreakAfterPeriod());
                })
                .toList();
    }
    private Long getSubjectIdForPeriod(TimeTable tt, int periodNo) {
        try {
            String methodName = "getPeriod" + periodNo;
            var method = TimeTable.class.getMethod(methodName);
            Object result = method.invoke(tt);
            return (result instanceof Long) ? (Long) result : null;
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException("Failed to get subjectId for period " + periodNo, e);
        }
    }
}
