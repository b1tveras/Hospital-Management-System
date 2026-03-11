import { useState } from 'react';

const AddDoctorForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: 'General Physician',
    email: '',
    phone: ''
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
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Doctor's Name
        </label>
        <div className="flex mt-1 relative rounded-lg shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 sm:text-sm">
            Dr.
          </span>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="flex-1 block w-full rounded-none rounded-r-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Specialization
        </label>
        <select
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Cardiologist">Cardiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="ENT Specialist">ENT Specialist</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="General Physician">General Physician</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="doctor@lifecare.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Contact Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+91 xyz xyz xyz"
          />
        </div>
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
          Save Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctorForm;
