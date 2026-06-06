package com.onboarding.system.services;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService
{

    private final JavaMailSender javaMailSender;

    public void sendInvitationEmail(String email , String token)
    {
        String link = "http://localhost:3000/setup-password?token="+ token;
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
