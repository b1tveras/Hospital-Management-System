import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, FileText, Download, Eye, IndianRupee } from 'lucide-react';
import Modal from '../components/Modal';
import GenerateInvoiceForm from '../components/forms/GenerateInvoiceForm';
const Billing = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  // Mock Data
  const [invoices, setInvoices] = useState([
    { id: 'INV-2023-001', patient: 'Rajesh Kumar', date: '2023-11-01', amount: 1500.00, status: 'Paid' },
{ id: 'INV-2023-002', patient: 'Sneha Verma', date: '2023-11-02', amount: 850.50, status: 'Pending' },
{ id: 'INV-2023-003', patient: 'Amit Patel', date: '2023-11-03', amount: 3200.00, status: 'Overdue' },
{ id: 'INV-2023-004', patient: 'Priya Singh', date: '2023-11-04', amount: 450.00, status: 'Paid' },

{ id: 'INV-2023-005', patient: 'Suresh Yadav', date: '2023-11-05', amount: 2200.00, status: 'Paid' },
{ id: 'INV-2023-006', patient: 'Meera Iyer', date: '2023-11-05', amount: 1750.00, status: 'Pending' },
{ id: 'INV-2023-007', patient: 'Arjun Sharma', date: '2023-11-06', amount: 980.00, status: 'Paid' },
{ id: 'INV-2023-008', patient: 'Divya Nair', date: '2023-11-06', amount: 4500.00, status: 'Overdue' },
{ id: 'INV-2023-009', patient: 'Rohit Gupta', date: '2023-11-07', amount: 650.00, status: 'Paid' },
{ id: 'INV-2023-010', patient: 'Ananya Joshi', date: '2023-11-07', amount: 1200.00, status: 'Pending' },
{ id: 'INV-2023-011', patient: 'Vikash Mishra', date: '2023-11-08', amount: 3750.00, status: 'Overdue' },
{ id: 'INV-2023-012', patient: 'Pooja Desai', date: '2023-11-08', amount: 550.00, status: 'Paid' },
{ id: 'INV-2023-013', patient: 'Karan Malhotra', date: '2023-11-09', amount: 2800.00, status: 'Pending' },
{ id: 'INV-2023-014', patient: 'Riya Kapoor', date: '2023-11-09', amount: 900.00, status: 'Paid' },
{ id: 'INV-2023-015', patient: 'Nikhil Bansal', date: '2023-11-10', amount: 1650.00, status: 'Pending' },
{ id: 'INV-2023-016', patient: 'Kavya Reddy', date: '2023-11-10', amount: 5200.00, status: 'Overdue' },
{ id: 'INV-2023-017', patient: 'Mohit Agarwal', date: '2023-11-11', amount: 750.00, status: 'Paid' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateInvoice = (invoiceData) => {
    const newInvoice = {
      ...invoiceData,
      date: new Date().toISOString().split('T')[0],
      id: `INV-2023-0${18 + invoices.length}`,
    };
    setInvoices(prev => [newInvoice, ...prev]);
    setIsModalOpen(false);
  };
  const filteredInvoices = invoices.filter(inv => {
    if (user?.role === 'Patient') {
       return inv.patient === 'John Doe'; // Mock patient filter
    }
    return inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
           inv.patient.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors">Billing & Invoices</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Manage patient billing and payment history.</p>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Generate Invoice
          </button>
        )}
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-none border border-white/50 dark:border-slate-700/50 p-6 flex items-center justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">₹45,231.00</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center shadow-sm border border-white dark:border-emerald-200 transform group-hover:scale-110 transition-transform duration-300">
              <IndianRupee className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-none border border-white/50 dark:border-slate-700/50 p-6 flex items-center justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Payments</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">₹3,450.50</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center shadow-sm border border-white dark:border-amber-200 transform group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-none border border-white/50 dark:border-slate-700/50 p-6 flex items-center justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Overdue (30+ days)</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">₹1,240.00</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center shadow-sm border border-white dark:border-red-200 transform group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
          </div>
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
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select className="block w-full pl-3 pr-10 py-2 border border-slate-200/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 backdrop-blur-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 shadow-sm">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/50 dark:divide-slate-700/50">
            <thead className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Invoice ID</th>
                {isAdmin && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Patient</th>}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/50 dark:divide-slate-700/50">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/80 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                    {invoice.id}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100 font-medium">
                      {invoice.patient}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100 font-medium">
                    ₹{invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${invoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 
                        invoice.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button className="hover:text-blue-600 transition-colors" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="hover:text-slate-600 transition-colors" title="Download PDF">
                        <Download className="h-4 w-4" />
                      </button>
                      {isAdmin && invoice.status === 'Pending' && (
                        <button className="text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-2 py-1 rounded border border-emerald-200 transition-colors">
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Invoice">
        <GenerateInvoiceForm onSubmit={handleGenerateInvoice} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Billing;
