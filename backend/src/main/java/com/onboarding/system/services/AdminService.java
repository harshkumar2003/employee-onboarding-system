package com.onboarding.system.services;

import com.onboarding.system.dtos.*;
import java.util.List;
import java.util.UUID;

public interface AdminService
{
    UserResponse createUser(UserRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(UUID id);

    UserResponse updateUserStatus(UUID id, UpdateUserStatusRequest request);

    UserResponse updateUserRole(UUID id, UpdateUserRoleRequest request);

    void deleteUser(UUID id);

    AdminDashboardResponse getDashboardStats();

}