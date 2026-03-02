package com.lrs.Dto;

import lombok.Data;

@Data
public class ClassSubjectsUpdate {
    private Long id;
    private Long classId;
    private Long sectionId;
    private Long subjectId;
    private String typeId;
    private String staffId;
   }
