import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import AddPatientForm from '../components/forms/AddPatientForm';
import api from '../services/api';

const Patients = () => {
  const { user } = useAuth();
  const isAdminOrDoctor = user?.role === 'Admin' || user?.role === 'Doctor';

  
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/patients');
      setPatients(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
      setError("Failed to load patient directory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async (patientData) => {
    try {
      setIsSaving(true);
      
      // Map AddPatientForm data (contact to phone) to match PatientDTO
      const payload = {
        name: patientData.name,
        age: parseInt(patientData.age),
        gender: patientData.gender,
        phone: patientData.contact,
        isActive: true
      };

      await api.post('/patients', payload);
      setIsModalOpen(false);
      
      // Refetch the list to get the accurate ID from backend
      await fetchPatients();
    } catch (err) {
      console.error("Failed to add patient:", err);
      alert("Failed to save patient. Please check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const filteredPatients = patients.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.patientCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors">Patient Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Manage patient records and information.</p>
        </div>
        
        {isAdminOrDoctor && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Add New Patient
          </button>
        )}
      </div>

      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm border border-red-200 dark:border-red-800/50">
          {error}
        </div>
      )}

      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-none border border-white/50 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40 dark:bg-slate-800/40">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select className="block w-full pl-3 pr-10 py-2 border border-slate-200/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 shadow-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Discharged</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/50 dark:divide-slate-700/50">
            <thead className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Patient Info</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Age/Gender</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Visit</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/50 dark:divide-slate-700/50">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading patients...
                    </div>
                  </td>
                </tr>
              ) : filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-white/80 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center shadow-sm border border-white">
                        <span className="text-blue-600 font-medium text-sm">
                          {patient.name?.split(' ').map(n => n[0]).join('') || '?'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{patient.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{patient.patientCode || `PT-${patient.id}`}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-slate-100">{patient.age} yrs</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{patient.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {patient.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {/* patient.lastVisit doesn't exist on DTO currently, mock it or leave blank */}
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${patient.isActive ? 'bg-emerald-100 text-emerald-800' : 
                        'bg-slate-100 text-slate-800'}`}
                    >
                      {patient.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button className="hover:text-blue-600 transition-colors p-1" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      {user?.role === 'Admin' && (
                        <button className="hover:text-red-600 transition-colors p-1" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      <button className="hover:text-slate-600 transition-colors p-1">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No patients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="bg-white/40 dark:bg-slate-800/40 px-4 py-3 border-t border-white/50 dark:border-slate-700/50 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 bg-blue-50 dark:bg-blue-900/30 text-sm font-medium text-blue-600 dark:text-blue-400">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Patient">
        <AddPatientForm onSubmit={handleAddPatient} onCancel={() => setIsModalOpen(false)} isLoading={isSaving} />
      </Modal>
    </div>
  );
};

export default Patients;
