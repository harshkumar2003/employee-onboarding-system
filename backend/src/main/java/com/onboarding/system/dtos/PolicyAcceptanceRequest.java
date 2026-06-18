package com.onboarding.system.dtos;

import lombok.Data;

@Data
public class PolicyAcceptanceRequest
{
    private boolean ndaAccepted;

    private boolean companyPolicyAccepted;

    private boolean termsAccepted;
}
