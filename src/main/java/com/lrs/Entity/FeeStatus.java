package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "feestatus")
@Data
public class FeeStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "status_name", length = 100, nullable = false)
    private String statusName;

    // Getters and Setters
}