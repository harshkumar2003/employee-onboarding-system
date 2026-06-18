package com.onboarding.system.services;

import com.onboarding.system.dtos.*;
import com.onboarding.system.enums.DocumentType;
import com.onboarding.system.models.Employee;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface EmployeeService
{
    void savePersonalDetails(PersonalDetailsRequest request);
    void saveEducationDetails(EducationDetailsRequest request);
    void saveExperience(ExperienceRequest request);
    void saveBankDetails(BankDetailsRequest request);
    void saveDocument(DocumentType documentType , MultipartFile multipartFile);
    void acceptPolicies(PolicyAcceptanceRequest request);
    void profileUpdate(Employee employee);

    EmployeeDashboardResponse getEmployeeDashboardStats();
//    EmployeeProfileResponse getProfile();
}
