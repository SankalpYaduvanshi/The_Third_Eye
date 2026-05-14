import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBookingStore } from '../../stores/bookingStore';
import { CheckCircle, Copy, MapPin, Clock, ArrowRight, Bike, Car } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ErrorState from '../../components/ui/ErrorState';
import { formatDateTime } from '../../utils/formatters';

const BookingConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings } = useBookingStore();
  const booking = bookings.find((b) => b.id === id);
  const [otpCopied, setOtpCopied] = useState(false);

  if (!booking) {
    return <ErrorState title="Booking Not Found" description="This booking doesn't exist." onRetry={() => navigate('/browse')} />;
  }

  const copyOtp = () => {
    navigator.clipboard?.writeText(booking.pickupOtp);
    setOtpCopied(true);
    setTimeout(() => setOtpCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in-up">
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5 animate-scale-in">
          <CheckCircle size={44} className="text-success" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Booking Confirmed! 🎉</h1>
        <p className="text-slate-500">Your ride is reserved. Show the OTP to the vendor for pickup.</p>
      </div>

      {/* OTP Card */}
      <Card className="!p-0 overflow-hidden mb-6 border-2 border-accent-200">
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 p-6 text-white text-center">
          <p className="text-sm text-accent-100 mb-2 font-medium">Your Pickup OTP</p>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-2">
              {booking.pickupOtp.split('').map((digit, i) => (
                <div key={i} className="w-14 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl font-black">
                  {digit}
                </div>
              ))}
            </div>
            <button
              onClick={copyOtp}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
              title="Copy OTP"
            >
              <Copy size={18} />
            </button>
          </div>
          {otpCopied && (
            <p className="text-xs text-accent-100 mt-2 animate-fade-in">Copied to clipboard!</p>
          )}
        </div>
      </Card>

      {/* Booking Details */}
      <Card className="mb-6">
        <Card.Header>
          <Card.Title>Booking Details</Card.Title>
        </Card.Header>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              {booking.vehicleType === 'bike' ? <Bike size={22} className="text-primary-700" /> : <Car size={22} className="text-primary-700" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{booking.vehicleName}</h3>
              <p className="text-sm text-slate-500">{booking.vendorName}</p>
            </div>
            <Badge color="accent" className="ml-auto">{booking.pricingModel}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-slate-50">
              <p className="text-slate-500 text-xs mb-0.5">Booking ID</p>
              <p className="font-semibold text-slate-900">{booking.id}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <p className="text-slate-500 text-xs mb-0.5">Status</p>
              <Badge color="warning" dot>{booking.status}</Badge>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <p className="text-slate-500 text-xs mb-0.5">Booked At</p>
              <p className="font-semibold text-slate-900 text-xs">{formatDateTime(booking.createdAt)}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <p className="text-slate-500 text-xs mb-0.5">Base Fare</p>
              <p className="font-semibold text-slate-900">₹{booking.baseFare}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Pickup Instructions */}
      <Card className="mb-8">
        <Card.Header><Card.Title>Pickup Instructions</Card.Title></Card.Header>
        <div className="space-y-3">
          {[
            { icon: MapPin, text: 'Go to the rental shop location shown in your booking.' },
            { icon: CheckCircle, text: 'Show your Pickup OTP to the vendor to confirm handover.' },
            { icon: Clock, text: 'Your ride timer starts once the vendor confirms the OTP.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <item.icon size={18} className="text-primary-600 shrink-0 mt-0.5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" fullWidth onClick={() => navigate('/browse')}>
          Browse More
        </Button>
        <Button variant="primary" fullWidth onClick={() => navigate('/trips')} iconRight={ArrowRight}>
          View My Trips
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
