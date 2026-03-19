package com.lifecare.hospital.service;

import com.lifecare.hospital.dto.PatientDTO;
import com.lifecare.hospital.exception.ResourceNotFoundException;
import com.lifecare.hospital.model.Hospital;
import com.lifecare.hospital.model.Patient;
import com.lifecare.hospital.repository.HospitalRepository;
import com.lifecare.hospital.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final HospitalRepository hospitalRepository;
    private final ModelMapper modelMapper;

    public List<PatientDTO> getAllPatientsByHospital(Long hospitalId) {
        return patientRepository.findByHospitalId(hospitalId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        return convertToDTO(patient);
    }

    public PatientDTO addPatient(PatientDTO patientDTO) {
        Hospital hospital = hospitalRepository.findById(patientDTO.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital not found"));

        Patient patient = convertToEntity(patientDTO);
        patient.setHospital(hospital);
        
        // Auto generate simple patient code
        patient.setPatientCode("PT-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        patient.setIsActive(true);

        Patient savedPatient = patientRepository.save(patient);
        return convertToDTO(savedPatient);
    }

    public PatientDTO updatePatient(Long id, PatientDTO patientDetails) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        patient.setName(patientDetails.getName());
        patient.setAge(patientDetails.getAge());
        patient.setGender(patientDetails.getGender());
        patient.setBloodGroup(patientDetails.getBloodGroup());
        patient.setPhone(patientDetails.getPhone());
        patient.setEmail(patientDetails.getEmail());
        patient.setAddress(patientDetails.getAddress());
        patient.setMedicalHistory(patientDetails.getMedicalHistory());

        if (patientDetails.getIsActive() != null) {
            patient.setIsActive(patientDetails.getIsActive());
        }

        return convertToDTO(patientRepository.save(patient));
    }

    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Patient not found");
        }
        patientRepository.deleteById(id);
    }

    public List<PatientDTO> searchPatients(Long hospitalId, String searchTerm) {
        return patientRepository.searchPatients(hospitalId, searchTerm).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PatientDTO convertToDTO(Patient patient) {
        return modelMapper.map(patient, PatientDTO.class);
    }

    private Patient convertToEntity(PatientDTO patientDTO) {
        return modelMapper.map(patientDTO, Patient.class);
    }
}
