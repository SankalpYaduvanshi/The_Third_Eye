import { create } from 'zustand';
import { mockGeofenceAlerts, dailyRevenue, weeklyRevenue, monthlyRevenue, ridesPerVehicle, peakHours, cancellationStats } from '../mock/analytics';

export const useVendorStore = create((set, get) => ({
  geofenceAlerts: [...mockGeofenceAlerts],
  analyticsData: {
    dailyRevenue,
    weeklyRevenue,
    monthlyRevenue,
    ridesPerVehicle,
    peakHours,
    cancellationStats,
  },

  addAlert: (alert) => {
    const newAlert = {
      ...alert,
      id: `gf${Date.now()}`,
      timestamp: new Date().toISOString(),
      acknowledged: false,
    };
    set((state) => ({
      geofenceAlerts: [newAlert, ...state.geofenceAlerts],
    }));
  },

  acknowledgeAlert: (alertId) => {
    set((state) => ({
      geofenceAlerts: state.geofenceAlerts.map((a) =>
        a.id === alertId ? { ...a, acknowledged: true } : a
      ),
    }));
  },

  dismissAlert: (alertId) => {
    set((state) => ({
      geofenceAlerts: state.geofenceAlerts.filter((a) => a.id !== alertId),
    }));
  },

  getEarningsSummary: (vendorId) => {
    const { analyticsData } = get();
    const today = analyticsData.dailyRevenue[analyticsData.dailyRevenue.length - 1];
    return {
      todayRevenue: today?.revenue || 0,
      todayRides: today?.rides || 0,
      weeklyTotal: analyticsData.weeklyRevenue.reduce((s, w) => s + w.revenue, 0),
      monthlyTotal: analyticsData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0),
    };
  },
}));
