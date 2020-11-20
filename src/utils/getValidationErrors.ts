import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string;
}

export default function getValidationErrors(
  error: ValidationError,
): ValidationErrors {
  const validationErrors: ValidationErrors = {};

  error.inner.forEach(({ path, message }) => {
    validationErrors[path] = message;
  });

  return validationErrors;
}
