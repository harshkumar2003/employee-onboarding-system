package com.onboarding.system.services.impl;


import com.onboarding.system.config.SecurityUtils;
import com.onboarding.system.dtos.*;
import com.onboarding.system.enums.DocumentStatus;
import com.onboarding.system.enums.EmployeeStatus;
import com.onboarding.system.enums.Role;
import com.onboarding.system.enums.TokenType;
import com.onboarding.system.exception.ResourceNotFoundException;
import com.onboarding.system.models.Document;
import com.onboarding.system.models.Employee;
import com.onboarding.system.models.PasswordSetupToken;
import com.onboarding.system.models.User;
import com.onboarding.system.repositories.DocumentRepository;
import com.onboarding.system.repositories.EmployeeRepository;
import com.onboarding.system.repositories.PasswordSetupRepository;
import com.onboarding.system.repositories.UserRepository;
import com.onboarding.system.services.EmployeeService;
import com.onboarding.system.services.HRService;
import com.onboarding.system.services.StorageService;
import com.onboarding.system.util.UserMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HRServiceImpl implements HRService
{
    private final PasswordSetupRepository passwordSetupRepository;
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final EmailServiceImpl emailServiceImpl;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final SecurityUtils securityUtils;
    private final DocumentRepository documentRepository;
    private final StorageService storageService;
    private final EmployeeService employeeService;

    @Override
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
                .yearsOfExperience(0)
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

        emailServiceImpl.sendInvitationEmail(user.getEmail(), tokenValue);
    }

    @Override
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
            throw new IllegalArgumentException("Token expired");
        }

        User user = token.getUser();

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);
        userRepository.save(user);

        token.setUsed(true);
        passwordSetupRepository.save(token);

        Employee employee = employeeRepository.findByUser(user)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));

        employee.setStatus(EmployeeStatus.ACCOUNT_CREATED);

        employeeRepository.save(employee);
    }

    @Override
    public List<EmployeeResponse> getAllEmployee()
    {
        return employeeRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }
    @Override
    public EmployeeResponse getEmployeeById(UUID id)
    {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee Not Found"));

        return userMapper.toResponse(employee);
    }

    @Override
    public HrDashboardResponse getDashboardStats()
    {
        long totalEmployees = employeeRepository.count();

        long pendingVerifications =
                employeeRepository.countByStatusIn(
                        List.of(
                                EmployeeStatus.DOCUMENTS_SUBMITTED
                        ));
        long completedOnboarding = employeeRepository.countByStatus(EmployeeStatus.ONBOARDED);

        long activeOnboardees =
                employeeRepository.countByStatusIn(
                        List.of(
                                EmployeeStatus.INVITED,
                                EmployeeStatus.ACCOUNT_CREATED,
                                EmployeeStatus.PROFILE_PENDING,
                                EmployeeStatus.PROFILE_COMPLETED,
                                EmployeeStatus.DOCUMENTS_PENDING,
                                EmployeeStatus.DOCUMENTS_SUBMITTED,
                                EmployeeStatus.DOCUMENTS_REJECTED,
                                EmployeeStatus.DOCUMENTS_APPROVED
                        ));


        return HrDashboardResponse.builder()
                .totalEmployees(totalEmployees)
                .pendingVerifications(pendingVerifications)
                .activeOnboardees(activeOnboardees)
                .completedOnboarding(completedOnboarding)
                .build();
    }

    @Override
    public List<PendingDocumentResponse> getPendingDocuments()
    {
       return documentRepository.findByStatus(DocumentStatus.PENDING)
               .stream()
               .map(document -> PendingDocumentResponse.builder()
                       .documentId(document.getId())
                       .employeeId(document.getEmployee().getId())
                       .employeeName(document.getEmployee().getFullName())
                       .documentType(document.getDocumentType())
                       .status(document.getStatus())
                       .fileUrl(storageService.generateSignedUrl(document.getObjectName()))
                       .remarks(document.getRemarks()).build()).toList();

    }




    @Override
    public void approveDocuments(UUID id , ApproveDocumentsRequest request)
    {
        User user = securityUtils.getCurrentUser();
        Document document = documentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Document Not found"));

        document.setStatus(request.getStatus());
        document.setVerifiedBy(user.getId());
        document.setVerifiedAt(LocalDateTime.now());

        documentRepository.save(document);

        Employee employee = document.getEmployee();

        employeeService.profileUpdate(employee);


    }
}
