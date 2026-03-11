package com.lifecare.hospital.dto;

import com.lifecare.hospital.model.Appointment.AppointmentStatus;
import com.lifecare.hospital.model.Appointment.AppointmentType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentDTO {
    private Long id;
    private Long hospitalId;
    private String appointmentCode;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private String department;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private AppointmentType type;
    private AppointmentStatus status;
    private String notes;
}
