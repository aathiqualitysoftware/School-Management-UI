package com.lrs.Dto;

import lombok.Data;

import java.util.Date;

@Data
public class ExamScheduleUpdate {
    private Long id;
    private Long examTypeId;
    private Long academicYearId;
    private Boolean isDone;
    private Long classSubjectId;
    private Date fromDate;
    private Date toDate;
   }
