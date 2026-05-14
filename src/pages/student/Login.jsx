import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Mail, Lock, Bike, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Login = () => {
  const navigate = useNavigate();
  const { loginAsStudent } = useAuthStore();
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
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    const result = loginAsStudent(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/browse');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Bike size={24} className="text-accent-400" />
            </div>
            <span className="text-2xl font-bold">The Third <span className="text-accent-400">Wheel</span></span>
          </div>
          <h2 className="text-4xl font-black mb-4">Welcome back.</h2>
          <p className="text-primary-200 text-lg leading-relaxed max-w-md">
            Log in to access your bookings, check ride history,
            and find the perfect vehicle near campus.
          </p>
          <div className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-sm text-primary-200 mb-3 font-medium">Demo Credentials:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-300">Email:</span>
                <code className="text-accent-300 bg-white/10 px-2 py-0.5 rounded text-xs">arjun@student.vit.ac.in</code>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-300">Password:</span>
                <code className="text-accent-300 bg-white/10 px-2 py-0.5 rounded text-xs">student123</code>
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
              <Bike size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">The Third <span className="text-accent-500">Wheel</span></span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 mb-1">Student Login</h1>
          <p className="text-slate-500 mb-8">Welcome back! Enter your credentials.</p>

          {/* Demo hint (mobile) */}
          <div className="lg:hidden mb-6 p-4 rounded-xl bg-primary-50 border border-primary-100">
            <p className="text-xs text-primary-700 font-medium mb-1">Demo: arjun@student.vit.ac.in / student123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              icon={Mail}
              placeholder="arjun@student.vit.ac.in"
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
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-800 font-semibold hover:underline">Sign up</Link>
          </p>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link to="/vendor/login" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              Are you a vendor? <span className="font-semibold text-accent-500">Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
