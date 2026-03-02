package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "examtypes")
@Data
public class ExamType {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ExamTypeId")
    private Long id;
    @Column(name = "ExamTypeName")
    private String name;
}
