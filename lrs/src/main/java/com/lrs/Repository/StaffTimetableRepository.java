package com.lrs.Repository;

import com.lrs.Entity.StaffTimetable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StaffTimetableRepository extends JpaRepository<StaffTimetable, Integer> {

    // Find by staff
    List<StaffTimetable> findByStaffId(String staffId);

    // Find by timetable
    List<StaffTimetable> findByTimetableId(String timetableId);

    // Find primary teacher assignments
    List<StaffTimetable> findByIsPrimaryTeacherTrue();

    // Find by status
    List<StaffTimetable> findByStatus(String status);
}