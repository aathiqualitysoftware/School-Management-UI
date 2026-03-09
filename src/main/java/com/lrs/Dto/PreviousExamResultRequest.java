package com.lrs.Dto;

import lombok.Data;

import java.util.Date;


public interface PreviousExamResultRequest {
    String getSubjectName();
    Integer getMarks();

}
