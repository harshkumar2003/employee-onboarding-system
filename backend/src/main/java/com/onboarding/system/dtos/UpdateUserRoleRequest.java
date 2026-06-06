package com.onboarding.system.dtos;

import com.onboarding.system.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserRoleRequest
{
    private Role role;
}
