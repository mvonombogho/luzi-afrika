import { projectSchema, projectMetaSchema, testimonialSchema } from '../project';
import { z } from 'zod';

describe('Project Schemas', () => {
  describe('testimonialSchema', () => {
    const validTestimonial = {
      quote: 'Great service!',
      author: 'John Doe',
      position: 'CEO',
      company: 'Tech Corp',
    };

    it('validates correct testimonial data', () => {
      const result = testimonialSchema.safeParse(validTestimonial);
      expect(result.success).toBe(true);
    });

    it('requires all fields', () => {
      const invalidData = {
        quote: 'Great service!',
        // missing other fields
      };

      const result = testimonialSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors).toHaveLength(3);
      }
    });

    it('rejects empty strings', () => {
      const invalidData = {
        quote: '',
        author: '',
        position: '',
        company: '',
      };

      const result = testimonialSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors).toHaveLength(4);
      }
    });
  });

  describe('projectSchema', () => {
    const validProject = {
      slug: 'test-project',
      title: 'Test Project',
      category: 'Software',
      description: 'A test project',
      image: 'https://example.com/image.jpg',
      client: 'Test Client',
      duration: '3 months',
      completionDate: '2025-01',
      services: ['Service 1', 'Service 2'],
      challenge: 'The challenge description',
      solution: 'The solution description',
      results: ['Result 1', 'Result 2'],
      technologies: ['Tech 1', 'Tech 2'],
    };

    it('validates correct project data', () => {
      const result = projectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it('validates project with optional fields', () => {
      const projectWithOptionals = {
        ...validProject,
        testimonial: {
          quote: 'Great work!',
          author: 'John Doe',
          position: 'CEO',
          company: 'Tech Corp',
        },
        gallery: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      };

      const result = projectSchema.safeParse(projectWithOptionals);
      expect(result.success).toBe(true);
    });

    it('requires all mandatory fields', () => {
      const invalidData = {
        slug: 'test-project',
        // missing other required fields
      };

      const result = projectSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('validates image URLs', () => {
      const invalidData = {
        ...validProject,
        image: 'not-a-url',
      };

      const result = projectSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Invalid image URL');
      }
    });

    it('requires non-empty arrays for services, results, and technologies', () => {
      const invalidData = {
        ...validProject,
        services: [],
        results: [],
        technologies: [],
      };

      const result = projectSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors).toHaveLength(3);
      }
    });

    it('validates gallery URLs when present', () => {
      const invalidData = {
        ...validProject,
        gallery: ['not-a-url', 'also-not-a-url'],
      };

      const result = projectSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Invalid gallery image URL');
      }
    });
  });

  describe('projectMetaSchema', () => {
    const validProjectMeta = {
      slug: 'test-project',
      title: 'Test Project',
      category: 'Software',
      description: 'A test project',
      image: 'https://example.com/image.jpg',
    };

    it('validates correct project meta data', () => {
      const result = projectMetaSchema.safeParse(validProjectMeta);
      expect(result.success).toBe(true);
    });

    it('requires all fields', () => {
      const invalidData = {
        slug: 'test-project',
        // missing other fields
      };

      const result = projectMetaSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('validates image URL', () => {
      const invalidData = {
        ...validProjectMeta,
        image: 'not-a-url',
      };

      const result = projectMetaSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Invalid image URL');
      }
    });
  });
});