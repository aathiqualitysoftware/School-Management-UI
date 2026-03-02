package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

@Data
public class GradeInfoResponse {
    private Long id;
    private String gradeName;
    private String fromMark;
    private String toMark;
    private String createdBy;
    private LocalDate createdDateTime;
    private String updatedBy;
    private LocalDate updatedDateTime;

}
