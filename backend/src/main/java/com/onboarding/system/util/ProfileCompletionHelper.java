package com.onboarding.system.util;

import com.onboarding.system.enums.DocumentStatus;
import com.onboarding.system.enums.DocumentType;
import com.onboarding.system.enums.EmployeeStatus;
import com.onboarding.system.models.Employee;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProfileCompletionHelper
{
    public long getProfileCompletion(EmployeeStatus status) {
        return switch (status) {
            case INVITED -> 0;

            case ACCOUNT_CREATED -> 10;

            case PROFILE_PENDING -> 10;
            case PROFILE_COMPLETED -> 20;

            case EXPERIENCE_PENDING -> 20;
            case EXPERIENCE_COMPLETED -> 35;

            case EDUCATION_PENDING -> 35;
            case EDUCATION_COMPLETED -> 50;

            case BANK_DETAILS_PENDING -> 50;
            case BANK_DETAILS_COMPLETED -> 65;

            case DOCUMENTS_PENDING -> 65;
            case DOCUMENTS_SUBMITTED -> 80;
            case DOCUMENTS_REJECTED -> 70;
            case DOCUMENTS_APPROVED -> 90;

            case POLICY_PENDING -> 90;
            case POLICY_ACCEPTED -> 95;

            case ONBOARDED -> 100;
        };
    }




}
