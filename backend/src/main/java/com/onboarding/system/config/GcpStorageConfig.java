package com.onboarding.system.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class GcpStorageConfig
{
    private final GcpProperties gcpProperties;

    @Bean
    public Storage storage() throws IOException
    {
        Resource resource = new ClassPathResource(gcpProperties.getCredentialsLocation());

        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
        return StorageOptions.newBuilder()
                .setCredentials(credentials)
                .build().getService();

    }

}
