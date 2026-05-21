import { useState, useCallback } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { getLoyaltyTier } from '../../mock/students';
import { formatDate } from '../../utils/formatters';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  Copy,
  Check,
  Gift,
  Trophy,
  MapPin,
  IndianRupee,
  CalendarDays,
  LogOut,
  Save,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

const tierGradients = {
  Bronze: 'from-amber-700 to-amber-900',
  Silver: 'from-slate-400 to-slate-600',
  Gold: 'from-amber-400 to-yellow-600',
  Platinum: 'from-violet-400 to-purple-600',
};

const tierBgClasses = {
  Bronze: 'bg-amber-50 text-amber-800 border-amber-200',
  Silver: 'bg-slate-50 text-slate-700 border-slate-200',
  Gold: 'bg-amber-50 text-amber-700 border-amber-200',
  Platinum: 'bg-purple-50 text-purple-700 border-purple-200',
};

const Profile = () => {
  const { user, updateProfile, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const loyaltyInfo = getLoyaltyTier(user?.loyaltyPoints || 0);

  const handleCopyReferral = useCallback(() => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [user?.referralCode]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate save delay
    setTimeout(() => {
      updateProfile(formData);
      setSaving(false);
      setIsEditing(false);
    }, 600);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white px-4 pt-8 pb-20 sm:px-6">
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className={`
              w-24 h-24 rounded-full bg-gradient-to-br ${tierGradients[loyaltyInfo.tier] || tierGradients.Bronze}
              flex items-center justify-center text-white text-2xl font-bold
              shadow-lg ring-4 ring-white/20
            `}>
              {initials}
            </div>
            {user?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                <ShieldCheck size={16} className="text-white" />
              </div>
            )}
          </div>

          {/* Name & College */}
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <div className="flex items-center justify-center gap-1.5 mt-1 text-primary-200 text-sm">
            <GraduationCap size={14} />
            <span>{user?.college}</span>
          </div>
          {user?.isVerified && (
            <Badge color="success" size="sm" className="mt-2">
              <ShieldCheck size={12} />
              College Verified
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 sm:px-6 -mt-14 pb-8 space-y-4">
        {/* Loyalty Tier Card */}
        <Card className="animate-fade-in-up overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} style={{ color: loyaltyInfo.color }} />
              <h2 className="font-bold text-slate-900">{loyaltyInfo.tier} Member</h2>
            </div>
            <div className={`
              px-3 py-1 rounded-full text-xs font-bold border
              ${tierBgClasses[loyaltyInfo.tier] || tierBgClasses.Bronze}
            `}>
              {user?.loyaltyPoints || 0} pts
            </div>
          </div>

          {/* Progress Bar */}
          {loyaltyInfo.next !== null ? (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>{loyaltyInfo.tier}</span>
                <span>
                  {loyaltyInfo.next - (user?.loyaltyPoints || 0)} pts to next tier
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.min(loyaltyInfo.progress, 100)}%`,
                    backgroundColor: loyaltyInfo.color,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>{user?.loyaltyPoints || 0}</span>
                <span>{loyaltyInfo.next}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <Sparkles size={16} />
              <span className="font-medium">You've reached the highest tier!</span>
            </div>
          )}
        </Card>

        {/* Referral Code */}
        <Card className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <Gift size={18} className="text-accent-500" />
            <h2 className="font-bold text-slate-900">Referral Code</h2>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Share your code with friends and earn bonus loyalty points!
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-50 border border-dashed border-slate-300 rounded-[var(--radius-sm)] px-4 py-3 text-center">
              <span className="text-lg font-bold tracking-widest text-primary-800">
                {user?.referralCode || '—'}
              </span>
            </div>
            <button
              onClick={handleCopyReferral}
              className={`
                shrink-0 w-11 h-11 rounded-[var(--radius-sm)] flex items-center justify-center
                transition-all duration-200 cursor-pointer
                ${copied
                  ? 'bg-green-100 text-green-600'
                  : 'bg-primary-50 text-primary-800 hover:bg-primary-100'
                }
              `}
              title="Copy referral code"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </Card>

        {/* Stats Row */}
        <Card className="animate-fade-in-up" padding="p-0">
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            <div className="p-4 text-center">
              <MapPin size={16} className="text-primary-800 mx-auto mb-1" />
              <p className="text-xl font-bold text-slate-900">{user?.totalTrips || 0}</p>
              <p className="text-[11px] text-slate-500">Total Trips</p>
            </div>
            <div className="p-4 text-center">
              <IndianRupee size={16} className="text-accent-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-slate-900">
                ₹{(user?.totalSpent || 0).toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-500">Total Spent</p>
            </div>
            <div className="p-4 text-center">
              <CalendarDays size={16} className="text-green-600 mx-auto mb-1" />
              <p className="text-sm font-bold text-slate-900 mt-1">
                {user?.joinedDate ? formatDate(user.joinedDate) : '—'}
              </p>
              <p className="text-[11px] text-slate-500">Member Since</p>
            </div>
          </div>
        </Card>

        {/* Edit Profile Section */}
        <Card className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Profile Details</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs font-semibold text-primary-800 hover:text-primary-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Edit
                <ChevronRight size={14} />
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Full Name"
                icon={User}
                value={formData.name}
                onChange={handleInputChange('name')}
                placeholder="Your full name"
              />
              <Input
                label="Email"
                icon={Mail}
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="your@email.com"
              />
              <Input
                label="Phone"
                icon={Phone}
                type="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                placeholder="+91 99887 76655"
              />
              <div className="flex gap-3 pt-2">
                <Button
                  variant="primary"
                  icon={Save}
                  onClick={handleSave}
                  loading={saving}
                  fullWidth
                >
                  Save Changes
                </Button>
                <Button variant="ghost" onClick={handleCancel} className="shrink-0">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-[var(--radius-sm)]">
                <User size={16} className="text-slate-400 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Name</p>
                  <p className="text-sm text-slate-800">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-[var(--radius-sm)]">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Email</p>
                  <p className="text-sm text-slate-800">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-[var(--radius-sm)]">
                <Phone size={16} className="text-slate-400 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Phone</p>
                  <p className="text-sm text-slate-800">{user?.phone}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Logout Button */}
        <div className="pt-2 animate-fade-in-up">
          <Button
            variant="danger"
            icon={LogOut}
            fullWidth
            onClick={logout}
            size="lg"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
