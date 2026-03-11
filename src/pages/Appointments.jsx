import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Calendar, Clock, Video,  Filter, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../components/Modal';
import AddAppointmentForm from '../components/forms/AddAppointmentForm';
const Appointments = () => {
  const { user } = useAuth();
  const isPatient = user?.role === 'Patient';

  // Mock Data
  const [appointments, setAppointments] = useState([
   { id: 'APT-001', patient: 'Rajesh Kumar', doctor: 'Dr. Priya Sharma', dept: 'Cardiology', date: '2023-11-01', time: '09:00 AM', status: 'Confirmed', type: 'In-person' },
{ id: 'APT-002', patient: 'Sneha Verma', doctor: 'Dr. Rajesh Kumar', dept: 'Neurology', date: '2023-11-01', time: '10:30 AM', status: 'Pending', type: 'Video Consult' },
{ id: 'APT-003', patient: 'Amit Patel', doctor: 'Dr. Anita Patel', dept: 'Pediatrics', date: '2023-11-02', time: '02:15 PM', status: 'Cancelled', type: 'In-person' },
{ id: 'APT-004', patient: 'Priya Singh', doctor: 'Dr. Priya Sharma', dept: 'Cardiology', date: '2023-11-03', time: '11:00 AM', status: 'Confirmed', type: 'In-person' },
{ id: 'APT-005', patient: 'Suresh Yadav', doctor: 'Dr. Suresh Verma', dept: 'Orthopedics', date: '2023-11-03', time: '12:00 PM', status: 'Confirmed', type: 'In-person' },
{ id: 'APT-006', patient: 'Meera Iyer', doctor: 'Dr. Kavita Rao', dept: 'Gynecology', date: '2023-11-04', time: '09:30 AM', status: 'Pending', type: 'Video Consult' },
{ id: 'APT-007', patient: 'Arjun Sharma', doctor: 'Dr. Amit Singh', dept: 'Dermatology', date: '2023-11-04', time: '11:00 AM', status: 'Confirmed', type: 'In-person' },
{ id: 'APT-008', patient: 'Divya Nair', doctor: 'Dr. Vikram Mehta', dept: 'ENT', date: '2023-11-05', time: '10:00 AM', status: 'Pending', type: 'In-person' },
{ id: 'APT-009', patient: 'Rohit Gupta', doctor: 'Dr. Neha Gupta', dept: 'Psychiatry', date: '2023-11-05', time: '02:00 PM', status: 'Confirmed', type: 'Video Consult' },  
]);

  const [dateFilter, setDateFilter] = useState('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAppointment = (appointmentData) => {
    // Determine AM/PM formatted time
    const [hours, minutes] = appointmentData.time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

    const newAppointment = {
      ...appointmentData,
      time: formattedTime,
      dept: appointmentData.department,
      id: `APT-0${10 + appointments.length}`,
      status: 'Pending'
    };
    setAppointments(prev => [newAppointment, ...prev]);
    setIsModalOpen(false);
  };
  const filteredAppointments = appointments.filter(a => {
    if (isPatient) {
       return a.patient === 'John Doe'; // Mock patient filter
    }
    // Simple filter for demo
    return true; 
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors">
            {isPatient ? 'My Appointments' : 'Appointment Schedule'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Manage and view upcoming consultations.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-fit"
        >
          <Plus className="h-4 w-4" />
          {isPatient ? 'Book Appointment' : 'New Appointment'}
        </button>
      </div>

      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-none border border-white/50 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40 dark:bg-slate-800/40">
          <div className="flex bg-white/50 dark:bg-slate-700/50 p-1 rounded-xl shadow-inner border border-white/50 dark:border-slate-600/50">
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${dateFilter === 'upcoming' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-600/50'}`}
              onClick={() => setDateFilter('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${dateFilter === 'past' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-600/50'}`}
              onClick={() => setDateFilter('past')}
            >
              Past
            </button>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200/50 dark:border-slate-600/50 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm w-full sm:w-auto justify-center transition-all duration-200 shadow-sm">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <div className="relative w-full sm:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 flex-1 sm:text-sm bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* List View */}
        <div className="divide-y divide-white/50 dark:divide-slate-700/50">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="p-4 sm:p-6 hover:bg-white/80 dark:hover:bg-slate-700/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-50 text-blue-700 rounded-xl p-3 min-w-[4rem] shadow-sm border border-white dark:border-slate-600 transform group-hover:scale-105 transition-transform duration-300">
                   <span className="text-xs font-semibold uppercase">{new Date(apt.date).toLocaleString('en-US', { month: 'short'})}</span>
                   <span className="text-xl font-bold">{new Date(apt.date).getDate()}</span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {isPatient ? apt.doctor : apt.patient}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">•</span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                      {isPatient ? apt.dept : apt.doctor}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-400" />
                      {apt.time}
                    </div>
                    <div className="flex items-center gap-1">
                      {apt.type === 'Video Consult' ? <Video className="h-4 w-4 text-emerald-500" /> : <Calendar className="h-4 w-4 text-slate-400" />}
                      {apt.type}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-slate-200/50 dark:border-slate-700/50">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 
                      apt.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'}`}
                >
                  {apt.status}
                </span>

                <div className="flex gap-2">
                  {apt.status === 'Pending' && !isPatient && (
                    <button className="text-emerald-600 hover:text-emerald-700 p-1" title="Confirm">
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  )}
                  {apt.status !== 'Cancelled' && (
                    <button className="text-red-500 hover:text-red-600 p-1" title="Cancel">
                      <XCircle className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredAppointments.length === 0 && (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">
              No appointments found.
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Appointment">
        <AddAppointmentForm onSubmit={handleAddAppointment} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Appointments;
