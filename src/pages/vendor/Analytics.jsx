import { useState } from 'react';
import { useVendorStore } from '../../stores/vendorStore';
import { useBookingStore } from '../../stores/bookingStore';
import { useAuthStore } from '../../stores/authStore';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
} from 'recharts';
import { TrendingUp, DollarSign, Bike, Car, CalendarCheck, ArrowUpRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { dailyRevenue, weeklyRevenue, monthlyRevenue, ridesPerVehicle, peakHours } from '../../mock/analytics';

const COLORS = ['#1E3A8A', '#F97316', '#22C55E', '#8B5CF6', '#EF4444', '#06B6D4'];

const Analytics = () => {
  const { user } = useAuthStore();
  const { getEarningsSummary } = useVendorStore();
  const { bookings } = useBookingStore();
  const [period, setPeriod] = useState('week');
  const earnings = getEarningsSummary(user?.id || 'v1');

  const chartData = period === 'day' ? dailyRevenue : period === 'week' ? weeklyRevenue : monthlyRevenue;

  const summaryCards = [
    { label: 'Total Revenue', value: `₹${earnings.totalRevenue.toLocaleString()}`, change: '+12.5%', icon: DollarSign, color: 'from-blue-500 to-primary-800' },
    { label: 'Total Rides', value: earnings.totalRides, change: '+8.2%', icon: CalendarCheck, color: 'from-accent-500 to-accent-700' },
    { label: 'Avg per Ride', value: `₹${Math.round(earnings.totalRevenue / Math.max(earnings.totalRides, 1))}`, change: '+3.1%', icon: TrendingUp, color: 'from-green-500 to-green-700' },
    { label: 'Vehicles', value: earnings.vehicleCount, change: '0%', icon: Bike, color: 'from-purple-500 to-purple-700' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Analytics</h1>
          <p className="text-slate-500 text-sm">Track your earnings and performance</p>
        </div>
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
          {['day', 'week', 'month'].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${period === p ? 'bg-white text-primary-800 shadow-sm' : 'text-slate-500'}`}>
              {p === 'day' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-children">
        {summaryCards.map((card) => (
          <Card key={card.label} className="!p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon size={18} className="text-white" />
              </div>
              <span className="flex items-center gap-0.5 text-xs text-green-600 font-semibold">
                <ArrowUpRight size={12} />{card.change}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{card.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header><Card.Title>Revenue Trend</Card.Title></Card.Header>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#1E3A8A" strokeWidth={2.5} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Rides Per Vehicle */}
        <Card>
          <Card.Header><Card.Title>Rides Per Vehicle</Card.Title></Card.Header>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ridesPerVehicle} cx="50%" cy="50%" outerRadius={90} innerRadius={55} dataKey="rides" paddingAngle={3}>
                  {ridesPerVehicle.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {ridesPerVehicle.slice(0, 4).map((v, i) => (
              <div key={v.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-slate-600 truncate flex-1">{v.name}</span>
                <span className="font-semibold text-slate-900">{v.rides}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Peak Hours + Rides Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header><Card.Title>Peak Hours</Card.Title></Card.Header>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="bookings" fill="#F97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <Card.Header><Card.Title>Rides Trend</Card.Title></Card.Header>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="rides" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
