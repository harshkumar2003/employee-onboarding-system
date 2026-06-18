package com.onboarding.system.models;

import com.onboarding.system.enums.DocumentStatus;
import com.onboarding.system.enums.DocumentType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "documents")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Document
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    @Column(nullable = false)
    private String objectName;

    @Enumerated(EnumType.STRING)
    private DocumentStatus status;

    private String remarks;

    private UUID verifiedBy;

    private LocalDateTime verifiedAt;

    private LocalDateTime uploadedAt;

    @PrePersist
    public void onCreate()
    {
        uploadedAt = LocalDateTime.now();
    }

}