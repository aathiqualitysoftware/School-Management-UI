package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "exam_results")
@Data
public class ExamResults {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "exam_id")
    private Long examId;
    @Column(name = "student_id")
    private Long studentId;
    @Column(name = "marks")
    private Long marks;
    @Column(name = "grade_id")
    private Long gradeId;
    @Column(name = "createdBy")
    private String createdBy;
    @Column(name = "createdAt")
    private Timestamp createdDateTime;
    @Column(name = "updatedBy")
    private String updatedBy;
    @Column(name = "updatedAt")
    private Timestamp updatedDateTime;
}
