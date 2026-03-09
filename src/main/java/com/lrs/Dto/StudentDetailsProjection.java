package com.lrs.Dto;

import java.time.LocalDate;

public interface StudentDetailsProjection {
    String getName();
    Long getStudentId();
    LocalDate getDob();
    String getGender();
    String getReligion();
    String getAadhaarCardNumber();
    String getCategorie();
    String getBloodgroup();
    String getAdress();
    String getClassName();
    String getSectionName();
    Long getClassId();
    Long getSectionId();
}
