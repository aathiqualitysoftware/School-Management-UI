package com.lrs.Dto;

import lombok.Data;

@Data
public class ClassSubjectsRequest {
    private Long classId;
    private Long sectionId;
    private Long subjectId;
    private String typeId;
    private String staffId;
   }
