import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, ChevronRight, Bell, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import ManageReports from './ManageReports';

const SidebarLink = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="relative block">
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-nature-100 rounded-xl"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'text-nature-700 font-semibold' : 'text-gray-600 hover:text-nature-600 hover:bg-nature-50/50'}`}>
        <Icon size={20} />
        <span>{label}</span>
        {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
      </div>
    </Link>
  );
};

const StatCard = ({ title, value, subtext, color, icon: Icon }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 rounded-2xl relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={80} />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
          <Icon size={20} className={color.replace('bg-', 'text-')} />
        </div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-400 flex items-center gap-1">
        {subtext}
      </p>
    </div>
  </motion.div>
);

const DashboardHome = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-8 space-y-8"
  >
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin</p>
      </div>
      <div className="flex gap-4">
        <button className="p-2 text-gray-400 hover:text-nature-600 hover:bg-nature-50 rounded-lg transition-colors relative">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        title="Total Reports" 
        value="1,234" 
        subtext={<span className="text-nature-600 font-medium">↑ 12% from last month</span>}
        color="text-blue-600"
        icon={FileText}
      />
      <StatCard 
        title="Critical Areas" 
        value="12" 
        subtext={<span className="text-red-500 font-medium">Requires immediate attention</span>}
        color="text-red-600"
        icon={Leaf}
      />
      <StatCard 
        title="Resolution Rate" 
        value="85%" 
        subtext={<span className="text-nature-600 font-medium">↑ 5% improvement</span>}
        color="text-nature-600"
        icon={LayoutDashboard}
      />
    </div>

    {/* Placeholder for Chart/Activity */}
    <div className="glass-card rounded-2xl p-6 h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
      <p>Analytics Chart Placeholder (Requires Recharts or similar)</p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('adminUser') || '{"name": "Admin User", "email": "advaitkawale@gmail.com"}');

  return (
    <div className="min-h-screen bg-nature-50/50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 flex flex-col z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 text-nature-700 mb-2">
            <div className="w-10 h-10 bg-nature-100 rounded-xl flex items-center justify-center">
              <Leaf size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">HyacinthWatch</span>
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider pl-13">Admin Portal</p>
        </div>
        
        <nav className="px-4 space-y-2 flex-1">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4 opacity-70">Main Menu</p>
          <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Overview" />
          <SidebarLink to="/dashboard/reports" icon={FileText} label="Manage Reports" />
          
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8 opacity-70">System</p>
          <SidebarLink to="/dashboard/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 m-4 bg-nature-50 rounded-2xl border border-nature-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-nature-200" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate" title={user.email}>{user.email}</p>
            </div>
          </div>
          <button 
             onClick={() => {
               localStorage.removeItem('adminToken');
               localStorage.removeItem('adminUser');
               window.location.href = '/login';
             }}
             className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-white bg-white/50 rounded-lg w-full transition-all text-sm font-medium shadow-sm hover:shadow"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[bottom_1px_center] pointer-events-none" style={{ backgroundSize: '24px 24px' }} />
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/reports" element={<ManageReports />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
