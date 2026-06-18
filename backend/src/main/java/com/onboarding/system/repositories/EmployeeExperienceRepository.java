package com.onboarding.system.repositories;

import com.onboarding.system.models.EmployeeExperience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployeeExperienceRepository extends JpaRepository<EmployeeExperience, UUID>
{
    boolean existsByEmployeeId(UUID emp_id);
}
