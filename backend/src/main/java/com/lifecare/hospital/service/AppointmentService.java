package com.lifecare.hospital.service;

import com.lifecare.hospital.dto.AppointmentDTO;
import com.lifecare.hospital.exception.ResourceNotFoundException;
import com.lifecare.hospital.model.Appointment;
import com.lifecare.hospital.model.Doctor;
import com.lifecare.hospital.model.Hospital;
import com.lifecare.hospital.model.Patient;
import com.lifecare.hospital.repository.AppointmentRepository;
import com.lifecare.hospital.repository.DoctorRepository;
import com.lifecare.hospital.repository.HospitalRepository;
import com.lifecare.hospital.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final HospitalRepository hospitalRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    public List<AppointmentDTO> getAllAppointments(Long hospitalId) {
        return appointmentRepository.findByHospitalId(hospitalId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AppointmentDTO> getPatientAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AppointmentDTO> getDoctorAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        return convertToDTO(appointment);
    }

    public AppointmentDTO bookAppointment(AppointmentDTO dto) {
        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital not found"));
        
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        Appointment appointment = convertToEntity(dto);
        appointment.setHospital(hospital);
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentCode("APT-" + System.currentTimeMillis() % 100000);
        
        if (appointment.getStatus() == null) {
            appointment.setStatus(Appointment.AppointmentStatus.PENDING);
        }

        return convertToDTO(appointmentRepository.save(appointment));
    }

    public AppointmentDTO updateAppointmentStatus(Long id, Appointment.AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        
        appointment.setStatus(status);
        return convertToDTO(appointmentRepository.save(appointment));
    }

    public void cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = modelMapper.map(appointment, AppointmentDTO.class);
        if (appointment.getPatient() != null) {
            dto.setPatientName(appointment.getPatient().getName());
        }
        if (appointment.getDoctor() != null) {
            dto.setDoctorName(appointment.getDoctor().getName());
        }
        return dto;
    }

    private Appointment convertToEntity(AppointmentDTO dto) {
        return modelMapper.map(dto, Appointment.class);
    }
}
