// Daily revenue data (last 30 days)
export const dailyRevenue = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    label: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    revenue: Math.floor(Math.random() * 3000) + 500,
    rides: Math.floor(Math.random() * 12) + 1,
  };
});

// Weekly revenue
export const weeklyRevenue = [
  { week: 'Week 1', revenue: 12400, rides: 34 },
  { week: 'Week 2', revenue: 15800, rides: 42 },
  { week: 'Week 3', revenue: 11200, rides: 29 },
  { week: 'Week 4', revenue: 18600, rides: 51 },
];

// Monthly revenue
export const monthlyRevenue = [
  { month: 'Jan', revenue: 42000, rides: 120 },
  { month: 'Feb', revenue: 38000, rides: 105 },
  { month: 'Mar', revenue: 51000, rides: 145 },
  { month: 'Apr', revenue: 47000, rides: 132 },
  { month: 'May', revenue: 55000, rides: 156 },
];

// Rides per vehicle
export const ridesPerVehicle = [
  { vehicle: 'Honda Activa', rides: 127, revenue: 31750 },
  { vehicle: 'RE Classic 350', rides: 94, revenue: 47000 },
  { vehicle: 'TVS Jupiter', rides: 56, revenue: 12320 },
  { vehicle: 'Ola S1 Pro', rides: 23, revenue: 6440 },
];

// Peak hours
export const peakHours = [
  { hour: '6 AM', rides: 3 }, { hour: '7 AM', rides: 8 },
  { hour: '8 AM', rides: 15 }, { hour: '9 AM', rides: 22 },
  { hour: '10 AM', rides: 18 }, { hour: '11 AM', rides: 12 },
  { hour: '12 PM', rides: 9 }, { hour: '1 PM', rides: 7 },
  { hour: '2 PM', rides: 10 }, { hour: '3 PM', rides: 14 },
  { hour: '4 PM', rides: 20 }, { hour: '5 PM', rides: 25 },
  { hour: '6 PM', rides: 19 }, { hour: '7 PM', rides: 13 },
  { hour: '8 PM', rides: 8 }, { hour: '9 PM', rides: 5 },
];

// Cancellation stats
export const cancellationStats = {
  total: 156,
  cancelled: 12,
  rate: 7.7,
  reasons: [
    { reason: 'Change of plans', count: 5 },
    { reason: 'Found alternative', count: 3 },
    { reason: 'Vehicle not available', count: 2 },
    { reason: 'Pricing concern', count: 2 },
  ],
};

// Geofence alerts mock data
export const mockGeofenceAlerts = [
  {
    id: 'gf1', vehicleId: 'vh1', vehicleName: 'Honda Activa 6G',
    studentName: 'Arjun Mehta', severity: 'warning',
    distanceFromZone: 0.5, message: 'Vehicle approaching zone boundary',
    timestamp: new Date(Date.now() - 120000).toISOString(), acknowledged: false,
    location: { lat: 12.9716, lng: 79.1590 },
  },
  {
    id: 'gf2', vehicleId: 'vh4', vehicleName: 'Maruti Swift',
    studentName: 'Meera Iyer', severity: 'critical',
    distanceFromZone: 1.2, message: 'Vehicle has exited allowed zone!',
    timestamp: new Date(Date.now() - 60000).toISOString(), acknowledged: false,
    location: { lat: 12.8231, lng: 80.0452 },
  },
  {
    id: 'gf3', vehicleId: 'vh7', vehicleName: 'Bajaj Pulsar 150',
    studentName: 'Rohan Singh', severity: 'info',
    distanceFromZone: 2.0, message: 'Vehicle within safe zone',
    timestamp: new Date(Date.now() - 300000).toISOString(), acknowledged: true,
    location: { lat: 28.3644, lng: 75.5876 },
  },
];
