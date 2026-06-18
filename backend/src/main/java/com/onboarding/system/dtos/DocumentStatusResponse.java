package com.onboarding.system.dtos;

import com.onboarding.system.enums.DocumentStatus;
import com.onboarding.system.enums.DocumentType;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DocumentStatusResponse
{
    private DocumentType documentType;
    private DocumentStatus status;
}
