/**
 * Calculate fare based on pricing model and ride parameters.
 */
export const calculateFare = (pricing, model, duration, distanceKm) => {
  let baseFare = 0;

  switch (model) {
    case 'hourly':
      baseFare = Math.ceil(duration / 60) * pricing.hourly;
      break;
    case 'halfDay':
      baseFare = pricing.halfDay;
      break;
    case 'fullDay':
      baseFare = pricing.fullDay;
      break;
    case 'perKm':
      baseFare = distanceKm * pricing.perKm;
      break;
    default:
      baseFare = pricing.hourly;
  }

  const tax = Math.round(baseFare * 0.12); // 12% GST
  const totalFare = baseFare + tax;

  return { baseFare, tax, totalFare };
};

/**
 * Calculate extra km charges if applicable.
 */
export const calculateExtraKmCharge = (pricing, model, distanceKm) => {
  const includedKm = {
    hourly: 15,
    halfDay: 60,
    fullDay: 120,
    perKm: Infinity,
  };

  const included = includedKm[model] || 0;
  const extraKm = Math.max(0, distanceKm - included);
  return extraKm * pricing.perKm;
};

/**
 * Format fare to Indian Rupee string.
 */
export const formatFare = (amount) => {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

/**
 * Get pricing label for display.
 */
export const getPricingLabel = (model) => {
  const labels = {
    hourly: 'Per Hour',
    halfDay: 'Half Day (6hrs)',
    fullDay: 'Full Day (12hrs)',
    perKm: 'Per Kilometer',
  };
  return labels[model] || model;
};
