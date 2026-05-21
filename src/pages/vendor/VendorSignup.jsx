import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  Mail, Lock, User, Phone, MapPin, Building2, Store,
  FileText, ArrowRight, Bike, ChevronLeft,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const VendorSignup = () => {
  const navigate = useNavigate();
  const { signupAsVendor } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: business info, 2: contact & address

  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    gst: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validateStep1 = () => {
    if (!form.businessName || !form.ownerName || !form.email || !form.password) {
      setError('Please fill in all required fields');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!form.phone || !form.address || !form.city) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const result = signupAsVendor({
      businessName: form.businessName,
      ownerName: form.ownerName,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: form.address,
      city: form.city,
      gst: form.gst || null,
    });

    setLoading(false);
    if (result.success) {
      navigate('/vendor/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-16 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Store size={24} className="text-accent-400" />
            </div>
            <span className="text-2xl font-bold">The Third <span className="text-accent-400">Wheel</span></span>
          </div>
          <h2 className="text-4xl font-black mb-4">Start Your Business</h2>
          <p className="text-primary-200 text-lg leading-relaxed max-w-md">
            Register as a vendor and start renting vehicles to college students.
            Manage your fleet, bookings, and earnings all in one place.
          </p>

          <div className="mt-12 space-y-3">
            {[
              { icon: Bike, label: 'List your vehicles in minutes' },
              { icon: Building2, label: 'Powerful dashboard & analytics' },
              { icon: FileText, label: 'Automatic booking management' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-accent-400" />
                </div>
                <span className="text-sm font-medium text-primary-100">{item.label}</span>
              </div>
            ))}
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
            Vendor Registration
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-1">Create Vendor Account</h1>
          <p className="text-slate-500 mb-6">
            {step === 1 ? 'Enter your business details to get started.' : 'Almost there! Add your contact info.'}
          </p>

          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 1 ? 'bg-primary-800 text-white' : 'bg-slate-100 text-slate-400'}`}>
                1
              </div>
              <span className={`text-xs font-medium ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Business</span>
            </div>
            <div className={`flex-1 h-0.5 rounded ${step >= 2 ? 'bg-primary-800' : 'bg-slate-200'} transition-colors`} />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 2 ? 'bg-primary-800 text-white' : 'bg-slate-100 text-slate-400'}`}>
                2
              </div>
              <span className={`text-xs font-medium ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Contact</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <Input
                  label="Business Name"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  icon={Building2}
                  placeholder="QuickRide Hub"
                />
                <Input
                  label="Owner Name"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  icon={User}
                  placeholder="Sneha Reddy"
                />
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
                  placeholder="At least 6 characters"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  icon={Phone}
                  placeholder="+91 98765 43210"
                />
                <Input
                  label="Shop Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  icon={MapPin}
                  placeholder="42, MG Road, Near Campus Gate"
                />
                <Input
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  icon={Building2}
                  placeholder="Mumbai"
                />
                <Input
                  label="GST Number (Optional)"
                  name="gst"
                  value={form.gst}
                  onChange={handleChange}
                  icon={FileText}
                  placeholder="27AABCU9605R1ZO"
                  helperText="Leave blank if not registered for GST"
                />
              </div>
            )}

            {error && (
              <div className="p-3 rounded-[var(--radius-sm)] bg-red-50 border border-red-100 text-sm text-error font-medium animate-fade-in">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => { setStep(1); setError(''); }} icon={ChevronLeft}>
                  Back
                </Button>
              )}
              {step === 1 ? (
                <Button type="button" fullWidth size="lg" onClick={handleNext} iconRight={ArrowRight}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" fullWidth size="lg" loading={loading} iconRight={ArrowRight}>
                  Create Account
                </Button>
              )}
            </div>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have a vendor account?{' '}
            <Link to="/vendor/login" className="text-primary-800 font-semibold hover:underline">Log in</Link>
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

export default VendorSignup;
