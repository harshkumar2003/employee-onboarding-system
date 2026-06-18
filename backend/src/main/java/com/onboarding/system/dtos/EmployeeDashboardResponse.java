package com.onboarding.system.dtos;


import com.onboarding.system.enums.EmployeeStatus;
import com.onboarding.system.models.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDashboardResponse
{
    private long profileCompletion;
    private long documentsUpload;
    private long verifiedDocuments;
    private long onboardingTask;
    private long totalTask;
    private List<PendingActionResponse> pendingActions;
    private List<DocumentStatusResponse> documentStatus;
}
