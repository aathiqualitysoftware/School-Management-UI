package com.lrs.Repository;

import com.lrs.Entity.LeaveApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Long> {

    // Find by student
    List<LeaveApplication> findByStudentId(Long studentId);

    // Find by status
    List<LeaveApplication> findByStatus(String status);

    // Find leaves within a date range
    List<LeaveApplication> findByStartDateBetween(LocalDate start, LocalDate end);

    // Find pending approvals
    List<LeaveApplication> findByApprovedByIsNull();
}