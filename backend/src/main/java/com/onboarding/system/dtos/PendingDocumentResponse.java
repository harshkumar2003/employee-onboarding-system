package com.onboarding.system.dtos;

import com.onboarding.system.enums.DocumentStatus;
import com.onboarding.system.enums.DocumentType;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class PendingDocumentResponse
{
    private UUID documentId;
    private UUID employeeId;
    private String employeeName;
    private DocumentType documentType;
    private DocumentStatus status;
    private String fileUrl;
    private String remarks;
}
