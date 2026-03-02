package com.lrs.Repository;

import com.lrs.Entity.Designation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DesignationRepository extends JpaRepository<Designation, Long> {

    // Find by designationId
    Designation findByDesignationId(String designationId);

    // Find by designationName
    Designation findByDesignationName(String designationName);

    // Find by departmentId
    List<Designation> findByDepartmentId(String departmentId);

    // Find active designations
    List<Designation> findByIsActiveTrue();

    // Find inactive designations
    List<Designation> findByIsActiveFalse();
}