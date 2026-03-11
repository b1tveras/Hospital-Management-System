package com.lifecare.hospital.config;

import com.lifecare.hospital.model.*;
import com.lifecare.hospital.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final HospitalRepository hospitalRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final BillRepository billRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (hospitalRepository.count() > 0) {
            return; // Data already seeded
        }

        // 1. Create Hospital
        Hospital hospital = Hospital.builder()
                .hospitalName("Life Care Clinic")
                .subdomain("lifecare")
                .email("contact@lifecare.com")
                .phone("+91 800-123-4567")
                .address("123 Health Avenue, Medical District")
                .subscriptionPlan(Hospital.SubscriptionPlan.PRO)
                .isActive(true)
                .build();
        hospital = hospitalRepository.save(hospital);

        // 2. Create Super Admin
        User adminUser = User.builder()
                .name("Super Admin")
                .email("admin@lifecare.com")
                .password(passwordEncoder.encode("admin123"))
                .role(User.Role.SUPER_ADMIN)
                .hospital(hospital)
                .isActive(true)
                .build();
        userRepository.save(adminUser);

        // 3. Create Doctors
        Doctor d1 = createDoctor(hospital, "Dr. Priya Sharma", "Cardiologist", "MD Cardiology", 12, "MD-C-101", "+91 98765 43210", "priya.s@lifecare.com", "MON,WED,FRI", new BigDecimal("1500.00"));
        Doctor d2 = createDoctor(hospital, "Dr. Rajesh Kumar", "Neurologist", "DM Neurology", 15, "DM-N-205", "+91 87654 32109", "rajesh.k@lifecare.com", "TUE,THU,SAT", new BigDecimal("2000.00"));
        Doctor d3 = createDoctor(hospital, "Dr. Anita Patel", "Pediatrician", "MD Pediatrics", 8, "MD-P-334", "+91 76543 21098", "anita.p@lifecare.com", "MON,TUE,WED,THU,FRI", new BigDecimal("1000.00"));
        Doctor d4 = createDoctor(hospital, "Dr. Suresh Verma", "Orthopedics", "MS Orthopedics", 20, "MS-O-412", "+91 65432 10987", "suresh.v@lifecare.com", "MON,WED,FRI", new BigDecimal("1800.00"));

        // 4. Create Patients
        Patient p1 = createPatient(hospital, "Rajesh Kumar", 45, "Male", "+91 98765 43210");
        Patient p2 = createPatient(hospital, "Sneha Verma", 32, "Female", "+91 87654 32109");
        Patient p3 = createPatient(hospital, "Amit Patel", 58, "Male", "+91 76543 21098");
        Patient p4 = createPatient(hospital, "Priya Singh", 28, "Female", "+91 65432 10987");
        Patient p5 = createPatient(hospital, "Suresh Yadav", 64, "Male", "+91 54321 09876");
        Patient p6 = createPatient(hospital, "Meera Iyer", 35, "Female", "+91 43210 98765");
        Patient p7 = createPatient(hospital, "Arjun Sharma", 40, "Male", "+91 32109 87654");
        Patient p8 = createPatient(hospital, "Divya Nair", 25, "Female", "+91 21098 76543");
        Patient p9 = createPatient(hospital, "Rohit Gupta", 50, "Male", "+91 10987 65432");
        Patient p10 = createPatient(hospital, "Ananya Joshi", 30, "Female", "+91 99887 77665");

        // 5. Create Appointments
        Appointment a1 = createAppointment(hospital, p1, d1, "Cardiology", LocalDate.now().plusDays(1), LocalTime.of(9, 0), Appointment.AppointmentStatus.CONFIRMED);
        Appointment a2 = createAppointment(hospital, p2, d2, "Neurology", LocalDate.now().plusDays(1), LocalTime.of(10, 30), Appointment.AppointmentStatus.PENDING);
        Appointment a3 = createAppointment(hospital, p3, d3, "Pediatrics", LocalDate.now().plusDays(2), LocalTime.of(14, 15), Appointment.AppointmentStatus.CANCELLED);
        Appointment a4 = createAppointment(hospital, p4, d1, "Cardiology", LocalDate.now().plusDays(3), LocalTime.of(11, 0), Appointment.AppointmentStatus.CONFIRMED);
        Appointment a5 = createAppointment(hospital, p5, d4, "Orthopedics", LocalDate.now().plusDays(3), LocalTime.of(12, 0), Appointment.AppointmentStatus.CONFIRMED);
        Appointment a6 = createAppointment(hospital, p6, d3, "Pediatrics", LocalDate.now().plusDays(4), LocalTime.of(9, 30), Appointment.AppointmentStatus.PENDING);
        Appointment a7 = createAppointment(hospital, p7, d4, "Orthopedics", LocalDate.now().plusDays(4), LocalTime.of(11, 0), Appointment.AppointmentStatus.CONFIRMED);
        Appointment a8 = createAppointment(hospital, p8, d1, "Cardiology", LocalDate.now().plusDays(5), LocalTime.of(10, 0), Appointment.AppointmentStatus.PENDING);
        Appointment a9 = createAppointment(hospital, p9, d2, "Neurology", LocalDate.now().plusDays(5), LocalTime.of(14, 0), Appointment.AppointmentStatus.CONFIRMED);
        Appointment a10 = createAppointment(hospital, p10, d3, "Pediatrics", LocalDate.now().plusDays(6), LocalTime.of(15, 30), Appointment.AppointmentStatus.CONFIRMED);

        createAppointment(hospital, p1, d4, "Orthopedics", LocalDate.now().minusDays(1), LocalTime.of(9, 0), Appointment.AppointmentStatus.COMPLETED);
        createAppointment(hospital, p2, d3, "Pediatrics", LocalDate.now().minusDays(2), LocalTime.of(10, 0), Appointment.AppointmentStatus.COMPLETED);
        createAppointment(hospital, p3, d1, "Cardiology", LocalDate.now().minusDays(3), LocalTime.of(11, 0), Appointment.AppointmentStatus.COMPLETED);
        createAppointment(hospital, p4, d2, "Neurology", LocalDate.now().minusDays(4), LocalTime.of(12, 0), Appointment.AppointmentStatus.COMPLETED);
        createAppointment(hospital, p5, d3, "Pediatrics", LocalDate.now().minusDays(5), LocalTime.of(14, 0), Appointment.AppointmentStatus.COMPLETED);


        // 6. Create Bills
        createBill(hospital, p1, a1, new BigDecimal("1500.00"), new BigDecimal("0"), new BigDecimal("0"), Bill.BillStatus.PAID);
        createBill(hospital, p2, a2, new BigDecimal("850.50"), new BigDecimal("100"), new BigDecimal("0"), Bill.BillStatus.PENDING);
        createBill(hospital, p3, a3, new BigDecimal("3200.00"), new BigDecimal("200"), new BigDecimal("500"), Bill.BillStatus.OVERDUE);
        createBill(hospital, p4, a4, new BigDecimal("450.00"), new BigDecimal("0"), new BigDecimal("0"), Bill.BillStatus.PAID);
        createBill(hospital, p5, a5, new BigDecimal("2200.00"), new BigDecimal("300"), new BigDecimal("100"), Bill.BillStatus.PAID);
        createBill(hospital, p6, a6, new BigDecimal("1750.00"), new BigDecimal("200"), new BigDecimal("150"), Bill.BillStatus.PENDING);
        createBill(hospital, p7, a7, new BigDecimal("980.00"), new BigDecimal("100"), new BigDecimal("0"), Bill.BillStatus.PAID);
        createBill(hospital, p8, a8, new BigDecimal("4500.00"), new BigDecimal("500"), new BigDecimal("1000"), Bill.BillStatus.OVERDUE);
        createBill(hospital, p9, a9, new BigDecimal("650.00"), new BigDecimal("50"), new BigDecimal("0"), Bill.BillStatus.PAID);
        createBill(hospital, p10, a10, new BigDecimal("1200.00"), new BigDecimal("150"), new BigDecimal("100"), Bill.BillStatus.PENDING);
        
        createBill(hospital, p1, null, new BigDecimal("3750.00"), new BigDecimal("500"), new BigDecimal("2000"), Bill.BillStatus.OVERDUE);
        createBill(hospital, p2, null, new BigDecimal("550.00"), new BigDecimal("50"), new BigDecimal("0"), Bill.BillStatus.PAID);
        createBill(hospital, p3, null, new BigDecimal("2800.00"), new BigDecimal("300"), new BigDecimal("1000"), Bill.BillStatus.PENDING);
        createBill(hospital, p4, null, new BigDecimal("900.00"), new BigDecimal("100"), new BigDecimal("0"), Bill.BillStatus.PAID);
        createBill(hospital, p5, null, new BigDecimal("1650.00"), new BigDecimal("200"), new BigDecimal("400"), Bill.BillStatus.PENDING);
        createBill(hospital, p6, null, new BigDecimal("5200.00"), new BigDecimal("700"), new BigDecimal("2500"), Bill.BillStatus.OVERDUE);
        createBill(hospital, p7, null, new BigDecimal("750.00"), new BigDecimal("100"), new BigDecimal("0"), Bill.BillStatus.PAID);
        createBill(hospital, p8, null, new BigDecimal("1100.00"), new BigDecimal("150"), new BigDecimal("500"), Bill.BillStatus.PAID);
        createBill(hospital, p9, null, new BigDecimal("420.00"), new BigDecimal("20"), new BigDecimal("0"), Bill.BillStatus.PAID);
        createBill(hospital, p10, null, new BigDecimal("3100.00"), new BigDecimal("500"), new BigDecimal("600"), Bill.BillStatus.PENDING);

        System.out.println("Mock data initialization completed.");
    }

    private Doctor createDoctor(Hospital hospital, String name, String spec, String qual, int exp, String lic, String phone, String email, String days, BigDecimal fee) {
        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode("doctor123"))
                .role(User.Role.DOCTOR)
                .hospital(hospital)
                .isActive(true)
                .build();
        user = userRepository.save(user);

        Doctor doc = Doctor.builder()
                .hospital(hospital)
                .user(user)
                .doctorCode("DR-" + System.currentTimeMillis() % 100000)
                .name(name)
                .specialization(spec)
                .qualification(qual)
                .experience(exp)
                .licenseNumber(lic)
                .phone(phone)
                .email(email)
                .availableDays(days)
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(17, 0))
                .consultationFee(fee)
                .status(Doctor.DoctorStatus.AVAILABLE)
                .build();
        return doctorRepository.save(doc);
    }

    private Patient createPatient(Hospital hospital, String name, int age, String gender, String phone) {
        Patient patient = Patient.builder()
                .hospital(hospital)
                .patientCode("PT-" + System.currentTimeMillis() % 100000)
                .name(name)
                .age(age)
                .gender(gender)
                .phone(phone)
                .email(name.toLowerCase().replace(" ", ".") + "@example.com")
                .isActive(true)
                .build();
        return patientRepository.save(patient);
    }

    private Appointment createAppointment(Hospital h, Patient p, Doctor d, String dept, LocalDate date, LocalTime time, Appointment.AppointmentStatus status) {
        Appointment apt = Appointment.builder()
                .hospital(h)
                .patient(p)
                .doctor(d)
                .department(dept)
                .appointmentCode("APT-" + System.currentTimeMillis() % 100000)
                .appointmentDate(date)
                .appointmentTime(time)
                .type(Appointment.AppointmentType.IN_PERSON)
                .status(status)
                .notes("Mock appointment data")
                .build();
        return appointmentRepository.save(apt);
    }

    private void createBill(Hospital h, Patient p, Appointment a, BigDecimal total, BigDecimal med, BigDecimal test, Bill.BillStatus status) {
        Bill bill = Bill.builder()
                .hospital(h)
                .patient(p)
                .appointment(a)
                .invoiceNumber("INV-" + System.currentTimeMillis() % 1000000)
                .totalAmount(total)
                .medicineCharges(med)
                .testCharges(test)
                .consultationFee(total.subtract(med).subtract(test))
                .otherCharges(BigDecimal.ZERO)
                .status(status)
                .paymentMethod(Bill.PaymentMethod.CARD)
                .billDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(15))
                .build();
        billRepository.save(bill);
    }
}
