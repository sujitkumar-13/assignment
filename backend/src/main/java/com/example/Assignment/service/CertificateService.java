package com.example.Assignment.service;

import com.example.Assignment.model.Certificate;
import com.example.Assignment.repository.CertificateRepository;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CertificateService {

    private final CertificateRepository repository;

    public CertificateService(CertificateRepository repository) {
        this.repository = repository;
    }

    public Certificate addCertificate(Certificate certificate) {
        // Default validFrom = today
        if (certificate.getValidFrom() == null) {
            certificate.setValidFrom(LocalDateTime.now());
        }

        // Default validTo = 1 year later
        if (certificate.getValidTo() == null) {
            certificate.setValidTo(LocalDateTime.now().plusYears(1));
        }

        // Validation check
        if (certificate.getValidTo().isBefore(certificate.getValidFrom())) {
            throw new IllegalArgumentException("Valid To date must be after Valid From date");
        }

        // Automatically set status
        if (certificate.getValidTo().isBefore(LocalDateTime.now())) {
            certificate.setStatus("EXPIRED");
        } else {
            certificate.setStatus("ACTIVE");
        }

        return repository.save(certificate);
    }

    public List<Certificate> getAllCertificates() {
        return repository.findAll();
    }

    public Certificate getCertificateById(@NonNull Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Certificate not found"));
    }

    public void deleteCertificate(@NonNull Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Certificate with ID " + id + " not found");
        }
        repository.deleteById(id);
    }
}
