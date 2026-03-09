package com.lrs.Repository;

import com.lrs.Entity.ReportSendHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReportSendHistoryRepository extends JpaRepository<ReportSendHistory, Integer> {

    // Find by student
    List<ReportSendHistory> findByStudentId(Integer studentId);

    // Find by academic year
    List<ReportSendHistory> findByAcademicYearId(Integer academicYearId);

    // Find by class and section
    List<ReportSendHistory> findByClassIdAndSectionId(Integer classId, Integer sectionId);

    // Find by report period
    List<ReportSendHistory> findByReportPeriod(String reportPeriod);

    // Find reports sent within a date range
    List<ReportSendHistory> findBySentDateBetween(LocalDateTime start, LocalDateTime end);

    // Find by quarter
    List<ReportSendHistory> findByQuarterId(Integer quarterId);
}