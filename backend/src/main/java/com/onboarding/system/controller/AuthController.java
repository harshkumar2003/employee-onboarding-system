package com.onboarding.system.controller;

import com.onboarding.system.dtos.*;
import com.onboarding.system.repositories.UserRepository;
import com.onboarding.system.services.AuthService;
import com.onboarding.system.services.HRService;
import com.onboarding.system.services.impl.AuthServiceImpl;
import com.onboarding.system.services.impl.EmailServiceImpl;
import com.onboarding.system.services.impl.HRServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController
{
    private final AuthService authService;
    private final HRService hrService;


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
    @PostMapping("/setup-password")
    public ResponseEntity<Void> setupPassword(
            @RequestBody SetupPasswordRequest request)
    {
        hrService.setupPassword(request);

        return ResponseEntity.ok().build();
    }



}