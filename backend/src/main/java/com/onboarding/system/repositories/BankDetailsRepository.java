package com.onboarding.system.repositories;

import com.onboarding.system.models.BankDetails;
import com.onboarding.system.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;
import java.util.UUID;

public interface BankDetailsRepository extends JpaRepository<BankDetails , UUID>
{

    Optional<BankDetails> findByEmployee(Employee employee);
    boolean existsByEmployeeId(UUID emp_id);
}
