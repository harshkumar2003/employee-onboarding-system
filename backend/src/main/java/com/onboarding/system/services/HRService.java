package com.onboarding.system.services;

import com.onboarding.system.dtos.*;

import java.util.List;
import java.util.UUID;

public interface HRService
{
    void createEmployee(CreateEmployeeRequest request);

    void setupPassword(SetupPasswordRequest request);

    List<EmployeeResponse> getAllEmployee();

    EmployeeResponse getEmployeeById(UUID id);

    HrDashboardResponse getDashboardStats();

    List<PendingDocumentResponse> getPendingDocuments();

    void approveDocuments(UUID id, ApproveDocumentsRequest request);
}