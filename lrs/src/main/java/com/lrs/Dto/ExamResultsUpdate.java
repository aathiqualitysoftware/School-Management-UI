package com.lrs.Dto;

import lombok.Data;

@Data
public class ExamResultsUpdate {
    private Long id;
    private Long examId;
    private Long studentId;
    private Long marks;
    private Long gradeId;
   }

