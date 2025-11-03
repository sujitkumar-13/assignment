package com.example.Assignment.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
public class SignedFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String certificateUsed;
    private String status = "SIGNED";
    private LocalDateTime signedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getCertificateUsed() { return certificateUsed; }
    public void setCertificateUsed(String certificateUsed) { this.certificateUsed = certificateUsed; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getSignedAt() { return signedAt; }
    public void setSignedAt(LocalDateTime signedAt) { this.signedAt = signedAt; }
}
