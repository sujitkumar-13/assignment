package com.example.Assignment.service;

import com.example.Assignment.model.*;
import com.example.Assignment.repository.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SignedFileService {

    private final SignedFileRepository signedRepo;
    private final CertificateRepository certRepo;

    public SignedFileService(SignedFileRepository signedRepo, CertificateRepository certRepo) {
        this.signedRepo = signedRepo;
        this.certRepo = certRepo;
    }

    public SignedFile signFile(String fileName, String certificateName) {
        Certificate cert = certRepo.findByCertificateName(certificateName);
        if (cert == null || !"ACTIVE".equals(cert.getStatus())) {
            throw new IllegalArgumentException("Certificate not found or not active");
        }

        SignedFile file = new SignedFile();
        file.setFileName(fileName);
        file.setCertificateUsed(certificateName);
        file.setSignedAt(LocalDateTime.now());
        return signedRepo.save(file);
    }

    public List<SignedFile> getAllSignedFiles() {
        return signedRepo.findAll();
    }
}
