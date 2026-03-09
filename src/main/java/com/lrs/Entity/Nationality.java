package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "nationality")
@Data
public class Nationality {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "createdBy", length = 50)
    private String createdBy;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updatedBy", length = 50)
    private String updatedBy;

    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

}
