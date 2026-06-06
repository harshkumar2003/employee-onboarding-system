package com.onboarding.system.dtos;

import com.onboarding.system.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest
{
    private String email;
    private String password;
    private Role role;

}
