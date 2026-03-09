package com.lrs.Repository;
import com.lrs.Dto.StudentReportDashboardResponse;
import com.lrs.Dto.StudentReportResponse;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.ExamResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamResultsRepository extends JpaRepository<ExamResults, Long> {
    List<ExamResults> findAll();
    Optional<ExamResults> findById(Long id);
    @Query(value = """
        SELECT 
            x.avg_marks AS avgMarks,
            x.ExamTypeName AS examTypeName,
            gi.grade_name AS gradeName,
            x.total_count AS totalCount,
            x.total_percentage AS totalPercentage,
            gi.id AS gradeId,
            x.ExamTypeId AS examTypeId,
            x.year_name as academicYear
        FROM (
            SELECT 
                AVG(CAST(es.marks AS BIGINT)) AS avg_marks,
                m.name AS ExamTypeName,
                m.id AS ExamTypeId,
                ay.year_name,
                COUNT(*) AS total_count,
                (SUM(CAST(es.marks AS BIGINT)) / COUNT(*)) AS total_percentage
            FROM exam_results es
            INNER JOIN exams e ON es.exam_id = e.ExamId
            INNER JOIN master m ON m.id = e.ExamTypeId
            INNER JOIN mastertype mt ON mt.MasterTypeId = m.mastertype_id
            INNER JOIN students s ON s.StudentId = :studentId
            INNER JOIN academicyear ay ON ay.id = s.AcademicYearId
            WHERE es.student_id = :studentId
              AND mt.TypeName = 'EXAMTYPES'
            GROUP BY m.name, m.id, ay.year_name
        ) AS x
        INNER JOIN grade_info gi
            ON x.avg_marks BETWEEN gi.from_mark AND gi.to_mark
        """, nativeQuery = true)
    List<StudentReportResponse> getStudentExamReport(@Param("studentId") Long studentId);

    @Query(value = """
        SELECT 
            es.marks,
            gi.grade_name,
            s.SubjectName,
            100 AS totalMark,
            (ss.FirstName + ' ' + ss.LastName) AS studentName,
            ss.RollNumber,
            mc.name AS ClassName,
            se.SectionName,
            (SELECT total_working_days FROM academicyear WHERE year_name=:academicYear) AS totalDays,
            (SELECT COUNT(*) FROM attendance WHERE attendance_status ='1') AS presentDays,
            (SELECT COUNT(*) FROM attendance WHERE attendance_status ='0') AS absentDays,
            ROUND(
                CAST((SELECT COUNT(*) FROM attendance WHERE attendance_status ='1') AS FLOAT) /
                CAST((SELECT total_working_days FROM academicyear WHERE year_name=:academicYear) AS FLOAT) * 100, 0
            ) AS AttendancePercentage,
            tr.remarks,
            (st.FirstName + '  ' + st.LastName) as teacherName,
            tr.date_of_add as issuedDate
        FROM exam_results es
        INNER JOIN exams e ON es.exam_id = e.ExamId

        INNER JOIN master me ON me.id = :examTypeId
        INNER JOIN mastertype mte ON mte.MasterTypeId = me.mastertype_id
            AND mte.TypeName = 'EXAMTYPES'

        INNER JOIN grade_info gi ON gi.id = es.grade_id
        INNER JOIN class_subjects cs ON cs.ClassSubjectId = e.ClassSubjectId
        INNER JOIN subjects s ON s.SubjectId = cs.SubjectId
        INNER JOIN students ss ON ss.StudentId = :studentId

        INNER JOIN master mc ON mc.id = ss.ClassId
        INNER JOIN mastertype mtc ON mtc.MasterTypeId = mc.mastertype_id
            AND mtc.TypeName = 'CLASSES'

        INNER JOIN sections se ON se.SectionId = ss.SectionId
        INNER JOIN teacher_remarks tr 
            ON tr.student_id = :studentId 
            AND tr.exam_type_id = :examTypeId
        INNER JOIN staffs st ON st.id = tr.staff_id

        WHERE es.student_id = :studentId
        """, nativeQuery = true)
    List<StudentReportDashboardResponse> findStudentStudentReportDashboard(@Param("studentId") Long studentId,
                                                                           @Param("examTypeId") Long examTypeId,
                                                                           @Param("academicYear") String academicYear);
}

