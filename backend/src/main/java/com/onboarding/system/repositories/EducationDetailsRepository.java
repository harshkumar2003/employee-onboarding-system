package com.onboarding.system.repositories;

import com.onboarding.system.enums.QualificationType;
import com.onboarding.system.models.EducationDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EducationDetailsRepository extends JpaRepository<EducationDetails, UUID>
{
    boolean existsByEmployeeId(UUID emp_id);
    boolean existsByQualification(QualificationType type);

    boolean existsByEmployeeIdAndQualification(UUID employeeId, QualificationType qualification);
}
