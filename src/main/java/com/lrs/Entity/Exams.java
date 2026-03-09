package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "exams")
@Data
public class Exams {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ExamId")
    private Long id;
    @Column(name = "UniqueExamCode")
    private String uniqueExamCode;
    @Column(name = "AcademicYearId")
    private Long academicYearId;
    @Column(name = "ExamTypeId")
    private Long examTypeId;
    @Column(name = "ClassSubjectId")
    private Long classSubjectId;
    @Column(name = "StartDate")
    private Date startDate;
    @Column(name = "EndDate")
    private Date endDate;
}
