package com.lrs.Repository;
import com.lrs.Entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepositoryTemp extends JpaRepository<Attendance, Long> {
    List<Attendance> findAll();
    Optional<Attendance> findById(Long id);
//    @Query(value = """
//        SELECT *
//        FROM attendance
//        WHERE student_id = :studentId
//          AND attendance_date BETWEEN :startDate AND :endDate
//        """, nativeQuery = true)
//    List<Attendance> findAttendanceByStudentAndDateRange(
//            @Param("studentId") Long studentId,
//            @Param("startDate") String startDate,   // or LocalDate
//            @Param("endDate") String endDate       // or LocalDate
//    );

    @Query(value = """
        SELECT 
            DATENAME(WEEKDAY, a.attendance_date) AS dayName,*
        FROM attendance AS a
        WHERE a.student_id = :studentId
          AND a.attendance_date BETWEEN :startDate AND :endDate
        """, nativeQuery = true)
    List<Attendance> findAttendanceByStudentAndDateRange(
            @Param("studentId") Long studentId,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );
}

