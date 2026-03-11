package com.lifecare.hospital.controller;

import com.lifecare.hospital.dto.AppointmentDTO;
import com.lifecare.hospital.model.Appointment;
import com.lifecare.hospital.security.UserDetailsImpl;
import com.lifecare.hospital.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(appointmentService.getAllAppointments(userDetails.getHospitalId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @PostMapping
    public ResponseEntity<AppointmentDTO> bookAppointment(@RequestBody AppointmentDTO dto, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        dto.setHospitalId(userDetails.getHospitalId());
        return new ResponseEntity<>(appointmentService.bookAppointment(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentDTO>> getPatientAppointments(@PathVariable Long patientId) {
        return ResponseEntity.ok(appointmentService.getPatientAppointments(patientId));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDTO>> getDoctorAppointments(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentService.getDoctorAppointments(doctorId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentDTO> updateStatus(
            @PathVariable Long id, 
            @RequestParam Appointment.AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, status));
    }
}
