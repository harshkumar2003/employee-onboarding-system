package com.onboarding.system.dtos;

import com.onboarding.system.enums.EmployeeStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.UUID;
@Getter
@AllArgsConstructor
public class EmployeeResponse
{
    private UUID  employee_id;
    private String fullName;
    private String email;
    private String phone_no;
    private LocalDate joiningDate;
    private EmployeeStatus status;
}
