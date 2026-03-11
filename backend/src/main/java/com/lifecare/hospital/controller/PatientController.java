package com.lifecare.hospital.controller;

import com.lifecare.hospital.dto.PatientDTO;
import com.lifecare.hospital.security.UserDetailsImpl;
import com.lifecare.hospital.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientDTO>> getAllPatients(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<PatientDTO> patients = patientService.getAllPatientsByHospital(userDetails.getHospitalId());
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<PatientDTO> addPatient(@RequestBody PatientDTO patientDTO, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        patientDTO.setHospitalId(userDetails.getHospitalId()); // Set correct hospital ID
        PatientDTO newPatient = patientService.addPatient(patientDTO);
        return new ResponseEntity<>(newPatient, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'DOCTOR')")
    public ResponseEntity<PatientDTO> updatePatient(@PathVariable Long id, @RequestBody PatientDTO patientDTO) {
        return ResponseEntity.ok(patientService.updatePatient(id, patientDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<PatientDTO>> searchPatients(
            @RequestParam String term,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(patientService.searchPatients(userDetails.getHospitalId(), term));
    }
}
