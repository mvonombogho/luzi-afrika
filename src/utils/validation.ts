import { z } from 'zod';
import { errorTracker } from './errorTracking';

export class ValidationError extends Error {
  public errors: z.ZodError['errors'];

  constructor(message: string, errors: z.ZodError['errors']) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export async function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context?: string
): Promise<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Track validation errors but don't throw in production
      errorTracker.captureException(error, 'DataValidation', {
        context,
        data,
        validationErrors: error.errors
      });

      throw new ValidationError('Data validation failed', error.errors);
    }
    throw error;
  }
}

export function formatValidationErrors(errors: z.ZodError['errors']): string[] {
  return errors.map(error => {
    const path = error.path.join('.');
    return `${path}: ${error.message}`;
  });
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

// Helper function to handle validation errors in components
export function handleValidationError(error: unknown): string[] {
  if (isValidationError(error)) {
    return formatValidationErrors(error.errors);
  }
  return ['An unexpected error occurred'];
}

// Type guard for runtime type checking
export function assertType<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context?: string
): asserts data is T {
  try {
    schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Type assertion failed${context ? ` in ${context}` : ''}`,
        error.errors
      );
    }
    throw error;
  }
}