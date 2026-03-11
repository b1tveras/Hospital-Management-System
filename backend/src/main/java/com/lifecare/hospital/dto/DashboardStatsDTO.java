package com.lifecare.hospital.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class DashboardStatsDTO {
    private long totalPatients;
    private long totalDoctors;
    private long totalAppointments;
    private BigDecimal totalRevenue;
    private List<AppointmentDTO> recentAppointments;
}
