package com.lifecare.hospital.repository;

import com.lifecare.hospital.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByHospitalId(Long hospitalId);
    
    @Query("SELECT p FROM Patient p WHERE p.hospital.id = :hospitalId AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR p.phone LIKE CONCAT('%', :searchTerm, '%'))")
    List<Patient> searchPatients(@Param("hospitalId") Long hospitalId, @Param("searchTerm") String searchTerm);
    
    long countByHospitalId(Long hospitalId);
}
