package com.example.Assignment.controller;

import com.example.Assignment.model.Certificate;
import com.example.Assignment.model.SignedFile;
import com.example.Assignment.repository.CertificateRepository;
import com.example.Assignment.repository.SignedFileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin
public class ActivityController {

    private final CertificateRepository certificateRepo;
    private final SignedFileRepository signedFileRepo;

    public ActivityController(CertificateRepository certificateRepo, SignedFileRepository signedFileRepo) {
        this.certificateRepo = certificateRepo;
        this.signedFileRepo = signedFileRepo;
    }

    @GetMapping
    public List<Map<String, Object>> getRecentActivities() {
        List<Map<String, Object>> activities = new ArrayList<>();

        for (Certificate cert : certificateRepo.findAll()) {
            Map<String, Object> activity = new HashMap<>();
            activity.put("type", "Certificate created");
            activity.put("name", cert.getCertificateName());
            activity.put("timestamp", cert.getValidFrom());
            activity.put("status", "Success");
            activities.add(activity);
        }

        for (SignedFile file : signedFileRepo.findAll()) {
            Map<String, Object> activity = new HashMap<>();
            activity.put("type", "File signed");
            activity.put("name", file.getFileName());
            activity.put("timestamp", file.getSignedAt());
            activity.put("status", "Success");
            activities.add(activity);
        }

        // Sort latest first
        return activities.stream()
                .sorted((a, b) -> ((Comparable) b.get("timestamp")).compareTo(a.get("timestamp")))
                .limit(4)
                .collect(Collectors.toList());
    }
}
