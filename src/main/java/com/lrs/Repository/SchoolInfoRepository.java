package com.lrs.Repository;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.SchoolInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchoolInfoRepository extends JpaRepository<SchoolInfo, Long> {
    List<SchoolInfo> findAll();
    Optional<SchoolInfo> findById(Long id);
    // Custom query: find by school name
    SchoolInfo findBySchoolName(String schoolName);

    // Custom query: find by email
    SchoolInfo findByEmailId(String emailId);

    // Custom query: find by phone number
    SchoolInfo findByPhoneNumber(String phoneNumber);

}

