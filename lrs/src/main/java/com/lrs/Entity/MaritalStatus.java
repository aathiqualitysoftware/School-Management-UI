package com.lrs.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "marital_statuses")
@Data
public class MaritalStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "StatusName", length = 100, nullable = false)
    private String statusName;

    // Getters and Setters
}