import { useState, useCallback } from 'react';
import { generateOTP, validateOTP } from '../utils/otpGenerator';

/**
 * Custom hook for OTP generation and validation.
 */
export const useOTP = () => {
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState('');

  const generate = useCallback(() => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setIsValid(null);
    setError('');
    return newOtp;
  }, []);

  const validate = useCallback(
    (inputOtp, expectedOtp) => {
      const target = expectedOtp || generatedOtp;
      if (!target) {
        setError('No OTP to validate against');
        setIsValid(false);
        return false;
      }
      const valid = validateOTP(inputOtp, target);
      setIsValid(valid);
      setError(valid ? '' : 'Invalid OTP. Please try again.');
      return valid;
    },
    [generatedOtp]
  );

  const reset = useCallback(() => {
    setOtp('');
    setGeneratedOtp(null);
    setIsValid(null);
    setError('');
  }, []);

  return {
    otp,
    setOtp,
    generatedOtp,
    isValid,
    error,
    generate,
    validate,
    reset,
  };
};
