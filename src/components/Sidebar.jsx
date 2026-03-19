import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  FileText, 
  Activity, 
  Stethoscope,
  FileSearch
} from 'lucide-react';
import { Logo } from './Logo';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    const role = user?.role;
    
    // Admin sees everything
    if (role === 'Admin') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: Activity },
        { path: '/patients', label: 'Patients', icon: Users },
        { path: '/doctors', label: 'Doctors', icon: Stethoscope },
        { path: '/appointments', label: 'Appointments', icon: Calendar },
        { path: '/billing', label: 'Billing', icon: FileText },
        { path: '/report-summarizer', label: 'Report AI', icon: FileSearch },
      ];
    }
    
    // Doctor sees patients and their schedule
    if (role === 'Doctor') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: Activity },
        { path: '/patients', label: 'My Patients', icon: Users },
        { path: '/appointments', label: 'My Schedule', icon: Calendar },
        { path: '/report-summarizer', label: 'Report AI', icon: FileSearch },
      ];
    }

    // Patient sees their own data
    if (role === 'Patient') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: Activity },
        { path: '/appointments', label: 'My Appointments', icon: Calendar },
        { path: '/billing', label: 'My Bills', icon: FileText },
        { path: '/report-summarizer', label: 'Report AI', icon: FileSearch },
      ];
    }

    return [];
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-white/50 dark:border-slate-800/50 flex flex-col h-full shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20 z-20 transition-colors duration-200">
      <div className="h-20 flex flex-col justify-center px-6 border-b border-slate-200/50 dark:border-slate-800/50 shrink-0">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xl leading-none group cursor-pointer transition-transform hover:scale-105 duration-300">
          <Logo className="h-10 w-10 flex-shrink-0 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 group-hover:rotate-3" />
          <span className="tracking-tight">CarePoint</span>
        </div>
        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1.5 font-semibold pl-[3.25rem]">Care. Cure. Comfort.</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 transform scale-105' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-sm'
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">Logged in as</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
