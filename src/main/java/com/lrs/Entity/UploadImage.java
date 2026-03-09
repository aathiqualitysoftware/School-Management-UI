package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "upload_images")
@Data
public class UploadImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private byte[] imageData;

    private String createdBy = "SYSTEM";
    private String updatedBy = "SYSTEM";

    @Column(columnDefinition = "DATE DEFAULT GETDATE()")
    private LocalDate createdAt;

    @Column(columnDefinition = "DATE DEFAULT GETDATE()")
    private LocalDate updatedAt;

    // getters and setters
}