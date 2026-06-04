package com.onboarding.system.controller;

import com.onboarding.system.dtos.LoginRequest;
import com.onboarding.system.dtos.LoginResponse;
import com.onboarding.system.dtos.RefreshTokenRequest;
import com.onboarding.system.dtos.RefreshTokenResponse;
import com.onboarding.system.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController
{
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    )
    {
        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refresh(
            @RequestBody RefreshTokenRequest request
    )
    {
        return ResponseEntity.ok(
                authService.refreshToken(request)
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestBody RefreshTokenRequest request
    )
    {
        authService.logout(request);

        return ResponseEntity.noContent().build();
    }
}