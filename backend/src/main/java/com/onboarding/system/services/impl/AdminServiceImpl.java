package com.onboarding.system.services.impl;


import com.onboarding.system.dtos.*;
import com.onboarding.system.enums.EmployeeStatus;
import com.onboarding.system.enums.Role;
import com.onboarding.system.exception.DuplicateResourceException;
import com.onboarding.system.exception.ResourceNotFoundException;
import com.onboarding.system.models.Employee;
import com.onboarding.system.models.User;
import com.onboarding.system.repositories.EmployeeRepository;
import com.onboarding.system.repositories.RefreshTokenRepository;
import com.onboarding.system.repositories.UserRepository;
import com.onboarding.system.services.AdminService;
import com.onboarding.system.util.UserMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService
{
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmployeeRepository employeeRepository;

    @Override
    public UserResponse createUser(UserRequest request)
    {

        User user = new User();
        if(userRepository.existsByEmail(request.getEmail()))
        {
            throw new DuplicateResourceException("Email already exists");
        }
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setActive(true);

        User savedUser = userRepository.save(user);
        return userMapper.toResponse(savedUser);
    }
    @Override
    public List<UserResponse> getAllUsers()
    {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }
    @Override
    public UserResponse getUserById(UUID id)
    {

        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User Not Found"));
        return userMapper.toResponse(user);
    }
    @Override
    public UserResponse updateUserStatus(UUID id , UpdateUserStatusRequest request)
    {
        User user = userRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        user.setActive(request.isActive());
        userRepository.save(user);
        return userMapper.toResponse(user);

    }
    @Override
    public UserResponse updateUserRole(UUID id, UpdateUserRoleRequest request)
    {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User Not found"));
        Optional<Employee> employeeOpt =
                employeeRepository.findByUser(user);

        if (employeeOpt.isPresent()) {

            Employee employee = employeeOpt.get();

            if (!employee.getStatus().equals(EmployeeStatus.ONBOARDED)
                    && user.isActive()) {

                throw new IllegalArgumentException(
                        "Employee is not onboarded yet");
            }
        }

        user.setRole(request.getRole());

        userRepository.save(user);
        return userMapper.toResponse(user);
    }
    @Override
    @Transactional
    public void deleteUser(UUID id)
    {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        refreshTokenRepository.deleteByUser(user);

        userRepository.delete(user);
    }

    @Override
    public AdminDashboardResponse getDashboardStats()
    {
        long totalEmployees = userRepository.count();
        long totalHR = userRepository.countByRole(Role.HR);
        long totalAdmin = userRepository.countByRole(Role.ADMIN);

        return AdminDashboardResponse.builder()
                .totalEmployee(totalEmployees)
                .totalHR(totalHR)
                .totalAdmin(totalAdmin)
                .build();
    }

}
