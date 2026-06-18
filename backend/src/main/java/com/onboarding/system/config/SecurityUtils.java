package com.onboarding.system.config;


import com.onboarding.system.exception.ResourceNotFoundException;
import com.onboarding.system.models.Employee;
import com.onboarding.system.models.User;
import com.onboarding.system.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtils
{
    private final EmployeeRepository employeeRepository;

    public User getCurrentUser()
    {
        return (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    public Employee getCurrentEmployee()
    {
        User user = getCurrentUser();

        return employeeRepository.findByUser(user)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found"));
    }
}
