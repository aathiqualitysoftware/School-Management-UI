package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class ExamResultsRequest {
    private Long examId;
    private Long studentId;
    private Long marks;
    private Long gradeId;
   }

