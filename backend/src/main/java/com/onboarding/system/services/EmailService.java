package com.onboarding.system.services;

public interface EmailService
{
    void sendInvitationEmail(String email, String token);
}