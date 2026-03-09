package com.lrs.Dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class SchoolInfoResponse {
    private Long id;
    private String schoolName;
    private String emailId;
    private String phoneNumber;
    private String address1;
    private String address2;
    private String whatupLink;
    private String fbLink;
    private String twitterLink;
    private String instagramLink;
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
