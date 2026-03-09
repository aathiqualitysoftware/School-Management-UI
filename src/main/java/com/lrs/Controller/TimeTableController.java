package com.lrs.Controller;

import com.lrs.Dto.GenericResponse;
import com.lrs.Dto.UserResponse;
import com.lrs.Dto.WeekScheduleResponse;
import com.lrs.Entity.Users;
import com.lrs.Service.TimeTableService;
import com.lrs.Service.UserService;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/timetable")
@RestController
@Slf4j
public class TimeTableController {

    private TimeTableService timeTableService;
    private ModelMapper modelMapper;
    @Autowired
    public TimeTableController(TimeTableService timeTableService,
                               ModelMapper modelMapper){
        this.timeTableService = timeTableService;
        this.modelMapper = modelMapper;
    }
    @GetMapping
    public ResponseEntity<GenericResponse<List<WeekScheduleResponse>>> getTimeTable(@RequestParam Long classId , @RequestParam Long sectionId) throws ServiceException {
        List<WeekScheduleResponse> list =  timeTableService.getTimeTable(classId,sectionId);
/* build responce*/
        GenericResponse<List<WeekScheduleResponse>> response = new GenericResponse<>();
        response.setData(list);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
