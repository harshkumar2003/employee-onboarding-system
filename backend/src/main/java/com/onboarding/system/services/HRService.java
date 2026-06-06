package com.onboarding.system.services;


import com.onboarding.system.dtos.CreateEmployeeRequest;
import com.onboarding.system.dtos.SetupPasswordRequest;
import com.onboarding.system.enums.EmployeeStatus;
import com.onboarding.system.enums.Role;
import com.onboarding.system.enums.TokenType;
import com.onboarding.system.models.Employee;
import com.onboarding.system.models.PasswordSetupToken;
import com.onboarding.system.models.User;
import com.onboarding.system.repositories.EmployeeRepository;
import com.onboarding.system.repositories.PasswordSetupRepository;
import com.onboarding.system.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HRService
{
    private final PasswordSetupRepository passwordSetupRepository;
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createEmployee(CreateEmployeeRequest request)
    {
        User user = User.builder()
                .email(request.getEmail())
                .password(UUID.randomUUID().toString())
                .role(Role.EMPLOYEE)
                .isActive(false)
                .build();

        userRepository.save(user);

        Employee employee = Employee.builder()
                .fullName(request.getFullName())
                .user(user)
                .phoneNo(request.getPhoneNumber())
                .joiningDate(request.getJoiningDate())
                .status(EmployeeStatus.INVITED)
                .build();

        employeeRepository.save(employee);

        String tokenValue = UUID.randomUUID().toString();

        PasswordSetupToken passwordSetupToken = PasswordSetupToken.builder()
                .token(tokenValue)
                .user(user)
                .tokenType(TokenType.ACCOUNT_SETUP)
                .expiresAt(LocalDateTime.now().plusDays(7))
                .used(false)
                .build();

        passwordSetupRepository.save(passwordSetupToken);

        emailService.sendInvitationEmail(user.getEmail(), tokenValue);
    }


    @Transactional
    public void setupPassword(SetupPasswordRequest request)
    {
        PasswordSetupToken token = passwordSetupRepository.findByToken(request.getToken())
                .orElseThrow(()-> new RuntimeException("Invalid token"));

        if(token.isUsed())
        {
            throw new RuntimeException("Token already used");
        }

        if(token.getExpiresAt().isBefore(LocalDateTime.now()))
        {
            throw new RuntimeException("Token expired");
        }

        User user = token.getUser();

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);
        userRepository.save(user);

        token.setUsed(true);
        passwordSetupRepository.save(token);

        Employee employee = employeeRepository.findByUser(user)
                .orElseThrow(()->new RuntimeException("User not found"));

        employee.setStatus(EmployeeStatus.ACCOUNT_CREATED);

        employeeRepository.save(employee);
    }

}
