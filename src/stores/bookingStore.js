import { create } from 'zustand';
import { mockBookings } from '../mock/bookings';
import { generateOTP } from '../utils/otpGenerator';

export const useBookingStore = create((set, get) => ({
  bookings: [...mockBookings],
  activeBooking: mockBookings.find((b) => b.status === 'active') || null,

  createBooking: (bookingData) => {
    const pickupOtp = generateOTP();
    const returnOtp = generateOTP();
    const newBooking = {
      ...bookingData,
      id: `b${Date.now()}`,
      status: 'upcoming',
      pickupOtp,
      returnOtp,
      pickupConfirmed: false,
      returnConfirmed: false,
      odometerStart: null,
      odometerEnd: null,
      distanceKm: 0,
      duration: null,
      extraKmCharge: 0,
      rating: null,
      review: null,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }));
    return newBooking;
  },

  confirmPickup: (bookingId, otp) => {
    const booking = get().bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, error: 'Booking not found' };
    if (booking.pickupOtp !== otp) return { success: false, error: 'Invalid OTP' };

    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'active', pickupConfirmed: true, startTime: new Date().toISOString() }
          : b
      ),
      activeBooking: { ...booking, status: 'active', pickupConfirmed: true, startTime: new Date().toISOString() },
    }));
    return { success: true };
  },

  confirmReturn: (bookingId, otp) => {
    const booking = get().bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, error: 'Booking not found' };
    if (booking.returnOtp !== otp) return { success: false, error: 'Invalid OTP' };

    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, returnConfirmed: true } : b
      ),
    }));
    return { success: true };
  },

  updateActiveFare: (distanceKm, totalFare, duration) => {
    set((state) => {
      if (!state.activeBooking) return state;
      const updated = { ...state.activeBooking, distanceKm, totalFare, duration };
      return {
        activeBooking: updated,
        bookings: state.bookings.map((b) =>
          b.id === updated.id ? updated : b
        ),
      };
    });
  },

  completeBooking: (bookingId, finalData) => {
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId
          ? { ...b, ...finalData, status: 'completed', endTime: new Date().toISOString() }
          : b
      ),
      activeBooking: null,
    }));
  },

  startRide: (bookingId) => {
    const booking = get().bookings.find((b) => b.id === bookingId);
    if (booking) {
      const updated = { ...booking, status: 'active', startTime: new Date().toISOString() };
      set((state) => ({
        bookings: state.bookings.map((b) => b.id === bookingId ? updated : b),
        activeBooking: updated,
      }));
    }
  },

  getBookingsByStudent: (studentId) => {
    return get().bookings.filter((b) => b.studentId === studentId);
  },

  getBookingsByVendor: (vendorId) => {
    return get().bookings.filter((b) => b.vendorId === vendorId);
  },

  getUpcomingBookings: (vendorId) => {
    return get().bookings.filter((b) => b.vendorId === vendorId && b.status === 'upcoming');
  },

  getActiveBookings: (vendorId) => {
    return get().bookings.filter((b) => b.vendorId === vendorId && b.status === 'active');
  },

  getCompletedBookings: (vendorId) => {
    return get().bookings.filter((b) => b.vendorId === vendorId && b.status === 'completed');
  },
}));
