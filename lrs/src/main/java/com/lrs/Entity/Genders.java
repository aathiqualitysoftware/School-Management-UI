package com.lrs.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "genders")
@Data
public class Genders {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;
    @Column(name = "Name")
    private String name;
}
