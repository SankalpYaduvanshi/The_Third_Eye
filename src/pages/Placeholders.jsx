const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-500">Coming soon...</p>
    </div>
  </div>
);

// Student pages (will be replaced in tasks 2-5)
export const Landing = () => <PlaceholderPage title="Landing Page" />;
export const Login = () => <PlaceholderPage title="Student Login" />;
export const Signup = () => <PlaceholderPage title="Student Signup" />;
export const Browse = () => <PlaceholderPage title="Browse Vehicles" />;
export const VehicleDetail = () => <PlaceholderPage title="Vehicle Detail" />;
export const BookingConfirmation = () => <PlaceholderPage title="Booking Confirmation" />;
export const ActiveRide = () => <PlaceholderPage title="Active Ride" />;
export const Return = () => <PlaceholderPage title="Return Vehicle" />;
export const TripHistory = () => <PlaceholderPage title="Trip History" />;
export const Profile = () => <PlaceholderPage title="My Profile" />;

// Vendor pages (will be replaced in tasks 6-8)
export const VendorLogin = () => <PlaceholderPage title="Vendor Login" />;
export const VendorSignup = () => <PlaceholderPage title="Vendor Signup" />;
export const VendorDashboard = () => <PlaceholderPage title="Vendor Dashboard" />;
export const Inventory = () => <PlaceholderPage title="Inventory Management" />;
export const VehicleForm = () => <PlaceholderPage title="Add/Edit Vehicle" />;
export const VendorBookings = () => <PlaceholderPage title="Vendor Bookings" />;
export const Analytics = () => <PlaceholderPage title="Analytics" />;
export const GeofenceAlerts = () => <PlaceholderPage title="Geofence Alerts" />;
