package com.lrs.Dto;

import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class TimeTableResponse {
        private Long staffid;
        private String firstName;
        private String lastName;
        private String middleName;
        private String email;
        private String phone;
        private String designation;
        private String department;
        private Date dob;
        private String gender;
        private String maritalStatus;
        private String employmentType;
        private String staffStatus;
        private Date joiningDate;
        private String nativeLanguage;
        private String aadhar;
        private String pan;
        private String qualification;
        private String religion;
        private String address;
        private String emergencyContactName;
        private String emergencyContactRelation;
        private String emergencyContactPhone;
        private String bankAccountNumber;
        private String bankIFSC;
        private String upiId;
        private String resumePath;
        private String idProofPath;
        private String photo;
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
