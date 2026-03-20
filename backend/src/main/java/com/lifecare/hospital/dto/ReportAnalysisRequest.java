package com.lifecare.hospital.dto;

import lombok.Data;

@Data
public class ReportAnalysisRequest {
  private String fileName;
  private String fileData; // base64
  private String fileType;
  private String language;
}