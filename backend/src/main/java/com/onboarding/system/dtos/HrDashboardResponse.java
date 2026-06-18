package com.onboarding.system.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HrDashboardResponse
{
    private Long totalEmployees;
    private Long pendingVerifications;
    private Long completedOnboarding;
    private Long activeOnboardees;
}
