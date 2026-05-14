import { create } from 'zustand';
import { mockStudents } from '../mock/students';
import { mockVendors } from '../mock/vendors';

export const useAuthStore = create((set, get) => ({
  user: null,
  role: null, // 'student' | 'vendor'
  isAuthenticated: false,

  loginAsStudent: (email, password) => {
    const student = mockStudents.find(
      (s) => s.email === email && s.password === password
    );
    if (student) {
      set({ user: { ...student }, role: 'student', isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  loginAsVendor: (email, password) => {
    const vendor = mockVendors.find(
      (v) => v.email === email && v.password === password
    );
    if (vendor) {
      set({ user: { ...vendor }, role: 'vendor', isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  signupAsStudent: (data) => {
    const newStudent = {
      id: `s${Date.now()}`,
      ...data,
      isVerified: false,
      profilePhoto: null,
      loyaltyPoints: 0,
      loyaltyTier: 'Bronze',
      referralCode: data.name.split(' ')[0].toUpperCase() + Math.floor(Math.random() * 9999),
      totalTrips: 0,
      totalSpent: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    set({ user: newStudent, role: 'student', isAuthenticated: true });
    return { success: true };
  },

  signupAsVendor: (data) => {
    const newVendor = {
      id: `v${Date.now()}`,
      ...data,
      isVerified: false,
      logo: null,
      totalVehicles: 0,
      activeRides: 0,
      rating: 0,
      totalReviews: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    set({ user: newVendor, role: 'vendor', isAuthenticated: true });
    return { success: true };
  },

  verifyCollegeId: () => {
    set((state) => ({
      user: { ...state.user, isVerified: true },
    }));
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: { ...state.user, ...updates },
    }));
  },

  addLoyaltyPoints: (points) => {
    set((state) => {
      const newPoints = (state.user?.loyaltyPoints || 0) + points;
      let tier = 'Bronze';
      if (newPoints >= 1000) tier = 'Platinum';
      else if (newPoints >= 500) tier = 'Gold';
      else if (newPoints >= 200) tier = 'Silver';
      return {
        user: { ...state.user, loyaltyPoints: newPoints, loyaltyTier: tier },
      };
    });
  },

  logout: () => {
    set({ user: null, role: null, isAuthenticated: false });
  },
}));
