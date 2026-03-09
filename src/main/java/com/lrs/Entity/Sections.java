package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "sections")
@Data
public class Sections {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SectionId")
    private Long id;
    @Column(name = "SectionName")
    private String sectionName;
    @Column(name = "ClassId")
    private Long classId;
    @Column(name = "IsActive")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean isActive;
    @Column(name = "createdBy", length = 50)
    private String createdBy;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "updatedBy", length = 50)
    private String updatedBy;

    @Column(name = "updatedAt")
    private LocalDate updatedAt;

}
