package com.onboarding.system.services;


import com.onboarding.system.dtos.UpdateUserRoleRequest;
import com.onboarding.system.dtos.UpdateUserStatusRequest;
import com.onboarding.system.dtos.UserRequest;
import com.onboarding.system.dtos.UserResponse;
import com.onboarding.system.exception.DuplicateResourceException;
import com.onboarding.system.exception.ResourceNotFoundException;
import com.onboarding.system.models.User;
import com.onboarding.system.repositories.RefreshTokenRepository;
import com.onboarding.system.repositories.UserRepository;
import com.onboarding.system.util.UserMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AdminService
{
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;


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

    public List<UserResponse> getAllUsers()
    {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    public UserResponse getUserById(UUID id)
    {

        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User Not Found"));
        return userMapper.toResponse(user);
    }

    public UserResponse updateUserStatus(UUID id , UpdateUserStatusRequest request)
    {
        User user = userRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        user.setActive(request.isActive());
        userRepository.save(user);
        return userMapper.toResponse(user);

    }

    public UserResponse updateUserRole(UUID id, UpdateUserRoleRequest request)
    {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User Not found"));
        user.setRole(request.getRole());
        userRepository.save(user);
        return userMapper.toResponse(user);
    }

    @Transactional
    public void deleteUser(UUID id)
    {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        refreshTokenRepository.deleteByUser(user);

        userRepository.delete(user);
    }

}
