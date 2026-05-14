import { create } from 'zustand';
import { mockVehicles } from '../mock/vehicles';

export const useVehicleStore = create((set, get) => ({
  vehicles: [...mockVehicles],

  getAvailableVehicles: (filters = {}) => {
    let results = get().vehicles.filter((v) => {
      // Check effective availability
      const isEffectivelyAvailable =
        v.manualOverride !== false && v.isAvailable;
      if (!isEffectivelyAvailable) return false;

      // Apply filters
      if (filters.type && v.type !== filters.type) return false;
      if (filters.vendorId && v.vendorId !== filters.vendorId) return false;
      if (filters.minPrice && v.pricing.hourly < filters.minPrice) return false;
      if (filters.maxPrice && v.pricing.hourly > filters.maxPrice) return false;
      if (filters.category && v.category !== filters.category) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !v.name.toLowerCase().includes(q) &&
          !v.category.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    if (filters.sortBy === 'price-low') {
      results.sort((a, b) => a.pricing.hourly - b.pricing.hourly);
    } else if (filters.sortBy === 'price-high') {
      results.sort((a, b) => b.pricing.hourly - a.pricing.hourly);
    } else if (filters.sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  },

  getVehicleById: (id) => {
    return get().vehicles.find((v) => v.id === id);
  },

  getVehiclesByVendor: (vendorId) => {
    return get().vehicles.filter((v) => v.vendorId === vendorId);
  },

  toggleAvailability: (vehicleId) => {
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === vehicleId
          ? {
              ...v,
              manualOverride: v.manualOverride === false ? null : false,
              isAvailable: v.manualOverride === false ? true : false,
            }
          : v
      ),
    }));
  },

  markUnavailable: (vehicleId, bookingBlock) => {
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === vehicleId
          ? {
              ...v,
              isAvailable: false,
              bookingBlocks: [...v.bookingBlocks, bookingBlock],
            }
          : v
      ),
    }));
  },

  markAvailable: (vehicleId) => {
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === vehicleId
          ? { ...v, isAvailable: true, manualOverride: null }
          : v
      ),
    }));
  },

  addVehicle: (vehicle) => {
    const newVehicle = {
      ...vehicle,
      id: `vh${Date.now()}`,
      isAvailable: true,
      manualOverride: null,
      bookingBlocks: [],
      totalRides: 0,
      rating: 0,
      reviews: 0,
    };
    set((state) => ({
      vehicles: [...state.vehicles, newVehicle],
    }));
    return newVehicle;
  },

  editVehicle: (vehicleId, updates) => {
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === vehicleId ? { ...v, ...updates } : v
      ),
    }));
  },

  removeVehicle: (vehicleId) => {
    set((state) => ({
      vehicles: state.vehicles.filter((v) => v.id !== vehicleId),
    }));
  },
}));
