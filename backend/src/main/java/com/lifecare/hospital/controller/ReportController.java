package com.lifecare.hospital.controller;

import com.lifecare.hospital.dto.ReportAnalysisRequest;
import com.lifecare.hospital.dto.ReportAnalysisResponse;
import com.lifecare.hospital.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/analyze")
    public ResponseEntity<ReportAnalysisResponse> analyzeReport(@RequestBody ReportAnalysisRequest request) {
        ReportAnalysisResponse response = reportService.analyzeReport(request);
        return ResponseEntity.ok(response);
    }
}