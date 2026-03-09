package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class LogInStudentResponse {
    private String sectionName;
    private String studentName;
    private String className;
    private String studentId;
    private Long classId;
    private Long sectionId;
}
