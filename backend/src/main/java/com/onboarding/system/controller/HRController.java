package com.onboarding.system.controller;

import com.onboarding.system.dtos.CreateEmployeeRequest;
import com.onboarding.system.services.HRService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/hr")
@AllArgsConstructor
public class HRController
{
    private final HRService hrService;

    @PostMapping("/employees")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<String> createEmployee(@RequestBody CreateEmployeeRequest request)
    {

        hrService.createEmployee(request);
        return ResponseEntity.ok("Email Invitation Sent to Employee");

    }
}
