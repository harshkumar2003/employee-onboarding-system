package com.onboarding.system.services;

import com.onboarding.system.config.JwtService;
import com.onboarding.system.dtos.LoginRequest;
import com.onboarding.system.dtos.LoginResponse;
import com.onboarding.system.dtos.RefreshTokenRequest;
import com.onboarding.system.dtos.RefreshTokenResponse;
import com.onboarding.system.exception.ResourceNotFoundException;
import com.onboarding.system.exception.UnauthorizedException;
import com.onboarding.system.models.RefreshToken;
import com.onboarding.system.models.User;
import com.onboarding.system.repositories.RefreshTokenRepository;
import com.onboarding.system.repositories.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService
{
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    @Transactional
    public LoginResponse login(LoginRequest request)
    {
        try
        {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        }
        catch (BadCredentialsException ex)
        {
            throw new UnauthorizedException(
                    "Invalid email or password"
            );
        }

        User user = userRepository.findByEmail(
                        request.getEmail()
                )
                .orElseThrow(()-> new ResourceNotFoundException("User Not found"));

        String accessToken =
                jwtService.generateAccessToken(user);

        String refreshTokenValue =
                UUID.randomUUID().toString();
        refreshTokenRepository.deleteByUser(user);
        refreshTokenRepository.flush();
        RefreshToken refreshToken =
                new RefreshToken();

        refreshToken.setUser(user);
        refreshToken.setToken(refreshTokenValue);
        refreshToken.setRevoked(false);
        refreshToken.setCreatedAt(LocalDateTime.now());
        refreshToken.setExpiryDate(
                LocalDateTime.now().plusDays(7)
        );
        refreshTokenRepository.save(refreshToken);

        return new LoginResponse(
                accessToken,
                refreshTokenValue
        );
    }

    public RefreshTokenResponse refreshToken(
            RefreshTokenRequest request
    ) {

        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByToken(
                                request.getRefreshToken()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Refresh token not found"
                                ));

        if (refreshToken.isRevoked()) {
            throw new UnauthorizedException(
                    "Refresh token revoked"
            );
        }

        if (refreshToken.getExpiryDate()
                .isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException(
                    "Refresh token expired"
            );
        }

        User user = refreshToken.getUser();

        String accessToken =
                jwtService.generateAccessToken(user);

        return new RefreshTokenResponse(
                accessToken
        );
    }

    public void logout(
            RefreshTokenRequest request
    ) {

        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByToken(
                                request.getRefreshToken()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Refresh token not found"
                                ));

        refreshToken.setRevoked(true);

        refreshTokenRepository.save(
                refreshToken
        );
    }


}