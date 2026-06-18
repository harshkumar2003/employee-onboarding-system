package com.onboarding.system.repositories;

import com.onboarding.system.enums.EmployeeStatus;
import com.onboarding.system.models.Employee;
import com.onboarding.system.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee , UUID>
{

    Optional<Employee> findByUser(User user);
    long countByStatus(EmployeeStatus status);
    long countByStatusIn(List<EmployeeStatus> statuses);
}
