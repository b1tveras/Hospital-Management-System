import { useState, useRef } from 'react';
import api from '../services/api';

export default function ReportSummarizer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);

  const steps = [
    { label: 'Upload', active: currentStep >= 1 },
    { label: 'Language', active: currentStep >= 2 },
    { label: 'Analyze', active: currentStep >= 3 },
    { label: 'Result', active: currentStep >= 4 }
  ];

  const languages = [
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'English' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'ur', label: 'اردو' }
  ];

  const handleFileSelect = (file) => {
    if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
      setSelectedFile(file);
      setCurrentStep(2);
      setMessage({ type: '', text: '' });
    } else {
      setMessage({ type: 'error', text: 'File size must be less than 10MB' });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setCurrentStep(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const selectLanguage = (langCode) => {
    setSelectedLang(langCode);
    setCurrentStep(3);
  };

  const analyzeReport = async () => {
    if (!selectedFile || !selectedLang) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // For demo purposes, simulate API call with mock response
      // In production, uncomment the actual API call below
      /*
      const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const base64Data = await fileToBase64(selectedFile);

      const requestData = {
        fileName: selectedFile.name,
        fileData: base64Data,
        fileType: selectedFile.type,
        language: selectedLang
      };

      const response = await api.post('/reports/analyze', requestData);
      */

      // Mock response for demo
      await new Promise(resolve => setTimeout(resolve, 2200)); // Simulate 2.2s delay

      const mockResponses = {
        hi: "रिपोर्ट विश्लेषण: रोगी की स्थिति स्थिर है। सभी पैरामीटर सामान्य सीमा के भीतर हैं। रक्तचाप 120/80 mmHg है जो सामान्य है। शुगर लेवल भी नियंत्रित है।",
        en: "Report Analysis: Patient's condition is stable. All parameters are within normal range. Blood pressure is 120/80 mmHg which is normal. Sugar levels are also controlled.",
        pa: "ਰਿਪੋਰਟ ਵਿਸ਼ਲੇਸ਼ਣ: ਮਰੀਜ਼ ਦੀ ਹਾਲਤ ਸਥਿਰ ਹੈ। ਸਾਰੇ ਪੈਰਾਮੀਟਰ ਨਾਰਮਲ ਰੇਂਜ ਵਿੱਚ ਹਨ। ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ 120/80 mmHg ਹੈ ਜੋ ਕਿ ਨਾਰਮਲ ਹੈ। ਸ਼ੂਗਰ ਲੈਵਲ ਵੀ ਕੰਟਰੋਲ ਹਨ।",
        ur: "رپورٹ کا تجزیہ: مریض کی حالت مستحکم ہے۔ تمام پیرامیٹرز نارمل رینج میں ہیں۔ بلڈ پریشر 120/80 mmHg ہے جو نارمل ہے۔ شوگر لیول بھی کنٹرول میں ہیں۔"
      };

      const analysis = mockResponses[selectedLang] || mockResponses.en;

      setCurrentStep(4);
      setMessage({ type: 'success', text: analysis });
    } catch (error) {
      console.error('Analysis error:', error);
      setMessage({ type: 'error', text: 'Report analyze nahi ho saki. Dobara try karein.' });
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: 'linear-gradient(135deg, #0a1628 0%, #0a2e1a 100%)',
      color: 'white',
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
      padding: '40px 20px'
    }}>
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
          linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px),
          linear-gradient(180deg, rgba(34,197,94,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              transform: 'perspective(200px) rotateX(8deg) rotateY(-8deg)',
              boxShadow: '0 8px 16px rgba(34, 197, 94, 0.2)'
            }}>
              🧠
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '28px',
                marginBottom: '4px'
              }}>
                AI Report Analyzer
              </h1>
              <p style={{ color: '#a7f3d0', fontSize: '14px' }}>
                Medical reports ka instant AI analysis
              </p>
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{
              color: '#22c55e',
              animation: 'pulse 2s infinite'
            }}>●</span>
            LIVE
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            right: '14px',
            height: '2px',
            background: 'rgba(34, 197, 94, 0.2)',
            zIndex: 0
          }} />
          {steps.map((step, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              zIndex: 1,
              position: 'relative'
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step.active ? '#22c55e' : 'rgba(34, 197, 94, 0.1)',
                border: `2px solid ${step.active ? '#22c55e' : 'rgba(34, 197, 94, 0.3)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                boxShadow: step.active ? '0 0 12px rgba(34, 197, 94, 0.3)' : 'none'
              }}>
                {index + 1}
              </div>
              <span style={{
                fontSize: '10px',
                color: '#a7f3d0',
                opacity: 0.7
              }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Upload Zone */}
        {!selectedFile && (
          <div
            style={{
              border: '2px dashed rgba(34, 197, 94, 0.35)',
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              background: 'rgba(34, 197, 94, 0.03)',
              transform: 'perspective(800px) rotateX(2deg)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              marginBottom: '30px'
            }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.6)';
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.06)';
              e.currentTarget.style.transform = 'perspective(800px) rotateX(2deg) translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.35)';
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.03)';
              e.currentTarget.style.transform = 'perspective(800px) rotateX(2deg)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 20px',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
            }}>
              📄
            </div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '18px',
              marginBottom: '8px'
            }}>
              Report drop karein ya click karein
            </div>
            <div style={{ color: '#a7f3d0', fontSize: '14px', marginBottom: '20px' }}>
              Supported formats: PDF, JPG, PNG (Max 10MB)
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['PDF', 'JPG', 'PNG', 'Max 10MB'].map(badge => (
                <span key={badge} style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  color: '#a7f3d0',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {badge}
                </span>
              ))}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </div>
        )}

        {/* File Preview */}
        {selectedFile && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.05)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px' }}>📄</div>
              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '2px' }}>{selectedFile.name}</h4>
                <p style={{ fontSize: '12px', color: '#a7f3d0' }}>{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={removeFile}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
            >
              ✕
            </div>
          </div>
        )}

        {/* Language Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '30px'
        }}>
          {languages.map(lang => (
            <button
              key={lang.code}
              style={{
                background: selectedLang === lang.code ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'rgba(34, 197, 94, 0.05)',
                border: `1px solid ${selectedLang === lang.code ? '#22c55e' : 'rgba(34, 197, 94, 0.3)'}`,
                color: selectedLang === lang.code ? 'white' : '#a7f3d0',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transform: 'perspective(300px) rotateX(4deg)',
                transition: 'all 0.3s ease',
                boxShadow: selectedLang === lang.code ? '0 0 12px rgba(34, 197, 94, 0.3)' : 'none'
              }}
              onClick={() => selectLanguage(lang.code)}
              onMouseEnter={(e) => {
                if (selectedLang !== lang.code) {
                  e.currentTarget.style.transform = 'perspective(300px) rotateX(0deg)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedLang !== lang.code) {
                  e.currentTarget.style.transform = 'perspective(300px) rotateX(4deg)';
                }
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #16a34a, #166534)',
            border: 'none',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '16px',
            cursor: selectedFile && selectedLang && !loading ? 'pointer' : 'not-allowed',
            transform: 'perspective(400px) rotateX(4deg)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            opacity: selectedFile && selectedLang && !loading ? 1 : 0.5
          }}
          onClick={analyzeReport}
          disabled={!selectedFile || !selectedLang || loading}
          onMouseEnter={(e) => {
            if (selectedFile && selectedLang && !loading) {
              e.currentTarget.style.transform = 'perspective(400px) rotateX(0deg) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFile && selectedLang && !loading) {
              e.currentTarget.style.transform = 'perspective(400px) rotateX(4deg)';
              e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.15)';
            }
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            animation: 'shimmer 2s infinite'
          }} />
          <span>
            {loading ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  borderTopColor: 'white',
                  animation: 'spin 1s ease-in-out infinite',
                  marginRight: '8px'
                }} />
                Analyzing...
              </>
            ) : (
              'Analyze Report'
            )}
          </span>
        </button>

        {/* Messages */}
        {message.text && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginTop: '20px',
            background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
            border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
            color: message.type === 'error' ? '#fca5a5' : '#a7f3d0',
            animation: 'slideUp 0.3s ease-out'
          }}>
            {message.type === 'error' ? '⚠️' : '✅'} {message.text}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @media (max-width: 640px) {
            .container {
              padding: 20px 16px;
            }
            .header {
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
            }
            .language-buttons {
              grid-template-columns: repeat(2, 1fr);
            }
            .title-section h1 {
              font-size: 24px;
            }
          }
        `}
      </style>
    </div>
  );
}
