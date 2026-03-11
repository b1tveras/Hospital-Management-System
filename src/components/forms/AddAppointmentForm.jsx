import { useState } from 'react';

const AddAppointmentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patient: '',
    department: 'General',
    doctor: '',
    date: '',
    time: '',
    type: 'In-person'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="patient" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Patient Name
        </label>
        <input
          type="text"
          id="patient"
          name="patient"
          required
          value={formData.patient}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. John Doe"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="General">General</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="ENT">ENT</option>
            <option value="Psychiatry">Psychiatry</option>
          </select>
        </div>

        <div>
          <label htmlFor="doctor" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Doctor
          </label>
          <input
            type="text"
            id="doctor"
            name="doctor"
            required
            value={formData.doctor}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Dr. Priya Sharma"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
           <label htmlFor="time" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Consultation Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="In-person">In-person</option>
          <option value="Video Consult">Video Consult</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
};

export default AddAppointmentForm;
