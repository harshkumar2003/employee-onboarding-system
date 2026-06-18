package com.onboarding.system.services.impl;


import com.onboarding.system.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService
{

    private final JavaMailSender javaMailSender;
    @Override
    public void sendInvitationEmail(String email , String token)
    {
        String link = "http://localhost:5173/setup-password?token="+ token;
        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Account Setup");

        message.setText(
                "Welcome!\n\n" +
                        "Please setup your account:\n" +
                        link
        );

        javaMailSender.send(message);
    }



}
