import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Stethoscope, Users, User, LogIn } from 'lucide-react';
import { Logo } from '../components/Logo';

const Login = () => {
  const [role, setRole] = useState('Patient'); // Default role
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const roles = [
    { id: 'Patient', icon: Users, label: 'Patient' },
    { id: 'Doctor', icon: Stethoscope, label: 'Doctor' },
    { id: 'Admin', icon: User, label: 'Admin' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call based on chosen role
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      // Mock successful login
      const mockToken = `mock-token-${role}`;
      const mockUser = {
        id: Math.floor(Math.random() * 1000),
        name: `Demo ${role}`,
        email: email,
        role: role
      };

      login(mockToken, mockUser);
      navigate(from, { replace: true });
      
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center text-cyan-500 relative group cursor-default">
          <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <Logo className="h-16 w-16 drop-shadow-md relative transform group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          CarePoint
        </h2>
        <p className="mt-1.5 text-center text-sm font-semibold tracking-widest text-cyan-600 uppercase">
          Care. Cure. Comfort.
        </p>
        <p className="mt-6 text-center text-sm text-slate-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 transition-all duration-300 hover:-translate-y-1">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-blue-900/5 sm:rounded-2xl sm:px-10 border border-white/50">
          
          {/* Role Selection Tabs */}
          <div className="flex p-1 mb-8 space-x-1 bg-slate-100/80 rounded-lg">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all duration-300
                    ${isSelected 
                      ? 'bg-white text-blue-700 shadow-md ring-1 ring-slate-900/5 scale-105 transform' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 hover:scale-105 transform'}
                  `}
                >
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : ''}`} />
                  {r.label}
                </button>
              );
            })}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white focus:bg-white"
                  placeholder={`${role.toLowerCase()}@example.com`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg overflow-hidden group"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                {loading ? 'Signing in...' : (
                  <span className="flex items-center gap-2 relative z-10">
                    <LogIn className="h-4 w-4" />
                    Sign in as {role}
                  </span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
             <p className="text-center text-xs text-slate-500">
               Demo mode: Enter any email and password to log in.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
