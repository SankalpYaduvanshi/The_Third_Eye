import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Mail, Lock, User, Phone, GraduationCap, Upload, CheckCircle, Loader2, Bike, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { colleges } from '../../mock/students';

const Signup = () => {
  const navigate = useNavigate();
  const { signupAsStudent, verifyCollegeId } = useAuthStore();
  const [step, setStep] = useState(1); // 1: form, 2: college ID, 3: verified
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', college: '',
  });
  const [idFile, setIdFile] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep1 = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Must be at least 6 characters';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.college) errs.college = 'Select your college';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setIdFile(file);
  };

  const handleVerify = async () => {
    if (!idFile) return;
    setVerifying(true);
    // Simulate verification
    await new Promise((r) => setTimeout(r, 2500));
    setVerifying(false);
    setStep(3);
    // Signup the user
    signupAsStudent(form);
    verifyCollegeId();
    // Redirect after a beat
    setTimeout(() => navigate('/browse'), 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Bike size={24} className="text-accent-400" />
            </div>
            <span className="text-2xl font-bold">The Third <span className="text-accent-400">Wheel</span></span>
          </div>
          <h2 className="text-4xl font-black mb-4">Join the ride.</h2>
          <p className="text-primary-200 text-lg leading-relaxed max-w-md">
            Create your account and unlock access to bikes and cars near your campus.
            Verified students get exclusive deals and loyalty rewards.
          </p>
          <div className="mt-12 space-y-4">
            {['Rent vehicles in under 60 seconds', 'Earn loyalty points on every ride', 'Exclusive campus deals & offers'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-primary-100">
                <CheckCircle size={18} className="text-accent-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? 'bg-primary-800 text-white' : 'bg-slate-100 text-slate-400'
                }`}>{s}</div>
                {s < 3 && <div className={`w-8 h-0.5 transition-all ${step > s ? 'bg-primary-800' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Info */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="animate-fade-in">
              <h1 className="text-2xl font-black text-slate-900 mb-1">Create Account</h1>
              <p className="text-slate-500 mb-8">Fill in your details to get started.</p>

              <div className="space-y-4">
                <Input label="Full Name" name="name" value={form.name} onChange={handleChange} icon={User} placeholder="Arjun Mehta" error={errors.name} />
                <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} icon={Mail} placeholder="arjun@student.vit.ac.in" error={errors.email} />
                <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} icon={Lock} placeholder="Min 6 characters" error={errors.password} />
                <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} icon={Phone} placeholder="+91 98765 43210" error={errors.phone} />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    <GraduationCap size={14} className="inline mr-1.5" />
                    College
                  </label>
                  <select
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    className={`w-full rounded-[var(--radius-md)] border bg-white px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 cursor-pointer ${
                      errors.college ? 'border-error' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <option value="">Select your college</option>
                    {colleges.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.college && <p className="text-xs text-error font-medium">{errors.college}</p>}
                </div>
              </div>

              <Button type="submit" fullWidth size="lg" className="mt-6" iconRight={ArrowRight}>
                Continue
              </Button>

              <p className="text-center text-sm text-slate-500 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-800 font-semibold hover:underline">Log in</Link>
              </p>
            </form>
          )}

          {/* Step 2: College ID Upload */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-black text-slate-900 mb-1">Verify College ID</h1>
              <p className="text-slate-500 mb-8">Upload your college ID card for verification.</p>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer hover:border-primary-500 hover:bg-primary-50/30 ${
                  idFile ? 'border-success bg-green-50/30' : 'border-slate-200'
                }`}
                onClick={() => document.getElementById('college-id-input').click()}
              >
                <input
                  id="college-id-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {idFile ? (
                  <div>
                    <CheckCircle size={40} className="text-success mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-900">{idFile.name}</p>
                    <p className="text-xs text-slate-500 mt-1">Click to change</p>
                  </div>
                ) : (
                  <div>
                    <Upload size={40} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-700">Drag & drop or click to upload</p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" fullWidth onClick={() => setStep(1)}>Back</Button>
                <Button fullWidth disabled={!idFile} loading={verifying} onClick={handleVerify}>
                  {verifying ? 'Verifying...' : 'Verify & Continue'}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-success" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 mb-2">You're Verified! 🎉</h1>
              <p className="text-slate-500 mb-2">Welcome to The Third Wheel.</p>
              <p className="text-sm text-slate-400">Redirecting to browse vehicles...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
