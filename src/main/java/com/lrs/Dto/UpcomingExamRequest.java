package com.lrs.Dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpcomingExamRequest {
    private String subjectName;
    private LocalDate examDate;

    public UpcomingExamRequest(String subjectName, LocalDate examDate) {
        this.subjectName = subjectName;
        this.examDate = examDate;
    }

    // getters
    public String getSubjectName() { return subjectName; }
    public LocalDate getExamDate() { return examDate; }

}
