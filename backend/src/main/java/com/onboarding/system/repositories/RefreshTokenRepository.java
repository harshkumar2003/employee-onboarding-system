package com.onboarding.system.repositories;

import com.onboarding.system.models.RefreshToken;
import com.onboarding.system.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository
        extends JpaRepository<RefreshToken, UUID>
{
    Optional<RefreshToken> findByToken(String token);

    void deleteByUser(User user);

}