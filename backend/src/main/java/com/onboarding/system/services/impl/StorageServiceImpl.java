package com.onboarding.system.services.impl;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.onboarding.system.config.GcpProperties;
import com.onboarding.system.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {

    private final Storage storage;
    private final GcpProperties gcpProperties;

    @Override
    public String uploadFile(MultipartFile file) {

        try {

            String fileName =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            BlobInfo blobInfo = BlobInfo.newBuilder(
                            gcpProperties.getBucketName(),
                            fileName)
                    .setContentType(file.getContentType())
                    .build();

            storage.create(blobInfo, file.getBytes());

            return fileName;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to GCP Storage", e);
        }
    }

    @Override
    public String generateSignedUrl(String objectName) {

        BlobInfo blobInfo = BlobInfo.newBuilder(
                gcpProperties.getBucketName(),
                objectName
        ).build();

        URL signedUrl = storage.signUrl(
                blobInfo,
                15,
                TimeUnit.MINUTES,
                Storage.SignUrlOption.withV4Signature()
        );

        return signedUrl.toString();
    }
}