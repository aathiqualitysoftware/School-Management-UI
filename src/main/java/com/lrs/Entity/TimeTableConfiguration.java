package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "time_table_config")
@Data
public class TimeTableConfiguration {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "class_id")
    private Long classId;
    @Column(name = "section_id")
    private Long sectionId;
    @Column(name = "acadaemicYearId")
    private Long academicYearId;
    @Column(name = "total_periods")
    private Long totalPeriods;
    @Column(name = "period_duration_minutes")
    private Long periodDurationMinutes;
//    @Column(name = "start_time")
//    private LocalDate startTime;
    @Column(name = "has_lunch_break")
    private Long hasLunchBreak;
    @Column(name = "lunch_break_after_period")
    private Long lunchBreakAfterPeriod;
    @Column(name = "is_active")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean isActive;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private Timestamp createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private Timestamp updatedDateTime;

}
