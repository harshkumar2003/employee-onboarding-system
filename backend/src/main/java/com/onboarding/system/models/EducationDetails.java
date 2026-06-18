package com.onboarding.system.models;


import com.onboarding.system.enums.QualificationType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;


@Entity
@Table(name = "education_details")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EducationDetails
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Enumerated(EnumType.STRING)
    private QualificationType qualification;

    private String institutionName;

    private String boardUniversity;

    private String specialization;

    private Integer passingYear;

    private String percentageCgpa;
}
