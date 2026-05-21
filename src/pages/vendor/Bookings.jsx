import { useState } from 'react';
import { useBookingStore } from '../../stores/bookingStore';
import { useAuthStore } from '../../stores/authStore';
import { CalendarCheck, CheckCircle, Clock, Bike, Car, Search, KeyRound } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import { formatDateTime } from '../../utils/formatters';

const Bookings = () => {
  const { user } = useAuthStore();
  const { bookings, confirmPickup, confirmReturn } = useBookingStore();
  const [tab, setTab] = useState('upcoming');
  const [otpModal, setOtpModal] = useState(null); // { bookingId, type: 'pickup' | 'return' }
  const [otpInput, setOtpInput] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);

  const vendorBookings = bookings.filter(() => true); // Show all for demo
  const filtered = vendorBookings.filter((b) => {
    if (tab === 'upcoming') return b.status === 'upcoming';
    if (tab === 'active') return b.status === 'active';
    if (tab === 'completed') return b.status === 'completed';
    return true;
  });

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const next = [...otpInput];
    next[index] = value;
    setOtpInput(next);
    setOtpError('');
    if (value && index < 3) document.getElementById(`vendor-otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpInput[index] && index > 0) {
      document.getElementById(`vendor-otp-${index - 1}`)?.focus();
    }
  };

  const verifyOtp = () => {
    if (!otpModal) return;
    const entered = otpInput.join('');
    let result;
    if (otpModal.type === 'pickup') {
      result = confirmPickup(otpModal.bookingId, entered);
    } else {
      result = confirmReturn(otpModal.bookingId, entered);
    }
    if (result.success) {
      setOtpSuccess(true);
      setTimeout(() => {
        setOtpModal(null);
        setOtpInput(['', '', '', '']);
        setOtpSuccess(false);
      }, 1500);
    } else {
      setOtpError(result.error || 'Invalid OTP');
    }
  };

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: vendorBookings.filter((b) => b.status === 'upcoming').length },
    { key: 'active', label: 'Active', count: vendorBookings.filter((b) => b.status === 'active').length },
    { key: 'completed', label: 'Past', count: vendorBookings.filter((b) => b.status === 'completed').length },
  ];

  const statusColor = { upcoming: 'warning', active: 'success', completed: 'neutral' };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl animate-fade-in">
      <h1 className="text-2xl font-black text-slate-900 mb-1">Bookings</h1>
      <p className="text-slate-500 text-sm mb-6">Manage bookings and verify OTPs</p>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              tab === t.key ? 'bg-white text-primary-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${tab === t.key ? 'bg-primary-100 text-primary-700' : 'bg-slate-200 text-slate-500'}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Booking List */}
      {filtered.length === 0 ? (
        <EmptyState icon={CalendarCheck} title={`No ${tab} bookings`} description="Bookings will appear here when students make reservations." />
      ) : (
        <div className="space-y-3 stagger-children">
          {filtered.map((booking) => (
            <Card key={booking.id} className="!p-0 overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Left info */}
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      {booking.vehicleType === 'bike' ? <Bike size={18} className="text-primary-700" /> : <Car size={18} className="text-primary-700" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900">{booking.vehicleName}</h3>
                        <Badge color={statusColor[booking.status]} size="sm" dot>{booking.status}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Student: {booking.studentId} • {booking.pricingModel}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={11} />{formatDateTime(booking.startTime)}</span>
                        {booking.totalFare > 0 && <span className="font-semibold text-slate-600">₹{booking.totalFare}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* OTP Actions */}
                {(booking.status === 'upcoming' || booking.status === 'active') && (
                  <div className="flex sm:flex-col gap-2 p-4 sm:p-5 sm:border-l border-t sm:border-t-0 border-slate-100 bg-slate-50/50 sm:w-44 justify-center">
                    {booking.status === 'upcoming' && !booking.pickupConfirmed && (
                      <Button size="sm" variant="accent" fullWidth icon={KeyRound} onClick={() => { setOtpModal({ bookingId: booking.id, type: 'pickup' }); setOtpInput(['', '', '', '']); setOtpError(''); setOtpSuccess(false); }}>
                        Verify Pickup
                      </Button>
                    )}
                    {booking.status === 'active' && !booking.returnConfirmed && (
                      <Button size="sm" variant="primary" fullWidth icon={KeyRound} onClick={() => { setOtpModal({ bookingId: booking.id, type: 'return' }); setOtpInput(['', '', '', '']); setOtpError(''); setOtpSuccess(false); }}>
                        Verify Return
                      </Button>
                    )}
                    {booking.pickupConfirmed && booking.status === 'active' && (
                      <Badge color="success" size="sm">Pickup ✓</Badge>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* OTP Verification Modal */}
      <Modal isOpen={!!otpModal} onClose={() => setOtpModal(null)} title={`Verify ${otpModal?.type === 'pickup' ? 'Pickup' : 'Return'} OTP`} size="sm">
        {otpSuccess ? (
          <div className="text-center py-4 animate-scale-in">
            <CheckCircle size={48} className="text-success mx-auto mb-3" />
            <p className="font-bold text-slate-900">OTP Verified! ✓</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-6">Enter the OTP shown on the student's app to confirm {otpModal?.type}.</p>
            <div className="flex justify-center gap-3 mb-4">
              {otpInput.map((digit, i) => (
                <input key={i} id={`vendor-otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} className="w-14 h-16 text-center text-2xl font-black border-2 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 border-slate-200" />
              ))}
            </div>
            {otpError && <p className="text-center text-sm text-error font-medium mb-3">{otpError}</p>}
            <Button fullWidth onClick={verifyOtp} disabled={otpInput.join('').length !== 4}>Verify OTP</Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Bookings;
