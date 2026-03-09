package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "time_table")
@Data
public class TimeTable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "week_id")
    private Long weekId;
    @Column(name = "class_id")
    private Long classId;
    @Column(name = "section_id")
    private Long sectionId;
    @Column(name = "period_1")
    private Long period1;
    @Column(name = "period_2")
    private Long period2;
    @Column(name = "period_3")
    private Long period3;
    @Column(name = "period_4")
    private Long period4;
    @Column(name = "period_5")
    private Long period5;
    @Column(name = "period_6")
    private Long period6;
    @Column(name = "period_7")
    private Long period7;
    @Column(name = "period_8")
    private Long period8;
    @Column(name = "period_9")
    private Long period9;
    @Column(name = "period_10")
    private Long period10;
    @Column(name = "period_11")
    private Long period11;
    @Column(name = "period_12")
    private Long period12;
    @Column(name = "period_13")
    private Long period13;
    @Column(name = "period_14")
    private Long period14;
    @Column(name = "period_15")
    private Long period15;

    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private Timestamp createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private Timestamp updatedDateTime;
}
