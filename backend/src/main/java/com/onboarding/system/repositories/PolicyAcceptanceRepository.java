package com.onboarding.system.repositories;

import com.onboarding.system.models.Employee;
import com.onboarding.system.models.PolicyAcceptance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PolicyAcceptanceRepository extends JpaRepository<PolicyAcceptance , UUID>
{
    Optional<PolicyAcceptance> findByEmployee(Employee employee);
    boolean existsByEmployeeId(UUID emp_id);
}
