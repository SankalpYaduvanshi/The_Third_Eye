import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../stores/bookingStore';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useFareMeter } from '../../hooks/useFareMeter';
import {
  Navigation, Clock, Gauge, DollarSign, MapPin,
  AlertTriangle, Square, Bike, Car, Shield,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';

const ActiveRide = () => {
  const navigate = useNavigate();
  const { activeBooking, updateActiveFare } = useBookingStore();
  const { getVehicleById } = useVehicleStore();
  const [showGeofenceAlert, setShowGeofenceAlert] = useState(false);

  const vehicle = activeBooking ? getVehicleById(activeBooking.vehicleId) : null;
  const pricing = vehicle?.pricing || { hourly: 40, halfDay: 150, fullDay: 250, perKm: 5 };

  const {
    distanceKm, elapsedSeconds, currentFare, start, stop,
  } = useFareMeter(pricing, activeBooking?.pricingModel || 'perKm', !!activeBooking);

  // Sync fare to store
  useEffect(() => {
    if (activeBooking && distanceKm > 0) {
      updateActiveFare(distanceKm, currentFare.totalFare, Math.floor(elapsedSeconds / 60));
    }
  }, [distanceKm, currentFare.totalFare, elapsedSeconds]);

  if (!activeBooking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <EmptyState
          icon={Navigation}
          title="No Active Ride"
          description="You don't have an active ride right now. Book a vehicle to get started."
          actionLabel="Browse Vehicles"
          onAction={() => navigate('/browse')}
        />
      </div>
    );
  }

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndRide = () => {
    stop();
    navigate('/return');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-slate-900">Active Ride</h1>
          <p className="text-sm text-slate-500">Your ride is in progress</p>
        </div>
        <Badge color="success" dot size="lg">Live</Badge>
      </div>

      {/* Map Placeholder */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 via-blue-50 to-slate-100 h-48 sm:h-64 mb-6 border border-slate-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-800 flex items-center justify-center mx-auto mb-3 shadow-lg animate-bounce-subtle">
              <Navigation size={24} className="text-white" />
            </div>
            <p className="text-sm font-medium text-primary-800">Live Tracking</p>
            <p className="text-xs text-slate-500">Map view simulated</p>
          </div>
        </div>
        {/* Fake road lines */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-300 opacity-30" />
        <div className="absolute bottom-6 left-[15%] right-[15%] h-0.5 bg-primary-400 opacity-20" />
        {/* Vehicle indicator */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 bg-white rounded-full shadow-md text-xs font-semibold text-primary-800 flex items-center gap-1.5">
            {activeBooking.vehicleType === 'bike' ? <Bike size={14} /> : <Car size={14} />}
            {activeBooking.vehicleName}
          </div>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="!p-4 text-center">
          <Clock size={18} className="text-primary-600 mx-auto mb-1.5" />
          <p className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums animate-counter-tick" key={elapsedSeconds}>
            {formatTime(elapsedSeconds)}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Elapsed</p>
        </Card>
        <Card className="!p-4 text-center">
          <Gauge size={18} className="text-accent-600 mx-auto mb-1.5" />
          <p className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums animate-counter-tick" key={Math.floor(distanceKm * 10)}>
            {distanceKm.toFixed(1)}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Kilometers</p>
        </Card>
        <Card className="!p-4 text-center border-2 border-accent-200 bg-accent-50/30">
          <DollarSign size={18} className="text-accent-600 mx-auto mb-1.5" />
          <p className="text-xl sm:text-2xl font-black text-accent-600 tabular-nums animate-counter-tick" key={Math.floor(currentFare.totalFare)}>
            ₹{Math.round(currentFare.totalFare)}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Fare</p>
        </Card>
      </div>

      {/* Fare Breakdown */}
      <Card className="mb-6">
        <Card.Header><Card.Title>Live Fare Breakdown</Card.Title></Card.Header>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Base fare ({activeBooking.pricingModel})</span>
            <span className="font-medium">₹{Math.round(currentFare.baseFare)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>GST (12%)</span>
            <span className="font-medium">₹{Math.round(currentFare.tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100">
            <span>Running Total</span>
            <span className="text-accent-600 text-lg">₹{Math.round(currentFare.totalFare)}</span>
          </div>
        </div>
      </Card>

      {/* Geofence Alert */}
      {showGeofenceAlert && (
        <div className="mb-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-800">Geofence Warning</p>
              <p className="text-xs text-yellow-700 mt-0.5">You are approaching the boundary of the allowed zone. Please stay within the designated area to avoid extra charges.</p>
            </div>
            <button onClick={() => setShowGeofenceAlert(false)} className="text-yellow-600 hover:text-yellow-800 text-xs font-medium cursor-pointer shrink-0">Dismiss</button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={() => setShowGeofenceAlert(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-yellow-200 bg-yellow-50 text-yellow-700 text-sm font-semibold hover:bg-yellow-100 transition-colors cursor-pointer"
        >
          <Shield size={16} />
          Test Geofence Alert
        </button>
        <Button variant="danger" fullWidth size="lg" icon={Square} onClick={handleEndRide}>
          End Ride
        </Button>
      </div>
    </div>
  );
};

export default ActiveRide;
