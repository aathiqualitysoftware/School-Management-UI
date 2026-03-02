package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "staff_timetable")
@Data
public class StaffTimetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "StaffTimetableId", length = 50, nullable = false)
    private String staffTimetableId;

    @Column(name = "StaffId", length = 50, nullable = false)
    private String staffId;

    @Column(name = "TimetableId", length = 50, nullable = false)
    private String timetableId;

    @Column(name = "IsPrimaryTeacher")
    private Boolean isPrimaryTeacher;

    @Column(name = "Remarks", length = 255)
    private String remarks;

    @Column(name = "Status", length = 20)
    private String status;

    // Getters and Setters
}