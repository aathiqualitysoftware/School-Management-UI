package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "settings")
@Data
public class Settings {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;
    @Column(name = "code")
    private String code;
    @Column(name = "description")
    private String description;
    @Column(name = "value")
    private String value;
    @Column(name = "createdBy", length = 50)
    private String createdBy;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "updatedBy", length = 50)
    private String updatedBy;

    @Column(name = "updatedAt")
    private LocalDate updatedAt;

}
