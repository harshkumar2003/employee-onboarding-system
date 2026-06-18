package com.onboarding.system.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "policy_acceptance")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PolicyAcceptance
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private boolean ndaAccepted;

    private boolean companyPolicyAccepted;

    private boolean termsAccepted;

    private LocalDateTime acceptedAt;

    @PrePersist
    public void onCreate()
    {
        acceptedAt = LocalDateTime.now();
    }
}