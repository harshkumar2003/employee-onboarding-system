package com.onboarding.system.dtos;

import lombok.Data;

@Data
public class BankDetailsRequest
{
    private String accountHolderName;

    private String accountNumber;

    private String ifscCode;

    private String bankName;

}
