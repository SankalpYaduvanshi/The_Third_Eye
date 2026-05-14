import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useBookingStore } from '../../stores/bookingStore';
import { useAuthStore } from '../../stores/authStore';
import { mockVendors } from '../../mock/vendors';
import {
  Bike, Car, Star, MapPin, Fuel, Clock, Calendar, ArrowLeft,
  CheckCircle, Shield, ChevronLeft, ChevronRight, Zap,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import ErrorState from '../../components/ui/ErrorState';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getVehicleById } = useVehicleStore();
  const { createBooking } = useBookingStore();
  const { user, isAuthenticated } = useAuthStore();
  const vehicle = getVehicleById(id);
  const [selectedPricing, setSelectedPricing] = useState('hourly');
  const [booking, setBooking] = useState(false);

  if (!vehicle) {
    return <ErrorState title="Vehicle Not Found" description="This vehicle doesn't exist or has been removed." onRetry={() => navigate('/browse')} />;
  }

  const vendor = mockVendors.find((v) => v.id === vehicle.vendorId);

  const pricingOptions = [
    { key: 'hourly', label: 'Hourly', price: vehicle.pricing.hourly, desc: 'Per hour', icon: Clock },
    { key: 'halfDay', label: 'Half Day', price: vehicle.pricing.halfDay, desc: '6 hours', icon: Calendar },
    { key: 'fullDay', label: 'Full Day', price: vehicle.pricing.fullDay, desc: '12 hours', icon: Calendar },
    { key: 'perKm', label: 'Per KM', price: vehicle.pricing.perKm, desc: 'Per kilometer', icon: MapPin },
  ];

  const handleBook = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setBooking(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newBooking = createBooking({
      studentId: user.id,
      vendorId: vehicle.vendorId,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      vehicleType: vehicle.type,
      vendorName: vendor?.businessName || 'Unknown',
      pricingModel: selectedPricing,
      baseFare: pricingOptions.find((p) => p.key === selectedPricing)?.price || 0,
      tax: Math.round((pricingOptions.find((p) => p.key === selectedPricing)?.price || 0) * 0.12),
      totalFare: 0,
      startTime: new Date().toISOString(),
    });
    setBooking(false);
    navigate(`/booking/${newBooking.id}`);
  };

  // Generate mock availability for a 7-day calendar
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return {
      date: d,
      label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      day: d.getDate(),
      available: Math.random() > 0.3,
    };
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 cursor-pointer transition-colors">
        <ArrowLeft size={16} /> Back to browse
      </button>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left — Vehicle Info */}
        <div className="lg:col-span-3 space-y-6">
          {/* Photo Area */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 h-64 sm:h-80 flex items-center justify-center">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
              {vehicle.type === 'bike' ? <Bike size={56} className="text-primary-600" /> : <Car size={56} className="text-primary-600" />}
            </div>
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge color={vehicle.type === 'bike' ? 'primary' : 'accent'}>{vehicle.category}</Badge>
              <Badge color="success" dot>Available</Badge>
            </div>
          </div>

          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{vehicle.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-accent-500 fill-accent-500" />{vehicle.rating} ({vehicle.reviews} reviews)
              </div>
              <span className="flex items-center gap-1"><Fuel size={14} />{vehicle.fuelType}</span>
              <span>{vehicle.color} • {vehicle.year}</span>
              <span>{vehicle.mileage}</span>
            </div>
          </div>

          {/* Features */}
          <Card>
            <Card.Header><Card.Title>Features</Card.Title></Card.Header>
            <div className="flex flex-wrap gap-2">
              {vehicle.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary-800 text-xs font-medium">
                  <CheckCircle size={12} /> {f}
                </div>
              ))}
            </div>
          </Card>

          {/* Availability Calendar */}
          <Card>
            <Card.Header><Card.Title>Availability This Week</Card.Title></Card.Header>
            <div className="grid grid-cols-7 gap-2">
              {days.map((d, i) => (
                <div key={i} className={`text-center p-3 rounded-xl border transition-all ${
                  d.available
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-slate-100 bg-slate-50 text-slate-400'
                }`}>
                  <p className="text-xs font-medium">{d.label}</p>
                  <p className="text-lg font-bold">{d.day}</p>
                  <p className="text-[10px] mt-0.5">{d.available ? '✓ Open' : 'Booked'}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Vendor Info */}
          {vendor && (
            <Card>
              <Card.Header><Card.Title>Rental Shop</Card.Title></Card.Header>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center shrink-0">
                  <Shield size={24} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{vendor.businessName}</h4>
                    {vendor.isVerified && <Badge color="success" size="sm">Verified</Badge>}
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} /> {vendor.address}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Star size={11} className="text-accent-500 fill-accent-500" />{vendor.rating}</span>
                    <span>{vendor.totalReviews} reviews</span>
                    <span>{vendor.distance} km away</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right — Booking Panel */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <Card className="!p-0 overflow-hidden border-2 border-primary-100">
              <div className="bg-gradient-to-r from-primary-800 to-primary-700 p-5 text-white">
                <p className="text-sm text-primary-200 mb-1">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">₹{vehicle.pricing.hourly}</span>
                  <span className="text-primary-200">/hour</span>
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Pricing Options */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Select Pricing</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pricingOptions.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setSelectedPricing(opt.key)}
                        className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          selectedPricing === opt.key
                            ? 'border-primary-800 bg-primary-50'
                            : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <p className="text-xs text-slate-500">{opt.label}</p>
                        <p className="text-lg font-black text-slate-900">₹{opt.price}</p>
                        <p className="text-[10px] text-slate-400">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Base fare</span>
                    <span>₹{pricingOptions.find((p) => p.key === selectedPricing)?.price}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Deposit (refundable)</span>
                    <span>₹{vehicle.deposit}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (12%)</span>
                    <span>₹{Math.round((pricingOptions.find((p) => p.key === selectedPricing)?.price || 0) * 0.12)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100">
                    <span>Total</span>
                    <span>₹{Math.round((pricingOptions.find((p) => p.key === selectedPricing)?.price || 0) * 1.12)}</span>
                  </div>
                </div>

                <Button fullWidth size="lg" variant="accent" loading={booking} onClick={handleBook} icon={Zap}>
                  Book Now
                </Button>

                <p className="text-xs text-center text-slate-400">Free cancellation up to 1 hour before pickup</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
