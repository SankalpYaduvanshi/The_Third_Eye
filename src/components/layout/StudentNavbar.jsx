import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Bike, Menu, X, User, LogOut, History, MapPin } from 'lucide-react';
import { useState } from 'react';

const StudentNavbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Browse', path: '/browse', icon: MapPin },
    { label: 'My Trips', path: '/trips', icon: History },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Bike size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 hidden sm:block">
              The Third <span className="text-accent-500">Wheel</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive(link.path)
                    ? 'bg-primary-50 text-primary-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }
                `}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-accent-500 font-medium">{user?.loyaltyPoints || 0} pts</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {isAuthenticated && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-2.5 px-4 py-3 rounded-[var(--radius-sm)] text-sm font-medium transition-colors
                  ${isActive(link.path) ? 'bg-primary-50 text-primary-800' : 'text-slate-600 hover:bg-slate-50'}
                `}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-4 py-3 rounded-[var(--radius-sm)] text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-[var(--radius-md)] hover:bg-slate-50">
                    Log in
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-primary-800 rounded-[var(--radius-md)]">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
