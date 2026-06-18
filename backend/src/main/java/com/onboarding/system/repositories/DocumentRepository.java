package com.onboarding.system.repositories;

import com.onboarding.system.enums.DocumentStatus;
import com.onboarding.system.enums.DocumentType;
import com.onboarding.system.enums.EmployeeStatus;
import com.onboarding.system.models.Document;
import com.onboarding.system.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DocumentRepository extends JpaRepository<Document, UUID>
{
    long countByEmployeeId(UUID emp_id);
    long countByEmployeeIdAndStatus(UUID employeeId, DocumentStatus status);
    boolean existsByEmployeeId(UUID emp_id);
    Optional<Document> findByEmployeeAndDocumentType(Employee employee, DocumentType documentType);

    List<Document> findByEmployee(Employee employee);
    List<Document> findByStatus(DocumentStatus status);
}
