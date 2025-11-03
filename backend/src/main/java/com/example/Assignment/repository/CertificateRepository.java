package com.example.Assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Assignment.model.Certificate;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    Certificate findByCertificateName(String name);
}
