package com.onboarding.system.repositories;

import com.onboarding.system.models.Employee;
import com.onboarding.system.models.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails , UUID>
{

    Optional<PersonalDetails> findByEmployee(Employee employee);
    boolean existsByEmployeeId(UUID emp_id);
}
