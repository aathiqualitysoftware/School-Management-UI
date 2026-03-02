package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "classes")
@Data
public class Classes {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ClassId")
    private Long id;
    @Column(name = "ClassName")
    private String className;
    @Column(name = "IsActive")
    @Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private Boolean isActive;
}
