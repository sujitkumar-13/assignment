package com.example.Assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Assignment.model.SignedFile;

public interface SignedFileRepository extends JpaRepository<SignedFile, Long> {}
