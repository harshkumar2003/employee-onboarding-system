package com.onboarding.system.controller;

import com.onboarding.system.dtos.CreateEmployeeRequest;
import com.onboarding.system.dtos.EmployeeResponse;
import com.onboarding.system.services.HRService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @GetMapping("/employees")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployee()
    {
        return ResponseEntity.ok(hrService.getAllEmployee());
    }

    @GetMapping("/employees/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable UUID id)
    {
        return ResponseEntity.ok(hrService.getEmployeeById(id));
    }
}
