package com.lrs.Dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.Date;

@Data
public class ExamsResponse {
    private Long id;
    private String uniqueExamCode;
    private Long academicYearId;
    private Long examTypeId;
    private Long classSubjectId;
    private Date startDate;
    private Date endDate;
}
