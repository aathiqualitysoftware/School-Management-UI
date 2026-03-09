package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "teacher_remarks")
@Data
public class TeacherRemarks {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "exam_type_id")
    private Long examTypeId;

    @Column(name = "staff_id")
    private Long staffId;

    @Column(name = "academic_year_id")
    private Long academicYearId;

    @Column(name = "student_id")
    private Long studentId;
    @Column(name = "date_of_add")
    private Date dateOfAdd;
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

}
