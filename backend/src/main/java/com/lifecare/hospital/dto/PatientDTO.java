package com.lifecare.hospital.dto;

import lombok.Data;

@Data
public class PatientDTO {
    private Long id;
    private Long hospitalId;
    private Long userId; // For auth link
    private String patientCode;
    private String name;
    private Integer age;
    private String gender;
    private String bloodGroup;
    private String phone;
    private String email;
    private String address;
    private String medicalHistory;
    private Boolean isActive;
}
