package com.onboarding.system.dtos;

import com.onboarding.system.enums.DocumentStatus;
import lombok.Data;

@Data
public class VerifyDocumentRequest
{
    private DocumentStatus status;
    private String remarks;
}
