package com.example.Assignment.controller;

import com.example.Assignment.model.SignedFile;
import com.example.Assignment.service.SignedFileService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/signed-files")
@CrossOrigin
public class SignedFileController {

    private final SignedFileService service;

    public SignedFileController(SignedFileService service) {
        this.service = service;
    }

    @PostMapping("/sign")
    public SignedFile signFile(@RequestBody Map<String, String> payload) {
        String fileName = payload.get("fileName");
        String certificateName = payload.get("certificateName");
        return service.signFile(fileName, certificateName);
    }

    @GetMapping
    public List<SignedFile> getAll() {
        return service.getAllSignedFiles();
    }
}
