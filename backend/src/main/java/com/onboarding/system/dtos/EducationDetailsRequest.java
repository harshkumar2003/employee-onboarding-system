package com.onboarding.system.dtos;


import com.onboarding.system.enums.QualificationType;
import lombok.Data;

@Data
public class EducationDetailsRequest
{
    private QualificationType qualification;

    private String institutionName;

    private String boardUniversity;

    private String specialization;

    private Integer passingYear;

    private String percentageCgpa;
}
