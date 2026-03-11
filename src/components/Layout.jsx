import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex h-screen bg-slate-50 relative overflow-hidden font-sans z-0">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
