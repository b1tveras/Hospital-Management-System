package com.lifecare.hospital.dto;

import lombok.Data;

@Data
public class ReportAnalysisResponse {
  private String analysis;
  private boolean success;
  private String error;
}