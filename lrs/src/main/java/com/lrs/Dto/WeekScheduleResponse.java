package com.lrs.Dto;

import lombok.Data;

import java.util.List;

@Data
public class WeekScheduleResponse {
    private String weekName;
    private List<String> subjects;
    private Long totalPeriod;
    private Long afterLunchPeriod;

    public WeekScheduleResponse(String weekName, List<String> subjects, Long totalPeriod, Long afterLunchPeriod) {
        this.weekName = weekName;
        this.subjects = subjects;
        this.totalPeriod = totalPeriod;
        this.afterLunchPeriod = afterLunchPeriod;
    }
}
