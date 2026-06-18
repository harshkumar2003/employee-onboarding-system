package com.onboarding.system.services;

import com.onboarding.system.dtos.*;

public interface AuthService
{
    LoginResponse login(LoginRequest request);

    RefreshTokenResponse refreshToken(
            RefreshTokenRequest request
    );

    void logout(
            RefreshTokenRequest request
    );
}