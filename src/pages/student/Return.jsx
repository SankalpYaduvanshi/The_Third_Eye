import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../stores/bookingStore';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useAuthStore } from '../../stores/authStore';
import { Camera, Upload, CheckCircle, CreditCard, ArrowRight, Bike, Car } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import { formatDuration } from '../../utils/formatters';

const Return = () => {
  const navigate = useNavigate();
  const { activeBooking, completeBooking } = useBookingStore();
  const { markAvailable } = useVehicleStore();
  const { addLoyaltyPoints } = useAuthStore();
  const [step, setStep] = useState(1); // 1: odometer, 2: OTP, 3: summary, 4: paid
  const [odometerFile, setOdometerFile] = useState(null);
  const [otpInput, setOtpInput] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [paying, setPaying] = useState(false);

  if (!activeBooking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <EmptyState
          icon={Camera}
          title="No Active Ride to Return"
          description="Start a ride first before returning."
          actionLabel="Browse Vehicles"
          onAction={() => navigate('/browse')}
        />
      </div>
    );
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otpInput];
    newOtp[index] = value;
    setOtpInput(newOtp);
    setOtpError('');
    if (value && index < 3) {
      document.getElementById(`return-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpInput[index] && index > 0) {
      document.getElementById(`return-otp-${index - 1}`)?.focus();
    }
  };

  const verifyReturnOtp = () => {
    const entered = otpInput.join('');
    if (entered === activeBooking.returnOtp) {
      setStep(3);
    } else {
      setOtpError('Invalid OTP. Please check with the vendor.');
    }
  };

  const fare = {
    baseFare: activeBooking.totalFare || Math.round(activeBooking.baseFare * 1.5),
    distance: activeBooking.distanceKm || 12.5,
    duration: activeBooking.duration || 95,
    tax: Math.round((activeBooking.totalFare || activeBooking.baseFare * 1.5) * 0.12),
  };
  fare.total = fare.baseFare + fare.tax;

  const handlePay = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1500));
    completeBooking(activeBooking.id, {
      totalFare: fare.total,
      tax: fare.tax,
      distanceKm: fare.distance,
      duration: fare.duration,
      odometerEnd: (activeBooking.odometerStart || 5600) + Math.round(fare.distance),
      returnConfirmed: true,
    });
    markAvailable(activeBooking.vehicleId);
    addLoyaltyPoints(Math.floor(fare.total / 10));
    setPaying(false);
    setStep(4);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      <h1 className="text-xl font-black text-slate-900 mb-1">Return Vehicle</h1>
      <p className="text-sm text-slate-500 mb-6">Complete the return process</p>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {['Odometer', 'OTP', 'Summary', 'Done'].map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              step > i + 1 ? 'bg-success text-white' : step === i + 1 ? 'bg-primary-800 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? 'text-primary-800' : 'text-slate-400'}`}>{label}</span>
            {i < 3 && <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-success' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Odometer Photo */}
      {step === 1 && (
        <div className="animate-fade-in">
          <Card className="mb-6">
            <Card.Header><Card.Title>Upload Odometer Photo</Card.Title></Card.Header>
            <p className="text-sm text-slate-500 mb-4">Take a clear photo of the vehicle's odometer reading for fare verification.</p>
            <div
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all hover:border-primary-500 hover:bg-primary-50/30 ${
                odometerFile ? 'border-success bg-green-50/30' : 'border-slate-200'
              }`}
              onClick={() => document.getElementById('odometer-input').click()}
            >
              <input id="odometer-input" type="file" accept="image/*" onChange={(e) => setOdometerFile(e.target.files?.[0])} className="hidden" />
              {odometerFile ? (
                <>
                  <CheckCircle size={36} className="text-success mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-900">{odometerFile.name}</p>
                  <p className="text-xs text-slate-500 mt-1">Click to change</p>
                </>
              ) : (
                <>
                  <Camera size={36} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">Tap to capture or upload</p>
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 5MB</p>
                </>
              )}
            </div>
          </Card>
          <Button fullWidth size="lg" disabled={!odometerFile} onClick={() => setStep(2)} iconRight={ArrowRight}>
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Return OTP */}
      {step === 2 && (
        <div className="animate-fade-in">
          <Card className="mb-6">
            <Card.Header><Card.Title>Enter Return OTP</Card.Title></Card.Header>
            <p className="text-sm text-slate-500 mb-6">The vendor will provide a return OTP. Enter it below to confirm the vehicle return.</p>
            <div className="flex justify-center gap-3 mb-4">
              {otpInput.map((digit, i) => (
                <input
                  key={i}
                  id={`return-otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-14 h-16 text-center text-2xl font-black border-2 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all border-slate-200"
                />
              ))}
            </div>
            {otpError && <p className="text-center text-sm text-error font-medium animate-fade-in">{otpError}</p>}
            <p className="text-center text-xs text-slate-400 mt-3">Demo: use OTP <strong className="text-primary-800">{activeBooking.returnOtp}</strong></p>
          </Card>
          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setStep(1)}>Back</Button>
            <Button fullWidth disabled={otpInput.join('').length !== 4} onClick={verifyReturnOtp}>Verify OTP</Button>
          </div>
        </div>
      )}

      {/* Step 3: Final Fare Summary */}
      {step === 3 && (
        <div className="animate-fade-in">
          <Card className="mb-6 !p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-800 to-primary-700 p-5 text-white text-center">
              <p className="text-sm text-primary-200 mb-1">Final Amount</p>
              <p className="text-4xl font-black">₹{fare.total}</p>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  {activeBooking.vehicleType === 'bike' ? <Bike size={18} className="text-primary-700" /> : <Car size={18} className="text-primary-700" />}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{activeBooking.vehicleName}</p>
                  <p className="text-xs text-slate-500">{activeBooking.vendorName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-slate-50 text-center">
                  <p className="text-xs text-slate-500">Distance</p>
                  <p className="font-bold text-slate-900">{fare.distance.toFixed(1)} km</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-center">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="font-bold text-slate-900">{formatDuration(fare.duration)}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm pt-2">
                <div className="flex justify-between text-slate-600"><span>Base fare</span><span>₹{fare.baseFare}</span></div>
                <div className="flex justify-between text-slate-600"><span>GST (12%)</span><span>₹{fare.tax}</span></div>
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100"><span>Total</span><span className="text-primary-800 text-lg">₹{fare.total}</span></div>
              </div>
            </div>
          </Card>
          <Button variant="accent" fullWidth size="lg" loading={paying} onClick={handlePay} icon={CreditCard}>
            Pay ₹{fare.total}
          </Button>
        </div>
      )}

      {/* Step 4: Payment Success */}
      {step === 4 && (
        <div className="text-center py-10 animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={44} className="text-success" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Payment Successful! 🎉</h2>
          <p className="text-slate-500 mb-2">Your ride has been completed.</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full text-accent-600 text-sm font-semibold mb-8">
            +{Math.floor(fare.total / 10)} loyalty points earned
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <Button variant="outline" fullWidth onClick={() => navigate('/trips')}>View Trips</Button>
            <Button fullWidth onClick={() => navigate('/browse')} iconRight={ArrowRight}>Book Again</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Return;
