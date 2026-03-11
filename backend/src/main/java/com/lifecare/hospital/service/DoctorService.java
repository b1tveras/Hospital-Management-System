package com.lifecare.hospital.service;

import com.lifecare.hospital.dto.DoctorDTO;
import com.lifecare.hospital.exception.ResourceNotFoundException;
import com.lifecare.hospital.model.Doctor;
import com.lifecare.hospital.model.Hospital;
import com.lifecare.hospital.repository.DoctorRepository;
import com.lifecare.hospital.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final ModelMapper modelMapper;

    public List<DoctorDTO> getAllDoctorsByHospital(Long hospitalId) {
        return doctorRepository.findByHospitalId(hospitalId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));
        return convertToDTO(doctor);
    }

    public DoctorDTO addDoctor(DoctorDTO doctorDTO) {
        Hospital hospital = hospitalRepository.findById(doctorDTO.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital not found"));

        Doctor doctor = convertToEntity(doctorDTO);
        doctor.setHospital(hospital);
        
        doctor.setDoctorCode("DR-" + System.currentTimeMillis() % 10000);
        if (doctor.getStatus() == null) {
            doctor.setStatus(Doctor.DoctorStatus.AVAILABLE);
        }

        return convertToDTO(doctorRepository.save(doctor));
    }

    public DoctorDTO updateDoctor(Long id, DoctorDTO details) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        doctor.setName(details.getName());
        doctor.setSpecialization(details.getSpecialization());
        doctor.setQualification(details.getQualification());
        doctor.setExperience(details.getExperience());
        doctor.setLicenseNumber(details.getLicenseNumber());
        doctor.setPhone(details.getPhone());
        doctor.setEmail(details.getEmail());
        doctor.setConsultationFee(details.getConsultationFee());
        doctor.setAvailableDays(details.getAvailableDays());
        doctor.setStartTime(details.getStartTime());
        doctor.setEndTime(details.getEndTime());
        
        if (details.getStatus() != null) {
            doctor.setStatus(details.getStatus());
        }

        return convertToDTO(doctorRepository.save(doctor));
    }

    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Doctor not found");
        }
        doctorRepository.deleteById(id);
    }

    public List<DoctorDTO> getAvailableDoctors(Long hospitalId) {
        return doctorRepository.findByHospitalIdAndStatus(hospitalId, Doctor.DoctorStatus.AVAILABLE).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private DoctorDTO convertToDTO(Doctor doctor) {
        return modelMapper.map(doctor, DoctorDTO.class);
    }

    private Doctor convertToEntity(DoctorDTO doctorDTO) {
        return modelMapper.map(doctorDTO, Doctor.class);
    }
}
