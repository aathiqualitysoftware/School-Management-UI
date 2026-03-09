package com.lrs.Dto;

import java.time.LocalDate;

public interface StudentReportDashboardResponse {
     Integer getMarks();
     String getGradeName();
     String getSubjectName();
     Integer getTotalMark();
     String getStudentName();
     String getRollNumber();
     String getClassName();
     String getSectionName();
     Integer getTotalDays();
     Integer getPresentDays();
     Integer getAbsentDays();
     Double getAttendancePercentage();
     String getRemarks();
     String getTeacherName();
     LocalDate getIssuedDate();


}
