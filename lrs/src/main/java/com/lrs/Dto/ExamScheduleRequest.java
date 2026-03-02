package com.lrs.Dto;

import lombok.Data;

import java.util.Date;

@Data
public class ExamScheduleRequest {
    private Long examTypeId;
    private Long academicYearId;
    private Boolean isDone;
    private Long classSubjectId;
    private Date fromDate;
    private Date toDate;
   }
