package com.lrs.Dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommonLoginDetails {
    private String name;
    private Long classId;
    private String className;
    private Long sectionId;
    private String sectionName;
    }
