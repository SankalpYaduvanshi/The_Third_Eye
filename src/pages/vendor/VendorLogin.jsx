import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Mail, Lock, Bike, ArrowRight, Store } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const VendorLogin = () => {
  const navigate = useNavigate();
  const { loginAsVendor } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = loginAsVendor(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/vendor/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-16 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Store size={24} className="text-accent-400" />
            </div>
            <span className="text-2xl font-bold">The Third <span className="text-accent-400">Wheel</span></span>
          </div>
          <h2 className="text-4xl font-black mb-4">Vendor Portal</h2>
          <p className="text-primary-200 text-lg leading-relaxed max-w-md">
            Manage your fleet, track bookings, and grow your rental business 
            with our powerful vendor dashboard.
          </p>

          <div className="mt-12 space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center">
                  <Bike size={16} className="text-accent-400" />
                </div>
                <p className="text-sm font-semibold text-white">Fleet Management</p>
              </div>
              <p className="text-sm text-primary-300">Add, edit, and monitor all your vehicles from one place.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-sm text-primary-200 mb-3 font-medium">Demo Credentials:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-300">Email:</span>
                  <code className="text-accent-300 bg-white/10 px-2 py-0.5 rounded text-xs">sneha@quickridehub.com</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-300">Password:</span>
                  <code className="text-accent-300 bg-white/10 px-2 py-0.5 rounded text-xs">vendor123</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center">
              <Store size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">The Third <span className="text-accent-500">Wheel</span></span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 text-accent-600 text-xs font-semibold mb-4">
            <Store size={12} />
            Vendor Portal
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-1">Vendor Login</h1>
          <p className="text-slate-500 mb-8">Welcome back! Manage your fleet & bookings.</p>

          {/* Demo hint (mobile) */}
          <div className="lg:hidden mb-6 p-4 rounded-xl bg-primary-50 border border-primary-100">
            <p className="text-xs text-primary-700 font-medium">Demo: sneha@quickridehub.com / vendor123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              icon={Mail}
              placeholder="sneha@quickridehub.com"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              icon={Lock}
              placeholder="Enter your password"
            />

            {error && (
              <div className="p-3 rounded-[var(--radius-sm)] bg-red-50 border border-red-100 text-sm text-error font-medium animate-fade-in">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-800 focus:ring-primary-500 cursor-pointer" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-800 font-medium hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading} iconRight={ArrowRight}>
              Log in
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have a vendor account?{' '}
            <Link to="/vendor/signup" className="text-primary-800 font-semibold hover:underline">Sign up</Link>
          </p>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link to="/login" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              Are you a student? <span className="font-semibold text-accent-500">Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
