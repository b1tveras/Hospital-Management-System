package com.lifecare.hospital.service;

import com.lifecare.hospital.dto.AppointmentDTO;
import com.lifecare.hospital.dto.DashboardStatsDTO;
import com.lifecare.hospital.model.Appointment;
import com.lifecare.hospital.repository.AppointmentRepository;
import com.lifecare.hospital.repository.BillRepository;
import com.lifecare.hospital.repository.DoctorRepository;
import com.lifecare.hospital.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final BillRepository billRepository;
    private final ModelMapper modelMapper;

    public DashboardStatsDTO getDashboardStats(Long hospitalId) {
        long totalPatients = patientRepository.countByHospitalId(hospitalId);
        long totalDoctors = doctorRepository.countByHospitalId(hospitalId);
        long totalAppointments = appointmentRepository.countTotalAppointments(hospitalId);
        
        BigDecimal totalRevenue = billRepository.calculateTotalRevenue(hospitalId);
        if (totalRevenue == null) {
            totalRevenue = BigDecimal.ZERO;
        }

        List<Appointment> recentList = appointmentRepository.findTop5ByHospitalIdOrderByCreatedAtDesc(hospitalId);
        List<AppointmentDTO> recentDtos = recentList.stream()
                .map(this::convertAppointment)
                .collect(Collectors.toList());

        return DashboardStatsDTO.builder()
                .totalPatients(totalPatients)
                .totalDoctors(totalDoctors)
                .totalAppointments(totalAppointments)
                .totalRevenue(totalRevenue)
                .recentAppointments(recentDtos)
                .build();
    }
    
    private AppointmentDTO convertAppointment(Appointment appointment) {
        AppointmentDTO dto = modelMapper.map(appointment, AppointmentDTO.class);
        if (appointment.getPatient() != null) {
            dto.setPatientName(appointment.getPatient().getName());
        }
        if (appointment.getDoctor() != null) {
            dto.setDoctorName(appointment.getDoctor().getName());
        }
        return dto;
    }
}
