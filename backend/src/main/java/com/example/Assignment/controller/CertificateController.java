package com.example.Assignment.controller;

import com.example.Assignment.model.Certificate;
import com.example.Assignment.service.CertificateService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin
public class CertificateController {

    private final CertificateService service;

    public CertificateController(CertificateService service) {
        this.service = service;
    }

    @PostMapping
    public Certificate create(@RequestBody Certificate certificate) {
        return service.addCertificate(certificate);
    }

    @GetMapping
    public List<Certificate> getAll() {
        return service.getAllCertificates();
    }
}
