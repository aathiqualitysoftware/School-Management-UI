package com.lrs.Repository;

import com.lrs.Controller.Stud;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudRepository extends JpaRepository<Stud, Integer> {

    // Find by admission number
    Stud findByAdmissionNumber(String admissionNumber);

    // Find by roll number
    Stud findByRollNumber(String rollNumber);

    // Find by class and section
    List<Stud> findByClassIdAndSectionId(Integer classId, Integer sectionId);

    // Find by academic year
    List<Stud> findByAcademicYearId(Integer academicYearId);

    // Find transfer students
    List<Stud> findByIsTransferStudentTrue();

    // Find by mobile number
    Stud findByMobileNumber(String mobileNumber);
}