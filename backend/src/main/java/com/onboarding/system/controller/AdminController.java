package com.onboarding.system.controller;

import com.onboarding.system.dtos.UpdateUserRoleRequest;
import com.onboarding.system.dtos.UpdateUserStatusRequest;
import com.onboarding.system.dtos.UserRequest;
import com.onboarding.system.dtos.UserResponse;
import com.onboarding.system.models.User;
import com.onboarding.system.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController
{
    private final AdminService adminService;

    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest request)
    {
        return ResponseEntity.ok(adminService.createUser(request));
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers()
    {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID id)
    {
        return ResponseEntity.ok(adminService.getUserById(id));
    }

    @PostMapping("/users/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateUserStatus(@PathVariable UUID id , @RequestBody UpdateUserStatusRequest request)
    {
        return ResponseEntity.ok(adminService.updateUserStatus(id,request));
    }

    @PostMapping("/users/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateUserRole(@PathVariable UUID id, @RequestBody UpdateUserRoleRequest request)
    {
        return ResponseEntity.ok(adminService.updateUserRole(id,request));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable UUID id)
    {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User Deleted");
    }


}
