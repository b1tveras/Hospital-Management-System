package com.lifecare.hospital.dto;

import com.lifecare.hospital.model.Bill.BillStatus;
import com.lifecare.hospital.model.Bill.PaymentMethod;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BillDTO {
    private Long id;
    private Long hospitalId;
    private String invoiceNumber;
    private Long patientId;
    private String patientName;
    private Long appointmentId;
    private BigDecimal consultationFee;
    private BigDecimal medicineCharges;
    private BigDecimal testCharges;
    private BigDecimal otherCharges;
    private BigDecimal totalAmount;
    private BillStatus status;
    private PaymentMethod paymentMethod;
    private LocalDate billDate;
    private LocalDate dueDate;
}
