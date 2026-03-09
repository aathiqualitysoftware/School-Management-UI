package com.lrs.Dto;

import lombok.Data;

import java.util.Date;

@Data
public class AttendanceUpdate {
    private Long id;
    private Boolean attendanceStatus;
    private String remarks;
    }
