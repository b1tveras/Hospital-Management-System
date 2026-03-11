package com.lifecare.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "doctor_code", unique = true, length = 20)
    private String doctorCode;

    @Column(nullable = false)
    private String name;

    private String specialization;
    private String qualification;
    private Integer experience;
    
    @Column(name = "license_number", length = 100)
    private String licenseNumber;
    
    @Column(length = 20)
    private String phone;
    
    private String email;
    
    @Column(name = "consultation_fee", precision = 10, scale = 2)
    private BigDecimal consultationFee;
    
    @Column(name = "available_days")
    private String availableDays; // comma separated e.g. "MON,TUE,WED"
    
    @Column(name = "start_time")
    private LocalTime startTime;
    
    @Column(name = "end_time")
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    private DoctorStatus status;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    public enum DoctorStatus {
        AVAILABLE, IN_SURGERY, ON_LEAVE
    }
}
