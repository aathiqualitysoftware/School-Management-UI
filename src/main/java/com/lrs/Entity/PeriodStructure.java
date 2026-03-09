package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Table(name = "period_structure")
@Data
public class PeriodStructure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PeriodId")
    private Long periodId;

    @Column(name = "ConfigId", length = 50, nullable = false)
    private String configId;

    @Column(name = "PeriodNumber")
    private Integer periodNumber;

    @Column(name = "StartTime")
    private LocalTime startTime;

    @Column(name = "EndTime")
    private LocalTime endTime;

    @Column(name = "IsBreak")
    private Boolean isBreak;

    @Column(name = "TeachingPeriodNumber")
    private Integer teachingPeriodNumber;

    @Column(name = "PeriodType", length = 50)
    private String periodType;

    @Column(name = "BreakName", length = 100)
    private String breakName;

    @Column(name = "BreakNumber")
    private Integer breakNumber;

    // Getters and Setters
}