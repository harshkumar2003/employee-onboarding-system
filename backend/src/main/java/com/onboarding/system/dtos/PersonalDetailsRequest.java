package com.onboarding.system.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PersonalDetailsRequest
{
    private LocalDate dob;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private String emergencyContactNumber;
    private Integer yearsOfExperience;
}
