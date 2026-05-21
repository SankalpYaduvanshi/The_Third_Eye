import { useAuthStore } from '../../stores/authStore';
import { useBookingStore } from '../../stores/bookingStore';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useVendorStore } from '../../stores/vendorStore';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Bike, Car, Star, Plus, CalendarCheck,
  DollarSign, Activity, ArrowRight,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { getActiveBookings, getBookingsByVendor } = useBookingStore();
  const { getVehiclesByVendor } = useVehicleStore();
  const { getEarningsSummary } = useVendorStore();

  const vendorId = user?.id || 'v1';
  const activeBookings = getActiveBookings(vendorId);
  const allBookings = getBookingsByVendor(vendorId);
  const vehicles = getVehiclesByVendor(vendorId);
  const earnings = getEarningsSummary(vendorId);
  const availableCount = vehicles.filter((v) => v.isAvailable && v.manualOverride !== false).length;

  const stats = [
    { label: 'Rides Today', value: earnings.todayRides, icon: Activity, color: 'from-blue-500 to-primary-800', bg: 'bg-blue-50' },
    { label: 'Revenue Today', value: `₹${earnings.todayRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-accent-500 to-accent-700', bg: 'bg-orange-50' },
    { label: 'Active Vehicles', value: `${availableCount}/${vehicles.length}`, icon: Bike, color: 'from-green-500 to-green-700', bg: 'bg-green-50' },
    { label: 'Avg Rating', value: user?.rating || '4.5', icon: Star, color: 'from-purple-500 to-purple-700', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Welcome back, {user?.ownerName || 'Vendor'} 👋
        </h1>
        <p className="text-slate-500 mt-1">{user?.businessName || 'Your Dashboard'}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-children">
        {stats.map((stat) => (
          <Card key={stat.label} className="!p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={18} className="text-white" />
              </div>
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Bookings */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <Card.Title>Active Bookings</Card.Title>
                <Link to="/vendor/bookings">
                  <Badge color="primary" className="cursor-pointer hover:opacity-80">View All →</Badge>
                </Link>
              </div>
            </Card.Header>
            {activeBookings.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">No active bookings right now</p>
            ) : (
              <div className="space-y-3">
                {activeBookings.slice(0, 4).map((booking) => (
                  <div key={booking.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                      {booking.vehicleType === 'bike' ? <Bike size={18} className="text-primary-700" /> : <Car size={18} className="text-primary-700" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{booking.vehicleName}</p>
                      <p className="text-xs text-slate-500">Student: {booking.studentId}</p>
                    </div>
                    <Badge color="success" dot size="sm">Active</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions + Vehicle Status */}
        <div className="space-y-6">
          <Card>
            <Card.Header><Card.Title>Quick Actions</Card.Title></Card.Header>
            <div className="space-y-2">
              <Link to="/vendor/vehicle/new">
                <Button variant="accent" fullWidth icon={Plus} size="md">Add Vehicle</Button>
              </Link>
              <Link to="/vendor/bookings">
                <Button variant="outline" fullWidth icon={CalendarCheck} size="md">View Bookings</Button>
              </Link>
            </div>
          </Card>

          <Card>
            <Card.Header><Card.Title>Vehicle Status</Card.Title></Card.Header>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Available</span>
                <span className="text-sm font-bold text-green-600">{availableCount}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                  style={{ width: `${vehicles.length > 0 ? (availableCount / vehicles.length) * 100 : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Unavailable</span>
                <span className="text-sm font-bold text-red-500">{vehicles.length - availableCount}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
