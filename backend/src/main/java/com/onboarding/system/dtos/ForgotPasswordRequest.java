package com.onboarding.system.dtos;

import lombok.Data;

@Data
public class ForgotPasswordRequest
{
    private String token;
    private String password;
}
