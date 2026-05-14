import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateFare, calculateExtraKmCharge } from '../utils/fareCalculator';

/**
 * Custom hook for simulating a live fare meter during an active ride.
 * Increments distance and recalculates fare every second.
 */
export const useFareMeter = (pricing, pricingModel, isRunning = false) => {
  const [distanceKm, setDistanceKm] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentFare, setCurrentFare] = useState({ baseFare: 0, tax: 0, totalFare: 0 });
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      // Simulate ~0.01-0.03 km per second (36-108 km/h avg with stops)
      setDistanceKm((prev) => {
        const increment = 0.008 + Math.random() * 0.02;
        return Math.round((prev + increment) * 1000) / 1000;
      });
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setDistanceKm(0);
    setElapsedSeconds(0);
    setCurrentFare({ baseFare: 0, tax: 0, totalFare: 0 });
  }, [stop]);

  // Recalculate fare whenever distance or time changes
  useEffect(() => {
    if (!pricing) return;
    const durationMinutes = Math.floor(elapsedSeconds / 60);
    const fare = calculateFare(pricing, pricingModel, durationMinutes, distanceKm);
    const extraKm = calculateExtraKmCharge(pricing, pricingModel, distanceKm);
    setCurrentFare({
      baseFare: fare.baseFare + extraKm,
      tax: fare.tax,
      totalFare: fare.totalFare + extraKm,
    });
  }, [distanceKm, elapsedSeconds, pricing, pricingModel]);

  // Auto-start if isRunning is true
  useEffect(() => {
    if (isRunning) start();
    else stop();
    return () => stop();
  }, [isRunning, start, stop]);

  return {
    distanceKm,
    elapsedSeconds,
    elapsedMinutes: Math.floor(elapsedSeconds / 60),
    currentFare,
    start,
    stop,
    reset,
    isRunning: !!intervalRef.current,
  };
};
