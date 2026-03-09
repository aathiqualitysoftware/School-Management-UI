package com.lrs.Dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class ClassSubjectsResponse {
    private Long id;
    private Long classId;
    private Long sectionId;
    private Long subjectId;
    private String typeId;
    private String staffId;
   }
