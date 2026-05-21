import { useState, useMemo } from 'react';
import { useBookingStore } from '../../stores/bookingStore';
import { useAuthStore } from '../../stores/authStore';
import { formatDate, formatDuration, formatDistance, getStarRating } from '../../utils/formatters';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import {
  Bike,
  Car,
  Calendar,
  MapPin,
  Clock,
  Star,
  StarHalf,
  History,
  Filter,
  IndianRupee,
  TrendingUp,
} from 'lucide-react';

const DATE_FILTERS = [
  { key: 'all', label: 'All Time' },
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
];

const statusColorMap = {
  completed: 'success',
  active: 'accent',
  upcoming: 'info',
  cancelled: 'error',
};

const StarRating = ({ rating }) => {
  const { full, half, empty } = getStarRating(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} size={14} className="text-amber-400 fill-amber-400" />
      ))}
      {half > 0 && <StarHalf size={14} className="text-amber-400 fill-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} size={14} className="text-slate-200" />
      ))}
      <span className="ml-1 text-xs font-medium text-slate-500">{rating}</span>
    </div>
  );
};

const TripCard = ({ booking }) => {
  const VehicleIcon = booking.vehicleType === 'car' ? Car : Bike;

  return (
    <Card hover className="group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`
            w-11 h-11 rounded-[var(--radius-sm)] flex items-center justify-center
            transition-colors duration-200
            ${booking.vehicleType === 'car'
              ? 'bg-primary-50 text-primary-800 group-hover:bg-primary-100'
              : 'bg-accent-50 text-accent-500 group-hover:bg-accent-100'
            }
          `}>
            <VehicleIcon size={22} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm leading-tight truncate">
              {booking.vehicleName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">{booking.vendorName}</p>
          </div>
        </div>
        <Badge color={statusColorMap[booking.status] || 'neutral'} size="sm" dot>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Calendar size={13} className="text-slate-400 shrink-0" />
          <span>{formatDate(booking.startTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <MapPin size={13} className="text-slate-400 shrink-0" />
          <span>{formatDistance(booking.distanceKm)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Clock size={13} className="text-slate-400 shrink-0" />
          <span>{formatDuration(booking.duration)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
          <IndianRupee size={13} className="text-slate-400 shrink-0" />
          <span>₹{booking.totalFare}</span>
        </div>
      </div>

      {/* Footer: Rating & Review */}
      {booking.rating && (
        <div className="pt-3 border-t border-slate-100">
          <StarRating rating={booking.rating} />
          {booking.review && (
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
              "{booking.review}"
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

const TripHistory = () => {
  const { user } = useAuthStore();
  const bookings = useBookingStore((s) => s.bookings);
  const [dateFilter, setDateFilter] = useState('all');

  const filteredTrips = useMemo(() => {
    const studentBookings = bookings.filter(
      (b) => b.studentId === user?.id && b.status === 'completed'
    );

    if (dateFilter === 'all') return studentBookings;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return studentBookings.filter((b) => {
      const date = new Date(b.startTime);
      if (dateFilter === 'week') return date >= startOfWeek;
      if (dateFilter === 'month') return date >= startOfMonth;
      return true;
    });
  }, [bookings, user?.id, dateFilter]);

  // Aggregate stats
  const stats = useMemo(() => {
    const allCompleted = bookings.filter(
      (b) => b.studentId === user?.id && b.status === 'completed'
    );
    return {
      totalTrips: allCompleted.length,
      totalSpent: allCompleted.reduce((sum, b) => sum + (b.totalFare || 0), 0),
      totalDistance: allCompleted.reduce((sum, b) => sum + (b.distanceKm || 0), 0),
    };
  }, [bookings, user?.id]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white px-4 pt-8 pb-14 sm:px-6">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <History size={24} className="text-primary-200" />
            <h1 className="text-2xl font-bold">Trip History</h1>
          </div>
          <p className="text-primary-200 text-sm">Review all your past rides</p>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-[var(--radius-sm)] p-3 text-center">
              <p className="text-2xl font-bold">{stats.totalTrips}</p>
              <p className="text-xs text-primary-200 mt-0.5">Rides</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-[var(--radius-sm)] p-3 text-center">
              <p className="text-2xl font-bold">₹{stats.totalSpent.toLocaleString()}</p>
              <p className="text-xs text-primary-200 mt-0.5">Spent</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-[var(--radius-sm)] p-3 text-center">
              <p className="text-2xl font-bold">{stats.totalDistance}</p>
              <p className="text-xs text-primary-200 mt-0.5">km Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8">
        {/* Date Filter */}
        <Card className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={15} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Filter by Date</span>
          </div>
          <div className="flex gap-2">
            {DATE_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setDateFilter(f.key)}
                className={`
                  px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer
                  ${dateFilter === f.key
                    ? 'bg-primary-800 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Trip Cards or Empty State */}
        {filteredTrips.length === 0 ? (
          <EmptyState
            icon={History}
            title="No trips found"
            description={
              dateFilter === 'all'
                ? "You haven't completed any rides yet. Book your first ride today!"
                : 'No rides found for the selected time period. Try a different filter.'
            }
            actionLabel={dateFilter !== 'all' ? 'Show All' : undefined}
            onAction={dateFilter !== 'all' ? () => setDateFilter('all') : undefined}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 animate-fade-in">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-700">{filteredTrips.length}</span>{' '}
                {filteredTrips.length === 1 ? 'trip' : 'trips'}
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <TrendingUp size={13} />
                <span>Recent first</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children pb-8">
              {filteredTrips
                .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                .map((trip) => (
                  <div key={trip.id} className="animate-fade-in-up">
                    <TripCard booking={trip} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TripHistory;
