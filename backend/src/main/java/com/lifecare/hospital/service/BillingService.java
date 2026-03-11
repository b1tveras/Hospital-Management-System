package com.lifecare.hospital.service;

import com.lifecare.hospital.dto.BillDTO;
import com.lifecare.hospital.exception.ResourceNotFoundException;
import com.lifecare.hospital.model.Appointment;
import com.lifecare.hospital.model.Bill;
import com.lifecare.hospital.model.Hospital;
import com.lifecare.hospital.model.Patient;
import com.lifecare.hospital.repository.AppointmentRepository;
import com.lifecare.hospital.repository.BillRepository;
import com.lifecare.hospital.repository.HospitalRepository;
import com.lifecare.hospital.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillingService {

    private final BillRepository billRepository;
    private final HospitalRepository hospitalRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;

    public List<BillDTO> getAllBills(Long hospitalId) {
        return billRepository.findByHospitalId(hospitalId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<BillDTO> getPatientBills(Long patientId) {
        return billRepository.findByPatientId(patientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BillDTO getBillById(Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found"));
        return convertToDTO(bill);
    }

    public BillDTO createBill(BillDTO dto) {
        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital not found"));
        
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        Appointment appointment = null;
        if (dto.getAppointmentId() != null) {
            appointment = appointmentRepository.findById(dto.getAppointmentId()).orElse(null);
        }

        Bill bill = convertToEntity(dto);
        bill.setHospital(hospital);
        bill.setPatient(patient);
        bill.setAppointment(appointment);
        bill.setInvoiceNumber("INV-" + System.currentTimeMillis() % 1000000);
        
        // Calculate total amount
        BigDecimal total = BigDecimal.ZERO;
        if (bill.getConsultationFee() != null) total = total.add(bill.getConsultationFee());
        if (bill.getMedicineCharges() != null) total = total.add(bill.getMedicineCharges());
        if (bill.getTestCharges() != null) total = total.add(bill.getTestCharges());
        if (bill.getOtherCharges() != null) total = total.add(bill.getOtherCharges());
        
        bill.setTotalAmount(total);

        if (bill.getStatus() == null) {
            bill.setStatus(Bill.BillStatus.PENDING);
        }

        return convertToDTO(billRepository.save(bill));
    }

    public BillDTO updateBillPayment(Long id, Bill.PaymentMethod paymentMethod) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found"));
        
        bill.setStatus(Bill.BillStatus.PAID);
        bill.setPaymentMethod(paymentMethod);
        return convertToDTO(billRepository.save(bill));
    }

    private BillDTO convertToDTO(Bill bill) {
        BillDTO dto = modelMapper.map(bill, BillDTO.class);
        if (bill.getPatient() != null) {
            dto.setPatientName(bill.getPatient().getName());
        }
        return dto;
    }

    private Bill convertToEntity(BillDTO dto) {
        return modelMapper.map(dto, Bill.class);
    }
}
