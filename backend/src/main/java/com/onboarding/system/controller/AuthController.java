package com.onboarding.system.controller;

import com.onboarding.system.dtos.*;
import com.onboarding.system.enums.Role;
import com.onboarding.system.models.User;
import com.onboarding.system.repositories.UserRepository;
import com.onboarding.system.services.AuthService;
import com.onboarding.system.services.EmailService;
import com.onboarding.system.services.HRService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController
{
    private final AuthService authService;
    private final HRService hrService;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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

    @GetMapping("/test-mail")
    public String testMail() {
        emailService.sendInvitationEmail(
                "yourtestemail@gmail.com",
                "test-token"
        );
        return "Mail Sent";
    }

}