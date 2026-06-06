package com.onboarding.system.dtos;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class CreateEmployeeRequest {

    private String fullName;
    private String email;
    private String phoneNumber;
    private LocalDate joiningDate;
}