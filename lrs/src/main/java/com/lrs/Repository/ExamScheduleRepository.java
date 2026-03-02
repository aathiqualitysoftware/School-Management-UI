package com.lrs.Repository;
import com.lrs.Dto.PreviousExamResultRequest;
import com.lrs.Dto.UpcomingExamRequest;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.ExamSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExamScheduleRepository extends JpaRepository<ExamSchedule, Long> {
    List<ExamSchedule> findAll();
    Optional<ExamSchedule> findById(Long id);
    // Find by exam type
    List<ExamSchedule> findByExamTypeId(Long examTypeId);

    // Find by class subject
    List<ExamSchedule> findByClassSubjectId(Long classSubjectId);

    // Find by academic year
    List<ExamSchedule> findByAcademicYearId(Long academicYearId);

    // Find schedules within a date range
    List<ExamSchedule> findByFromDateBetween(LocalDate start, LocalDate end);

    // Find completed schedules
    List<ExamSchedule> findByIsDoneTrue();

    // Find pending schedules
    List<ExamSchedule> findByIsDoneFalse();

    @Query(value = """
        SELECT s.SubjectName AS subjectName, es.from_date AS examDate
        FROM exam_schedule es
        INNER JOIN exams e 
            ON es.exam_type_id = e.ExamTypeId
        INNER JOIN class_subjects cs 
            ON es.class_subject_id = cs.ClassSubjectId
           AND cs.ClassId = :classId 
           AND cs.SectionId = :sectionId
        INNER JOIN subjects s 
            ON cs.SubjectId = s.SubjectId
           AND es.is_done = '1'
        """, nativeQuery = true)
        List<UpcomingExamRequest> findUpcomingExamRequest(@Param("classId") Long classId,
                                                    @Param("sectionId") Long sectionId);

    @Query(value = """
        SELECT s.SubjectName AS subjectName, er.marks AS marks
        FROM class_subjects cs
        INNER JOIN exams e
            ON cs.ClassSubjectId = e.ClassSubjectId
        INNER JOIN subjects s
            ON cs.SubjectId = s.SubjectId
        INNER JOIN exam_results er
            ON e.ExamId = er.exam_id
        INNER JOIN exam_schedule es
            ON cs.ClassSubjectId = es.class_subject_id 
           AND es.is_done = '0'
        WHERE cs.ClassId = :classId 
          AND cs.SectionId = :sectionId
        """, nativeQuery = true)
    List<PreviousExamResultRequest> findPreviousExamResultRequest(@Param("classId") Long classId,
                                                    @Param("sectionId") Long sectionId);

}


