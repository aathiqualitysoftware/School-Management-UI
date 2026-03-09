package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public interface StudentReportResponse {
     Long getAvgMarks();
     String getExamTypeName();
     String getGradeName();
     Long getTotalCount();
     Double getTotalPercentage();
     Long getGradeId();
     Long getExamTypeId();
     String getAcademicYear();
}
