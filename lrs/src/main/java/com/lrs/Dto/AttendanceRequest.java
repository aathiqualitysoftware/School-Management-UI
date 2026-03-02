package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class AttendanceRequest {
    private Date attendanceDate;
    private Boolean attendanceStatus;
    private String remarks;
    }
