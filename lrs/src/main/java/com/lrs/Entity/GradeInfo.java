package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "grade_info")
@Data
public class GradeInfo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "grade_name")
    private String gradeName;
    @Column(name = "from_mark")
    private String fromMark;
    @Column(name = "to_mark")
    private String toMark;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private LocalDate createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private LocalDate updatedDateTime;
}
