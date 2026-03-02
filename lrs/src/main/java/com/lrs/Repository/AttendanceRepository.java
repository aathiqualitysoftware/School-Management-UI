package com.lrs.Repository;

import com.lrs.Entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    // Get all attendance records for a student
    List<Attendance> findByStudentId(Long studentId);

    // Get attendance for a student on a specific date
    Attendance findByStudentIdAndAttendanceDate(Long studentId, LocalDate attendanceDate);

    // Get attendance records for a student within a date range
    List<Attendance> findByStudentIdAndAttendanceDateBetween(Long studentId, LocalDate from, LocalDate to);

    // Get all attendance records for a specific date
    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    // Daily summary: count present/absent
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.attendanceDate = :date AND a.attendanceStatus = true")
    long countPresentByDate(LocalDate date);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.attendanceDate = :date AND a.attendanceStatus = false")
    long countAbsentByDate(LocalDate date);
    @Query(value = "SELECT * FROM attendance a " +
            "WHERE a.student_id IN (SELECT s.StudentId FROM students s " +
            "WHERE s.ClassId = :classId AND s.SectionId = :sectionId) " +
            "AND a.attendance_date = :attendanceDate",
            nativeQuery = true)
    List<Attendance> findAttendanceByClassSectionAndDate(@Param("classId") Integer classId,
                                                         @Param("sectionId") Integer sectionId,
                                                         @Param("attendanceDate") LocalDate attendanceDate);
}