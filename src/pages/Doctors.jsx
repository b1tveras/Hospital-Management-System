import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, MoreVertical, Edit2, Trash2, Mail, Phone } from 'lucide-react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import AddDoctorForm from '../components/forms/AddDoctorForm';
import api from '../services/api';

const Doctors = () => {
  const { user } = useAuth();
  
  // Mock Data
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/doctors');
      setDoctors(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      setError("Failed to load doctor directory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = async (doctorData) => {
    try {
      setIsSaving(true);
      
      const payload = {
        name: `Dr. ${doctorData.name}`,
        specialization: doctorData.specialization,
        email: doctorData.email,
        phone: doctorData.phone,
        status: 'AVAILABLE'
      };

      await api.post('/doctors', payload);
      setIsModalOpen(false);
      
      // Refetch the list to get the accurate ID from backend
      await fetchDoctors();
    } catch (err) {
      console.error("Failed to add doctor:", err);
      alert("Failed to save doctor. Please check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const filteredDoctors = doctors.filter(d => 
  const filteredDoctors = doctors.filter(d => 
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors">Doctor Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Manage doctor profiles and schedules.</p>
        </div>
        
        {user?.role === 'Admin' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Add New Doctor
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-4 rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-none border border-white/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-2xl">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-200/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select className="block w-full pl-3 pr-10 py-2 border border-slate-200/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 shadow-sm">
            <option>All Departments</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
          </select>
        </div>
      </div>

      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm border border-red-200 dark:border-red-800/50">
          {error}
        </div>
      )}

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-sm border border-white/50 dark:border-slate-700/50">
            <div className="flex items-center justify-center gap-2 text-slate-500">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Loading doctors...
            </div>
          </div>
        ) : filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg shadow-blue-900/5 dark:shadow-none border border-white/50 dark:border-slate-700/50 p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center text-blue-600 font-bold text-xl shadow-sm border border-white dark:border-slate-700 transform group-hover:scale-110 transition-transform duration-300">
                  {doctor.name?.split(' ').slice(1).map(n => n[0]).join('') || '?'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{doctor.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{doctor.specialization || 'General'}</p>
                </div>
              </div>
              <div className="relative">
                <button className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Mail className="h-4 w-4 text-slate-400" />
                {doctor.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Phone className="h-4 w-4 text-slate-400" />
                {doctor.phone}
              </div>
            </div>
            
            <div className="border-t border-white/50 pt-4 flex items-center justify-between mt-auto">
              <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${doctor.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 
                    doctor.status === 'In Surgery' ? 'bg-amber-100 text-amber-800' : 
                    'bg-red-100 text-red-800'}`}
              >
                {doctor.status}
              </span>
              
              <div className="flex gap-2">
                <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30" title="Edit">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        ))}
        {!isLoading && filteredDoctors.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-sm border border-white/50 dark:border-slate-700/50">
            <p className="text-slate-500 dark:text-slate-400">No doctors found matching your search.</p>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Doctor">
        <AddDoctorForm onSubmit={handleAddDoctor} onCancel={() => setIsModalOpen(false)} isLoading={isSaving} />
      </Modal>
    </div>
  );
};

export default Doctors;
