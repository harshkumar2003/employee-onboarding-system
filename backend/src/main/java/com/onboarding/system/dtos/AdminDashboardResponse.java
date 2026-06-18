package com.onboarding.system.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminDashboardResponse
{
    private long totalEmployee;
    private long totalHR;
    private long totalAdmin;
}
