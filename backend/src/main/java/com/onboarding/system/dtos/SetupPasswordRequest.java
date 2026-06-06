package com.onboarding.system.dtos;


import lombok.Data;

@Data
public class SetupPasswordRequest
{
    private String token;
    private String password;
}
