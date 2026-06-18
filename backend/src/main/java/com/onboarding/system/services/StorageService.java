package com.onboarding.system.services;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService
{
    String uploadFile(MultipartFile file);
    String generateSignedUrl(String objectName);
}
