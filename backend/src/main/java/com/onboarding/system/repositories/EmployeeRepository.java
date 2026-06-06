package com.onboarding.system.repositories;

import com.onboarding.system.models.Employee;
import com.onboarding.system.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee , UUID>
{

    Optional<Employee> findByUser(User user);
}
