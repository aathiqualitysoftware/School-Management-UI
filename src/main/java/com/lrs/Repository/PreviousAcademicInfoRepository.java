package com.lrs.Repository;

import com.lrs.Entity.PreviousAcademicInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PreviousAcademicInfoRepository extends JpaRepository<PreviousAcademicInfo, Integer> {

    // Find by last attended class
    List<PreviousAcademicInfo> findByLastAttendedClass(String lastAttendedClass);

    // Find by previous school name
    List<PreviousAcademicInfo> findByPreviousSchoolName(String schoolName);

    // Find by transfer certificate number
    PreviousAcademicInfo findByTransferCertificateNumber(String certificateNumber);
}