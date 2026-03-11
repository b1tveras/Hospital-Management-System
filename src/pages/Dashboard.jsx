import { useAuth } from '../context/AuthContext';
import { Users, UserPlus, Calendar, Activity, TrendingUp, Clock, FileText } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const isDoctor = user?.role === 'Doctor';
  const isPatient = user?.role === 'Patient';

  // Mock Data
  const stats = [
    { label: 'Total Patients', value: '1,248', icon: Users, color: 'bg-blue-500', trend: '+12% this month', show: isAdmin },
    { label: 'Total Doctors', value: '42', icon: Activity, color: 'bg-emerald-500', trend: '+2 this month', show: isAdmin },
    { label: 'Appointments Today', value: '156', icon: Calendar, color: 'bg-purple-500', trend: '24 pending', show: isAdmin || isDoctor },
    { label: 'New Patients', value: '38', icon: UserPlus, color: 'bg-orange-500', trend: '+5% this week', show: isAdmin || isDoctor },
    { label: 'Upcoming Appointments', value: '3', icon: Clock, color: 'bg-blue-500', trend: 'Next at 2:30 PM', show: isPatient },
    { label: 'Recent Test Results', value: '2', icon: Activity, color: 'bg-emerald-500', trend: 'All clear', show: isPatient },
  ].filter(stat => stat.show);

  const recentActivity = [
    { id: 1, text: 'Dr. Smith completed appointment with John Doe', time: '10 mins ago', type: 'appointment', show: isAdmin },
    { id: 2, text: 'New patient Sarah Connor registered', time: '1 hour ago', type: 'registration', show: isAdmin },
    { id: 3, text: 'Emergency surgery scheduled for Room 3', time: '2 hours ago', type: 'alert', show: isAdmin },
    { id: 4, text: 'Appointment booked with Jane Smith', time: '1 hour ago', type: 'appointment', show: isDoctor },
    { id: 5, text: 'Lab results ready for Michael Brown', time: '3 hours ago', type: 'alert', show: isDoctor },
    { id: 6, text: 'Appointment confirmed for tomorrow', time: '1 day ago', type: 'appointment', show: isPatient },
    { id: 7, text: 'Invoice #1023 paid successfully', time: '3 days ago', type: 'billing', show: isPatient },
  ].filter(activity => activity.show);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors">Welcome back, {user?.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Here's what's happening today.</p>
        </div>
        
        {isPatient && (
          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Book Appointment
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-none border border-white/50 dark:border-slate-700/50 p-6 flex items-start justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600">
                  {stat.trend.includes('+') ? <TrendingUp className="h-3 w-3" /> : null}
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-white transform group-hover:scale-110 transition-transform duration-300`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color} shadow-lg shadow-${stat.color.replace('bg-', '')}/30`}>
                   <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-none border border-white/50 dark:border-slate-700/50 col-span-2 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 border-b border-white/50 dark:border-slate-700/50 flex items-center justify-between bg-white/40 dark:bg-slate-800/40">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Activity</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50/50 dark:bg-blue-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-lg transition-colors">View All</button>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
                      activity.type === 'alert' ? 'bg-red-500' : 
                      activity.type === 'registration' ? 'bg-emerald-500' : 
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{activity.text}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              {recentActivity.length === 0 && (
                <li className="p-6 text-center text-slate-500 dark:text-slate-400 text-sm">No recent activity</li>
              )}
            </ul>
          </div>
        </div>

        {/* Quick Actions / Info */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-none border border-white/50 dark:border-slate-700/50 p-6 transition-all duration-300 hover:shadow-2xl">
           <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Links</h2>
           <div className="space-y-3">
             {isAdmin && (
               <>
                 <button className="w-full text-left px-4 py-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm shadow-sm hover:shadow-md text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 flex items-center gap-3 border border-white/50 dark:border-slate-600 group">
                   <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:scale-110 transition-all">
                     <UserPlus className="h-4 w-4" />
                   </div>
                   Register New Patient
                 </button>
                 <button className="w-full text-left px-4 py-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm shadow-sm hover:shadow-md text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 flex items-center gap-3 border border-white/50 dark:border-slate-600 group">
                   <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 group-hover:scale-110 transition-all">
                     <Calendar className="h-4 w-4" />
                   </div>
                   Manage Schedules
                 </button>
               </>
             )}
             {(isAdmin || isDoctor) && (
               <button className="w-full text-left px-4 py-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm shadow-sm hover:shadow-md text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 flex items-center gap-3 border border-white/50 dark:border-slate-600 group">
                 <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 group-hover:scale-110 transition-all">
                   <Users className="h-4 w-4" />
                 </div>
                 View Patient Directory
               </button>
             )}
             {isPatient && (
               <>
                 <button className="w-full text-left px-4 py-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm shadow-sm hover:shadow-md text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 flex items-center gap-3 border border-white/50 dark:border-slate-600 group">
                   <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:scale-110 transition-all">
                     <Calendar className="h-4 w-4" />
                   </div>
                   Schedule Follow-up
                 </button>
                 <button className="w-full text-left px-4 py-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm shadow-sm hover:shadow-md text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 flex items-center gap-3 border border-white/50 dark:border-slate-600 group">
                   <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 group-hover:scale-110 transition-all">
                     <FileText className="h-4 w-4" />
                   </div>
                   Download Medical Records
                 </button>
               </>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
