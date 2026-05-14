import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  LayoutDashboard, Package, CalendarCheck, BarChart3,
  Shield, LogOut, Bike, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const VendorSidebar = () => {
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/vendor/dashboard', icon: LayoutDashboard },
    { label: 'Inventory', path: '/vendor/inventory', icon: Package },
    { label: 'Bookings', path: '/vendor/bookings', icon: CalendarCheck },
    { label: 'Analytics', path: '/vendor/analytics', icon: BarChart3 },
    { label: 'Geofence', path: '/vendor/geofence', icon: Shield },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-slate-100
        transition-all duration-300 z-40
        ${collapsed ? 'w-[72px]' : 'w-64'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-100">
          <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center shrink-0">
            <Bike size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-slate-900 whitespace-nowrap">
              The Third <span className="text-accent-500">Wheel</span>
            </span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)]
                text-sm font-medium transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-primary-50 text-primary-800 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-100 p-3 space-y-2">
          {!collapsed && user && (
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.businessName || user.ownerName}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            title="Logout"
            className={`
              flex items-center gap-3 w-full px-3 py-2.5 rounded-[var(--radius-sm)]
              text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600
              transition-colors cursor-pointer
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full p-2 rounded-[var(--radius-sm)] text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors cursor-pointer"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-100">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${isActive(item.path) ? 'text-primary-800' : 'text-slate-400'}
              `}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default VendorSidebar;
