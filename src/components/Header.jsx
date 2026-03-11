import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, LogOut, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/50 dark:border-slate-700/50 flex items-center justify-between px-6 shadow-sm z-10 transition-colors duration-200">
      <div className="font-semibold text-slate-800 dark:text-slate-100 text-lg">
        {user?.role} Portal
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <User className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:block">
            {user?.name}
          </span>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50/80 dark:hover:bg-red-900/30 backdrop-blur-sm"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
