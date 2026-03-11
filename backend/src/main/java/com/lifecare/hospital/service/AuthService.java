package com.lifecare.hospital.service;

import com.lifecare.hospital.dto.AuthResponse;
import com.lifecare.hospital.dto.LoginRequest;
import com.lifecare.hospital.dto.RegisterRequest;
import com.lifecare.hospital.exception.ResourceNotFoundException;
import com.lifecare.hospital.model.Hospital;
import com.lifecare.hospital.model.User;
import com.lifecare.hospital.repository.HospitalRepository;
import com.lifecare.hospital.repository.UserRepository;
import com.lifecare.hospital.security.JwtTokenProvider;
import com.lifecare.hospital.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return AuthResponse.builder()
                .token(jwt)
                .id(userDetails.getId())
                .name(userDetails.getUsername()) // This is email in UserDetailsImpl, need actual name.
                .email(userDetails.getEmail())
                .role(userDetails.getRole())
                .hospitalId(userDetails.getHospitalId())
                .build();
    }

    public com.lifecare.hospital.model.User registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new IllegalArgumentException("Error: Email is already in use!");
        }

        Hospital hospital = null;
        if (signUpRequest.getRole() != User.Role.SUPER_ADMIN && signUpRequest.getHospitalId() != null) {
            hospital = hospitalRepository.findById(signUpRequest.getHospitalId())
                    .orElseThrow(() -> new ResourceNotFoundException("Error: Hospital is not found."));
        }

        User user = User.builder()
                .name(signUpRequest.getName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(signUpRequest.getRole())
                .hospital(hospital)
                .isActive(true)
                .build();

        return userRepository.save(user);
    }
}
