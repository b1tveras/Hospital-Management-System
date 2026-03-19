import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Billing from './pages/Billing';
import ReportSummarizer from './pages/ReportSummarizer';
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes inside Layout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Redirect root to dashboard */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="report-summarizer" element={<ReportSummarizer />} />
              
              {/* Admin and Doctor only */}
              <Route 
                path="patients" 
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Doctor']}>
                    <Patients />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin only */}
              <Route 
                path="doctors" 
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <Doctors />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin and Patient */}
              <Route 
                path="billing" 
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Patient']}>
                    <Billing />
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
