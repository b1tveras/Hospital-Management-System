package com.lifecare.hospital.repository;

import com.lifecare.hospital.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByHospitalId(Long hospitalId);
    List<Bill> findByPatientId(Long patientId);
    List<Bill> findByHospitalIdAndStatus(Long hospitalId, Bill.BillStatus status);
    
    @Query("SELECT SUM(b.totalAmount) FROM Bill b WHERE b.hospital.id = :hospitalId AND b.status = 'PAID'")
    BigDecimal calculateTotalRevenue(Long hospitalId);
}
