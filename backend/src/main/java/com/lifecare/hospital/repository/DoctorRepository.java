package com.lifecare.hospital.repository;

import com.lifecare.hospital.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByHospitalId(Long hospitalId);
    List<Doctor> findByHospitalIdAndStatus(Long hospitalId, Doctor.DoctorStatus status);
    List<Doctor> findByHospitalIdAndSpecialization(Long hospitalId, String specialization);
    long countByHospitalId(Long hospitalId);
}
