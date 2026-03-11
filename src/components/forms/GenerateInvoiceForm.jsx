import { useState } from 'react';

const GenerateInvoiceForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patient: '',
    amount: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount) || 0
    });
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

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Amount (₹)
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-slate-500 dark:text-slate-400 sm:text-sm">₹</span>
          </div>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={handleChange}
            className="block w-full pl-8 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
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
          Generate Invoice
        </button>
      </div>
    </form>
  );
};

export default GenerateInvoiceForm;
