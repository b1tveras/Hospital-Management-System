package com.lifecare.hospital.dto;

import com.lifecare.hospital.model.Doctor.DoctorStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
public class DoctorDTO {
    private Long id;
    private Long hospitalId;
    private Long userId;
    private String doctorCode;
    private String name;
    private String specialization;
    private String qualification;
    private Integer experience;
    private String licenseNumber;
    private String phone;
    private String email;
    private BigDecimal consultationFee;
    private String availableDays;
    private LocalTime startTime;
    private LocalTime endTime;
    private DoctorStatus status;
}
