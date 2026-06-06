package com.onboarding.system.repositories;

import com.onboarding.system.models.PasswordSetupToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PasswordSetupRepository extends JpaRepository<PasswordSetupToken, UUID>
{
    Optional<PasswordSetupToken> findByToken(String token);
}
