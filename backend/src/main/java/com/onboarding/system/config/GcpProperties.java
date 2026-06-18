package com.onboarding.system.config;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "gcp")
@Component
@Getter
@Setter
public class GcpProperties {

    private String bucketName;
    private String credentialsLocation;
}