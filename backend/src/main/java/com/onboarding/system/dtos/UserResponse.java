package com.onboarding.system.dtos;

import com.onboarding.system.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class UserResponse
{
    private UUID id;
    private String email;
    private boolean isActive;
    private Role role;

}
