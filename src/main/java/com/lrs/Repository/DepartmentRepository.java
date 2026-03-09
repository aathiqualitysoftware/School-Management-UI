package com.lrs.Repository;

import com.lrs.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Find by departmentId
    Department findByDepartmentId(String departmentId);

    // Find by departmentName
    Department findByDepartmentName(String departmentName);

    // Find active departments
    List<Department> findByIsActiveTrue();

    // Find inactive departments
    List<Department> findByIsActiveFalse();
}