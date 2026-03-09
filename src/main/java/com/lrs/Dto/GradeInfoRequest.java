package com.lrs.Dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.Date;

@Data
public class GradeInfoRequest {
    private String gradeName;
    private String fromMark;
    private String toMark;
    }
