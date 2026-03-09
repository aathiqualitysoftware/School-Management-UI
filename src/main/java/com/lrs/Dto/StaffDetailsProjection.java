package com.lrs.Dto;

import java.time.LocalDate;

public interface StaffDetailsProjection {
    String getName();
    Long getStudentId();
    LocalDate getDob();
    String getGender();
    String getReligion();
    String getAadhaarCardNumber();
    String getCategorie();
    String getBloodgroup();
    String getAdress();
}
