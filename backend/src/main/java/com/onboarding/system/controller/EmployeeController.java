package com.onboarding.system.controller;


import com.onboarding.system.dtos.*;
import com.onboarding.system.enums.DocumentType;
import com.onboarding.system.models.PersonalDetails;
import com.onboarding.system.services.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/employee")
@RequiredArgsConstructor
public class EmployeeController
{
    private final EmployeeService employeeService;

    @PostMapping("/personal-details")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> savePersonalDetails(@RequestBody PersonalDetailsRequest request)
    {
        employeeService.savePersonalDetails(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Personal Details Added");
    }

    @PostMapping("/education-details")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> saveEducationDetails(@RequestBody EducationDetailsRequest request)
    {
        employeeService.saveEducationDetails(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Education details added");
    }

    @PostMapping("/experience")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> saveExperience(@RequestBody ExperienceRequest request)
    {
        employeeService.saveExperience(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Experience added");
    }

    @PostMapping("/bank-details")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> saveBankDetails(@RequestBody BankDetailsRequest request)
    {
        employeeService.saveBankDetails(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Bank details added");
    }

    @PostMapping(value = "/documents", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> saveDocument(@RequestParam("documentType") DocumentType documentType,
                                          @RequestPart("file") MultipartFile file)
    {
        employeeService.saveDocument(documentType, file);
        return ResponseEntity.status(HttpStatus.CREATED).body("Documents added");
    }

    @PostMapping("/policy-acceptance")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> acceptPolicies(@RequestBody PolicyAcceptanceRequest request)
    {
        employeeService.acceptPolicies(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Policy Accepted");
    }

    @GetMapping("/dashboard/stats")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<EmployeeDashboardResponse> getEmployeeDashboardStats()
    {
        return ResponseEntity.ok(employeeService.getEmployeeDashboardStats());
    }

}
