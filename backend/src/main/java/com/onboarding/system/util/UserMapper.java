package com.onboarding.system.util;

import com.onboarding.system.dtos.UserResponse;
import com.onboarding.system.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper
{
    public UserResponse toResponse(User user)
    {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.isActive(),
                user.getRole()
        );
    }
}
