package com.lifecare.hospital.controller;

import com.lifecare.hospital.dto.BillDTO;
import com.lifecare.hospital.model.Bill.PaymentMethod;
import com.lifecare.hospital.security.UserDetailsImpl;
import com.lifecare.hospital.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<BillDTO>> getAllBills(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(billingService.getAllBills(userDetails.getHospitalId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillDTO> getBillById(@PathVariable Long id) {
        return ResponseEntity.ok(billingService.getBillById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<BillDTO> createBill(@RequestBody BillDTO billDTO, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        billDTO.setHospitalId(userDetails.getHospitalId());
        return new ResponseEntity<>(billingService.createBill(billDTO), HttpStatus.CREATED);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<BillDTO>> getPatientBills(@PathVariable Long patientId) {
        return ResponseEntity.ok(billingService.getPatientBills(patientId));
    }

    @PutMapping("/{id}/pay")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<BillDTO> markAsPaid(@PathVariable Long id, @RequestParam PaymentMethod paymentMethod) {
        return ResponseEntity.ok(billingService.updateBillPayment(id, paymentMethod));
    }
}
