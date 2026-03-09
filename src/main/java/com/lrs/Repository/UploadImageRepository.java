package com.lrs.Repository;

import com.lrs.Entity.UploadImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.*;

@Repository
public interface UploadImageRepository extends JpaRepository<UploadImage, Long> {
    // You can add custom queries if needed, for example:
    // List<StudentImage> findByCreatedBy(String createdBy);
}