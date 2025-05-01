import { useState, useCallback } from 'react';
import * as yup from 'yup';

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationSchema - Yup validation schema
 * @param {Function} onSubmit - Function to call on form submission
 * @returns {Object} Object containing form values, errors, handlers, and submission function
 */
const useFormValidation = (initialValues, validationSchema, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input change
   * @param {string} name - Field name
   * @param {any} value - Field value
   */
  const handleChange = useCallback((name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Clear error when value changes
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  }, [errors]);

  /**
   * Handle input blur
   * @param {string} name - Field name
   */
  const handleBlur = useCallback((name) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    // Validate field on blur
    validateField(name);
  }, []);

  /**
   * Validate a single field
   * @param {string} name - Field name
   * @returns {boolean} Whether the field is valid
   */
  const validateField = useCallback(
    (name) => {
      try {
        const fieldSchema = yup.reach(validationSchema, name);
        fieldSchema.validateSync(values[name]);
        
        // Clear error if validation passes
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
        
        return true;
      } catch (err) {
        // Set error message
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: err.message,
        }));
        
        return false;
      }
    },
    [validationSchema, values]
  );

  /**
   * Validate all form fields
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = useCallback(() => {
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      // Set error messages for all invalid fields
      const validationErrors = {};
      
      if (err.inner) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      
      setErrors(validationErrors);
      return false;
    }
  }, [validationSchema, values]);

  /**
   * Handle form submission
   * @param {Event} event - Form submission event
   */
  const handleSubmit = useCallback(
    async (event) => {
      if (event) {
        event.preventDefault();
      }
      
      setIsSubmitting(true);
      
      // Mark all fields as touched
      const allTouched = Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);
      
      // Validate form
      const isValid = validateForm();
      
      if (isValid) {
        try {
          await onSubmit(values);
        } catch (err) {
          console.error('Form submission error:', err);
        }
      }
      
      setIsSubmitting(false);
    },
    [initialValues, onSubmit, validateForm, values]
  );

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};

export default useFormValidation;
