package com.onboarding.system.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExperienceRequest
{
    private String companyName;

    private String designation;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean currentlyWorking;

    private String location;

}
