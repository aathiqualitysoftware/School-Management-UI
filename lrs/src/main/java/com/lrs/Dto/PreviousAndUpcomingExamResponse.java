package com.lrs.Dto;

import lombok.Data;

import java.util.List;

@Data
public class PreviousAndUpcomingExamResponse {
    private List<PreviousExamResultRequest> previousExamResultRequest;
    private List<UpcomingExamRequest> upcomingExamRequest;

    }
