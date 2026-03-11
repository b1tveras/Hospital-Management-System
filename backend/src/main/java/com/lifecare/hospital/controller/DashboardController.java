package com.lifecare.hospital.controller;

import com.lifecare.hospital.dto.DashboardStatsDTO;
import com.lifecare.hospital.security.UserDetailsImpl;
import com.lifecare.hospital.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        // Here we restrict dashboard stats to the user's hospital
        DashboardStatsDTO stats = dashboardService.getDashboardStats(userDetails.getHospitalId());
        return ResponseEntity.ok(stats);
    }
}
