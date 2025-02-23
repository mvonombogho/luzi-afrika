import { z } from 'zod';
import { validateData, ValidationError, handleValidationError, isValidationError, formatValidationErrors } from '../validation';
import { errorTracker } from '../errorTracking';

// Mock error tracking
jest.mock('../errorTracking', () => ({
  errorTracker: {
    captureException: jest.fn(),
  },
}));

describe('Validation Utils', () => {
  // Test schema
  const testSchema = z.object({
    name: z.string().min(2),
    age: z.number().min(18),
    email: z.string().email(),
  });

  // Valid test data
  const validData = {
    name: 'John',
    age: 25,
    email: 'john@example.com',
  };

  describe('validateData', () => {
    it('validates correct data successfully', async () => {
      const result = await validateData(testSchema, validData);
      expect(result).toEqual(validData);
    });

    it('throws ValidationError for invalid data', async () => {
      const invalidData = {
        name: 'J', // too short
        age: 16,   // under 18
        email: 'invalid-email', // invalid email
      };

      await expect(validateData(testSchema, invalidData)).rejects.toThrow(ValidationError);
    });

    it('tracks validation errors in production', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const invalidData = {
        name: 'J',
        age: 16,
        email: 'invalid-email',
      };

      try {
        await validateData(testSchema, invalidData, 'TestContext');
      } catch (error) {
        expect(errorTracker.captureException).toHaveBeenCalled();
      }

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('ValidationError', () => {
    it('creates ValidationError with correct properties', () => {
      const errors = [{ path: ['name'], message: 'Too short' }];
      const error = new ValidationError('Test error', errors);

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('ValidationError');
      expect(error.message).toBe('Test error');
      expect(error.errors).toEqual(errors);
    });
  });

  describe('handleValidationError', () => {
    it('formats validation errors correctly', () => {
      const errors = [
        { path: ['name'], message: 'Too short' },
        { path: ['age'], message: 'Must be over 18' },
      ];
      const error = new ValidationError('Test error', errors);

      const result = handleValidationError(error);
      expect(result).toEqual(['name: Too short', 'age: Must be over 18']);
    });

    it('returns generic error message for non-validation errors', () => {
      const result = handleValidationError(new Error('Random error'));
      expect(result).toEqual(['An unexpected error occurred']);
    });
  });

  describe('isValidationError', () => {
    it('correctly identifies ValidationError', () => {
      const validationError = new ValidationError('Test error', []);
      const regularError = new Error('Test error');

      expect(isValidationError(validationError)).toBe(true);
      expect(isValidationError(regularError)).toBe(false);
      expect(isValidationError(null)).toBe(false);
      expect(isValidationError(undefined)).toBe(false);
      expect(isValidationError({ message: 'fake error' })).toBe(false);
    });
  });

  describe('formatValidationErrors', () => {
    it('formats validation errors into readable messages', () => {
      const errors = [
        { path: ['user', 'name'], message: 'Required' },
        { path: ['user', 'email'], message: 'Invalid email' },
      ];

      const formatted = formatValidationErrors(errors);
      expect(formatted).toEqual([
        'user.name: Required',
        'user.email: Invalid email',
      ]);
    });

    it('handles empty error array', () => {
      const formatted = formatValidationErrors([]);
      expect(formatted).toEqual([]);
    });

    it('handles nested paths correctly', () => {
      const errors = [
        { path: ['user', 'address', 'street'], message: 'Required' },
      ];

      const formatted = formatValidationErrors(errors);
      expect(formatted).toEqual(['user.address.street: Required']);
    });
  });
});