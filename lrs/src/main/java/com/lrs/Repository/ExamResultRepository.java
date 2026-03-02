package com.lrs.Repository;

import com.lrs.Entity.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    // Find results by exam
    List<ExamResult> findByExamId(Long examId);

    // Find results by student
    List<ExamResult> findByStudentId(Long studentId);

    // Find results by exam and student
    ExamResult findByExamIdAndStudentId(Long examId, Long studentId);

    // Find results by grade
    List<ExamResult> findByGradeId(Long gradeId);
}