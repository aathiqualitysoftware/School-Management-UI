package com.lrs.Dto;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class ClassesResponse {
    private Long id;
    private String className;
    private Boolean isActive;
   }

