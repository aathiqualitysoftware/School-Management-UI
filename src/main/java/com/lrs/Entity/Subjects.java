package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "Subjects")
@Data
public class Subjects {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SubjectId")
    private Long id;
    @Column(name = "SubjectName")
    private String name;
    @Column(name = "Department")
    private String department;
    @Column(name = "IsAssigned")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean isAssigned;
    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

}
