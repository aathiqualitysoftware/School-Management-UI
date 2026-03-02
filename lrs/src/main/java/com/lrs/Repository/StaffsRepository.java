package com.lrs.Repository;

import com.lrs.Dto.StaffDetailsProjection;
import com.lrs.Dto.StudentDetailsProjection;
import com.lrs.Entity.Staff;
import com.lrs.Entity.Staffs;
import com.lrs.Entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StaffsRepository extends JpaRepository<Staffs,Long> {
    List<Staffs> findAll();
    Optional<Staffs> findById(Long id);
    @Query("SELECT s.department, COUNT(s) FROM Staff s GROUP BY s.department")
    List<Object[]> countByDepartment();

    @Query("SELECT s.designation, COUNT(s) FROM Staff s GROUP BY s.designation")
    List<Object[]> countByDesignation();

    @Query("SELECT COUNT(s) FROM Staff s WHERE YEAR(s.joiningDate) = YEAR(CURRENT_DATE)")
    Long countJoinedThisYear();

    //    StaffDetailsProjection getByStaffDetails(@Param("id") Long id);

    Optional<Staff> findByEmail(String email);

    List<Staff> findByDepartment(String department);
    List<Staff> findByDesignation(String designation);
    List<Staff> findByStaffStatus(String staffStatus);

    @Query("SELECT s FROM Staff s WHERE " +
            "(:department IS NULL OR s.department = :department) AND " +
            "(:designation IS NULL OR s.designation = :designation) AND " +
            "(:status IS NULL OR s.staffStatus = :status)")
    List<Staff> searchStaffs(@Param("department") String department,
                             @Param("designation") String designation,
                             @Param("status") String status);

    @Query("SELECT s FROM Staff s WHERE s.dob BETWEEN :dobFrom AND :dobTo")
    List<Staff> findByDobRange(@Param("dobFrom") LocalDate dobFrom,
                               @Param("dobTo") LocalDate dobTo);

    @Query("SELECT s FROM Staff s WHERE s.joiningDate BETWEEN :joinFrom AND :joinTo")
    List<Staff> findByJoiningDateRange(@Param("joinFrom") LocalDate joinFrom,
                                       @Param("joinTo") LocalDate joinTo);

}
