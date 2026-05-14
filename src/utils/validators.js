/**
 * Validate email format.
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate password strength (min 6 chars).
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate phone number (Indian format).
 */
export const isValidPhone = (phone) => {
  const re = /^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;
  return re.test(phone.replace(/\s/g, ''));
};

/**
 * Validate required field.
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

/**
 * Validate a form object; returns object with field => error message.
 */
export const validateForm = (fields, rules) => {
  const errors = {};
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      const error = rule(fields[field], fields);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  return errors;
};
