package com.onboarding.system.dtos;

import com.onboarding.system.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PendingActionResponse
{
    private String title;
    private TaskStatus status;
}