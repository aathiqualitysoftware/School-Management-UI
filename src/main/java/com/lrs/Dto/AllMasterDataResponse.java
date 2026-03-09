package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;


public interface AllMasterDataResponse {
    Long getMasterTypeId();
     Long getMasterId();
    String getTypeName();
     String getTypeCode();
     String getName();
    Boolean getMasterTypeActive();
    Boolean getMasterActive();
}
