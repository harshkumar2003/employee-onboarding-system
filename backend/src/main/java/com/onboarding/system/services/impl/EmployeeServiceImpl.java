package com.onboarding.system.services.impl;

import com.onboarding.system.config.SecurityUtils;
import com.onboarding.system.dtos.*;
import com.onboarding.system.enums.DocumentStatus;
import com.onboarding.system.enums.DocumentType;
import com.onboarding.system.enums.EmployeeStatus;
import com.onboarding.system.enums.TaskStatus;
import com.onboarding.system.exception.BadRequestException;
import com.onboarding.system.exception.DuplicateResourceException;
import com.onboarding.system.models.*;
import com.onboarding.system.repositories.*;
import com.onboarding.system.services.EmployeeService;
import com.onboarding.system.services.StorageService;
import com.onboarding.system.util.ProfileCompletionHelper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService
{

    private final PersonalDetailsRepository personalDetailsRepository;
    private final EmployeeRepository employeeRepository;
    private final EmployeeExperienceRepository employeeExperienceRepository;
    private final BankDetailsRepository bankDetailsRepository;
    private final SecurityUtils securityUtils;
    private final StorageService storageService;
    private final DocumentRepository documentRepository;
    private final PolicyAcceptanceRepository policyAcceptanceRepository;
    private final ProfileCompletionHelper profileCompletionHelper;
    private final EducationDetailsRepository educationDetailsRepository;

    @Override
    @Transactional
    public void savePersonalDetails(PersonalDetailsRequest request)
    {
        Employee employee = securityUtils.getCurrentEmployee();

        PersonalDetails personalDetails = personalDetailsRepository.findByEmployee(employee)
                .orElse(new PersonalDetails());

        personalDetails.setEmployee(employee);
        personalDetails.setDob(request.getDob());
        personalDetails.setAddressLine1(request.getAddressLine1());
        personalDetails.setAddressLine2(request.getAddressLine2());
        personalDetails.setState(request.getState());
        personalDetails.setCity(request.getCity());
        personalDetails.setCountry(request.getCountry());
        personalDetails.setPostalCode(request.getPostalCode());
        personalDetails.setEmergencyContactNumber(request.getEmergencyContactNumber());
        personalDetails.setStatus(EmployeeStatus.PROFILE_COMPLETED);
        personalDetailsRepository.save(personalDetails);
        employee.setYearsOfExperience(request.getYearsOfExperience());
        if(employee.getYearsOfExperience() > 0)
        {
            employee.setStatus(EmployeeStatus.EXPERIENCE_PENDING);
        }
        else
        {
            employee.setStatus(EmployeeStatus.EDUCATION_PENDING);
        }

        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public void saveEducationDetails(EducationDetailsRequest request)
    {
        Employee employee = securityUtils.getCurrentEmployee();

        boolean alreadyExists = educationDetailsRepository.existsByEmployeeIdAndQualification(employee.getId(),request.getQualification());
        if (alreadyExists) {
            throw new DuplicateResourceException("This Qualification is Already Added");
        }

        EducationDetails educationDetails = EducationDetails.builder()
                .employee(employee)
                .qualification(request.getQualification())
                .institutionName(request.getInstitutionName())
                .boardUniversity(request.getBoardUniversity())
                .specialization(request.getSpecialization())
                .passingYear(request.getPassingYear())
                .percentageCgpa(request.getPercentageCgpa())
                .build();

        educationDetailsRepository.save(educationDetails);

        employee.setStatus(EmployeeStatus.BANK_DETAILS_PENDING);
        employeeRepository.save(employee);
    }


    @Override
    @Transactional
    public void saveExperience(ExperienceRequest request)
    {
        Employee employee = securityUtils.getCurrentEmployee();
        if(!request.isCurrentlyWorking()
                && request.getEndDate() == null)
        {
            throw new BadRequestException("End date is required");
        }
        EmployeeExperience experience = EmployeeExperience.builder()
                            .employee(employee)
                            .companyName(request.getCompanyName())
                            .designation(request.getDesignation())
                            .startDate(request.getStartDate())
                            .endDate(request.isCurrentlyWorking() ? null : request.getEndDate())
                            .currentlyWorking(request.isCurrentlyWorking())
                            .location(request.getLocation())
                            .build();

        employeeExperienceRepository.save(experience);
        employee.setStatus(EmployeeStatus.BANK_DETAILS_PENDING);
        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public void saveBankDetails(BankDetailsRequest request)
    {
        Employee employee =
                securityUtils.getCurrentEmployee();

        BankDetails bankDetails =
                bankDetailsRepository
                        .findByEmployee(employee)
                        .orElse(new BankDetails());

        bankDetails.setEmployee(employee);
        bankDetails.setAccountHolderName(request.getAccountHolderName());
        bankDetails.setAccountNumber(request.getAccountNumber());
        bankDetails.setIfscCode(request.getIfscCode());
        bankDetails.setBankName(request.getBankName());

        bankDetailsRepository.save(bankDetails);

        employee.setStatus(EmployeeStatus.DOCUMENTS_PENDING);

        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public void saveDocument(DocumentType documentType , MultipartFile multipartFile)
    {
        Employee employee = securityUtils.getCurrentEmployee();

        String objectName = storageService.uploadFile(multipartFile);

        Document document = Document.builder()
                .employee(employee)
                .documentType(documentType)
                .objectName(objectName)
                .status(DocumentStatus.PENDING)
                .build();
        documentRepository.save(document);
    }

    @Override
    @Transactional
    public void acceptPolicies(PolicyAcceptanceRequest request)
    {
        Employee employee = securityUtils.getCurrentEmployee();

        PolicyAcceptance policyAcceptance = policyAcceptanceRepository.findByEmployee(employee)
                        .orElse(new PolicyAcceptance());

        policyAcceptance.setEmployee(employee);

        policyAcceptance.setNdaAccepted(request.isNdaAccepted());

        policyAcceptance.setCompanyPolicyAccepted(request.isCompanyPolicyAccepted());

        policyAcceptance.setTermsAccepted(request.isTermsAccepted());

        policyAcceptanceRepository.save(policyAcceptance);
        if(!request.isNdaAccepted() || !request.isCompanyPolicyAccepted()
                || !request.isTermsAccepted())
        {
            throw new BadRequestException("All policies must be accepted");
        }

        employee.setStatus(EmployeeStatus.ONBOARDED);

        employeeRepository.save(employee);


    }


    private boolean areAllDocumentsApproved(Employee employee)
    {
        List<DocumentType> requiredDocuments = List.of(
                DocumentType.AADHAR,
                DocumentType.PAN,
                DocumentType.PHOTO,
                DocumentType.RESUME,
                DocumentType.TWELFTH,
                DocumentType.TENTH,
                DocumentType.DEGREE_CERTIFICATE
        );

        for (DocumentType type : requiredDocuments)
        {
            Optional<Document> document =
                    documentRepository.findByEmployeeAndDocumentType(
                            employee,
                            type
                    );

            if(document.isEmpty())
            {
                return false;
            }

            if(document.get().getStatus() != DocumentStatus.APPROVED)
            {
                return false;
            }
        }

        return true;
    }

    @Transactional
    @Override
    public void profileUpdate(Employee employee)
    {
        if(areAllDocumentsApproved(employee))
        {
                employee.setStatus(EmployeeStatus.DOCUMENTS_APPROVED);
                employeeRepository.save(employee);
        }
    }


    private List<PendingActionResponse> getPendingActions(Employee employee) {

        List<PendingActionResponse> actions = new ArrayList<>();

        boolean personalCompleted =
                personalDetailsRepository.existsByEmployeeId(employee.getId());

        boolean experienceRequired =
                employee.getYearsOfExperience() != null
                        && employee.getYearsOfExperience() > 0;

        boolean experienceCompleted =
                employeeExperienceRepository.existsByEmployeeId(employee.getId());

        boolean educationCompleted =
                educationDetailsRepository.existsByEmployeeId(employee.getId());

        boolean bankCompleted =
                bankDetailsRepository.existsByEmployeeId(employee.getId());

        boolean documentsCompleted =
                areAllDocumentsApproved(employee);

        boolean policyCompleted =
                policyAcceptanceRepository.existsByEmployeeId(employee.getId());

        // Unlock Conditions
        boolean experienceUnlocked =
                personalCompleted;

        boolean educationUnlocked =
                personalCompleted &&
                        (!experienceRequired || experienceCompleted);

        boolean bankUnlocked =
                educationCompleted;

        boolean documentsUnlocked =
                bankCompleted;

        boolean policyUnlocked =
                documentsCompleted;

        // Personal Details
        actions.add(
                PendingActionResponse.builder()
                        .title("Personal Details")
                        .status(
                                personalCompleted
                                        ? TaskStatus.COMPLETED
                                        : TaskStatus.PENDING
                        )
                        .build()
        );

        // Experience Details (Only for experienced employees)
        if (experienceRequired) {
            actions.add(
                    PendingActionResponse.builder()
                            .title("Experience Details")
                            .status(
                                    !experienceUnlocked
                                            ? TaskStatus.LOCKED
                                            : experienceCompleted
                                            ? TaskStatus.COMPLETED
                                            : TaskStatus.PENDING
                            )
                            .build()
            );
        }

        // Education Details
        actions.add(
                PendingActionResponse.builder()
                        .title("Education Details")
                        .status(
                                !educationUnlocked
                                        ? TaskStatus.LOCKED
                                        : educationCompleted
                                        ? TaskStatus.COMPLETED
                                        : TaskStatus.PENDING
                        )
                        .build()
        );

        // Bank Details
        actions.add(
                PendingActionResponse.builder()
                        .title("Bank Details")
                        .status(
                                !bankUnlocked
                                        ? TaskStatus.LOCKED
                                        : bankCompleted
                                        ? TaskStatus.COMPLETED
                                        : TaskStatus.PENDING
                        )
                        .build()
        );

        // Documents Upload
        actions.add(
                PendingActionResponse.builder()
                        .title("Documents Upload")
                        .status(
                                !documentsUnlocked
                                        ? TaskStatus.LOCKED
                                        : documentsCompleted
                                        ? TaskStatus.COMPLETED
                                        : TaskStatus.PENDING
                        )
                        .build()
        );

        // Policy Acceptance
        actions.add(
                PendingActionResponse.builder()
                        .title("Policy Acceptance")
                        .status(
                                !policyUnlocked
                                        ? TaskStatus.LOCKED
                                        : policyCompleted
                                        ? TaskStatus.COMPLETED
                                        : TaskStatus.PENDING
                        )
                        .build()
        );

        return actions;
    }

    @Override
    public EmployeeDashboardResponse getEmployeeDashboardStats()
    {
        Employee employee = securityUtils.getCurrentEmployee();
        long profileCompletion = profileCompletionHelper.getProfileCompletion(employee.getStatus());
        long documentsUpload = documentRepository.countByEmployeeId(employee.getId());

        long verifiedDocuments = documentRepository.countByEmployeeIdAndStatus(employee.getId(),DocumentStatus.APPROVED);
        long totalTask = 5;
        if(employee.getYearsOfExperience()>0)
        {
            totalTask = 6;
        }
        long taskCompleted = 0;
        if(personalDetailsRepository.existsByEmployeeId(employee.getId()))
        {
            taskCompleted++;
        }
        if(employee.getYearsOfExperience()>0)
        {
            if(employeeExperienceRepository.existsByEmployeeId(employee.getId()))
            {
                taskCompleted++;
            }
        }
        if(educationDetailsRepository.existsByEmployeeId(employee.getId()))
        {
            taskCompleted++;
        }
        if(bankDetailsRepository.existsByEmployeeId(employee.getId()))
        {
            taskCompleted++;
        }
        if(documentRepository.countByEmployeeIdAndStatus(employee.getId(),DocumentStatus.APPROVED)==7)
        {
            taskCompleted++;
        }
        if(employee.getStatus()==EmployeeStatus.POLICY_ACCEPTED ||
        employee.getStatus() == EmployeeStatus.ONBOARDED)
        {
            taskCompleted++;
        }


        List<DocumentStatusResponse> documentStatuses = documentRepository.findByEmployee(employee)
                .stream()
                .map(document -> DocumentStatusResponse.builder()
                        .documentType(document
                                .getDocumentType())
                        .status(document.getStatus())
                        .build()).toList();


        return EmployeeDashboardResponse.builder()
                .profileCompletion(profileCompletion)
                .documentsUpload(documentsUpload)
                .verifiedDocuments(verifiedDocuments)
                .onboardingTask(taskCompleted)
                .totalTask(totalTask)
                .pendingActions(getPendingActions(employee))
                .documentStatus(documentStatuses)
                .build();
    }



}
