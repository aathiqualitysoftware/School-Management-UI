package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "exam_schedule")
@Data
public class ExamSchedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "exam_type_id")
    private Long examTypeId;
    @Column(name = "academic_year_id")
    private Long academicYearId;
    @Column(name = "is_done")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean isDone;
    @Column(name = "class_subject_id")
    private Long classSubjectId;
    @Column(name = "from_date")
    private Date fromDate;
    @Column(name = "to_date")
    private Date toDate;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private Timestamp createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private Timestamp updatedDateTime;

}
