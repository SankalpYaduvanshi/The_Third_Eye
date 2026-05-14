/**
 * Generate a random 4-digit OTP.
 */
export const generateOTP = () => {
  return String(Math.floor(1000 + Math.random() * 9000));
};

/**
 * Validate an OTP against expected value.
 */
export const validateOTP = (input, expected) => {
  return input === expected;
};
