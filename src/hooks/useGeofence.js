import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for simulating geofence monitoring.
 * Generates random position updates and checks against a zone radius.
 */
export const useGeofence = (zoneCenter = { lat: 12.9716, lng: 79.1590 }, radiusKm = 5) => {
  const [currentPosition, setCurrentPosition] = useState(zoneCenter);
  const [distanceFromCenter, setDistanceFromCenter] = useState(0);
  const [isOutsideZone, setIsOutsideZone] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const intervalRef = useRef(null);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const startMonitoring = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentPosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.48) * 0.005,
        lng: prev.lng + (Math.random() - 0.48) * 0.005,
      }));
    }, 3000);
  }, []);

  const stopMonitoring = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    const dist = calculateDistance(
      zoneCenter.lat, zoneCenter.lng,
      currentPosition.lat, currentPosition.lng
    );
    setDistanceFromCenter(Math.round(dist * 100) / 100);
    const outside = dist > radiusKm;
    setIsOutsideZone(outside);

    if (outside) {
      setAlerts((prev) => [
        {
          id: Date.now(),
          message: `Vehicle is ${dist.toFixed(1)}km from zone center`,
          severity: dist > radiusKm * 1.5 ? 'critical' : 'warning',
          timestamp: new Date().toISOString(),
        },
        ...prev.slice(0, 9),
      ]);
    }
  }, [currentPosition, zoneCenter, radiusKm]);

  useEffect(() => {
    return () => stopMonitoring();
  }, [stopMonitoring]);

  return {
    currentPosition,
    distanceFromCenter,
    isOutsideZone,
    alerts,
    startMonitoring,
    stopMonitoring,
  };
};
