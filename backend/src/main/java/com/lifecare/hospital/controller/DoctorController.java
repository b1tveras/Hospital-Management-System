package com.lifecare.hospital.controller;

import com.lifecare.hospital.dto.DoctorDTO;
import com.lifecare.hospital.security.UserDetailsImpl;
import com.lifecare.hospital.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(doctorService.getAllDoctorsByHospital(userDetails.getHospitalId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<DoctorDTO> addDoctor(@RequestBody DoctorDTO doctorDTO, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        doctorDTO.setHospitalId(userDetails.getHospitalId());
        return new ResponseEntity<>(doctorService.addDoctor(doctorDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<DoctorDTO> updateDoctor(@PathVariable Long id, @RequestBody DoctorDTO doctorDTO) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, doctorDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/available")
    public ResponseEntity<List<DoctorDTO>> getAvailableDoctors(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(doctorService.getAvailableDoctors(userDetails.getHospitalId()));
    }
}
