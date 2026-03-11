package com.lifecare.hospital.repository;

import com.lifecare.hospital.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByHospitalId(Long hospitalId);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long doctorId);
    
    List<Appointment> findByHospitalIdAndAppointmentDateGreaterThanEqualOrderByAppointmentDateAscAppointmentTimeAsc(Long hospitalId, LocalDate date);
    List<Appointment> findByHospitalIdAndAppointmentDateLessThanOrderByAppointmentDateDescAppointmentTimeDesc(Long hospitalId, LocalDate date);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.hospital.id = :hospitalId")
    long countTotalAppointments(Long hospitalId);
    
    List<Appointment> findTop5ByHospitalIdOrderByCreatedAtDesc(Long hospitalId);
}
