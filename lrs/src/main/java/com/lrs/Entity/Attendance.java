package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "attendance")
@Data
public class Attendance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "student_id")
    private Long studentId;
    @Column(name = "attendance_date")
    private Date attendanceDate;
    @Column(name = "attendance_status")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean attendanceStatus;
    @Column(name = "remarks")
    private String remarks;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private Timestamp createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private Timestamp updatedDateTime;
    @Transient
    private String dayName;

}
