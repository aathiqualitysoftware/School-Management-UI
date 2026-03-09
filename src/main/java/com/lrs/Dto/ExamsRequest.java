package com.lrs.Dto;

import lombok.Data;

import java.util.Date;

@Data
public class ExamsRequest {
    private String uniqueExamCode;
    private Long academicYearId;
    private Long examTypeId;
    private Long classSubjectId;
    private Date startDate;
    private Date endDate;
}
