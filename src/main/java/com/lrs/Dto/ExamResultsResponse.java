package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class ExamResultsResponse {
    private Long id;
    private Long examId;
    private Long studentId;
    private Long marks;
    private Long gradeId;
    private String createdBy;
    private Timestamp createdDateTime;
    private String updatedBy;
    private Timestamp updatedDateTime;

    public String getCreatedDateTime() {
        if(null == createdDateTime){
            return null;
        }else{
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            return simpleDateFormat.format(new Date(createdDateTime.getTime()));
        }
    }

    public void setCreatedDateTime(Timestamp createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getUpdatedDateTime() {
        if(null == updatedDateTime){
            return null;
        }else{
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            return simpleDateFormat.format(new Date(updatedDateTime.getTime()));
        }
    }

    public void setUpdatedDateTime(Timestamp updatedDateTime) {
        this.updatedDateTime = updatedDateTime;
    }
}

