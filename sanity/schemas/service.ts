import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Server', value: 'server' },
          { title: 'Shield', value: 'shield' },
          { title: 'Database', value: 'database' },
          { title: 'Network', value: 'network' },
          { title: 'Monitor', value: 'monitor' },
          { title: 'Hard Drive', value: 'hardDrive' },
          { title: 'Brain', value: 'brain' },        // Added for AI services
          { title: 'Bot', value: 'bot' },            // Added for AI agents
          { title: 'Cloud', value: 'cloud' },        // Added for SaaS
          { title: 'Code', value: 'code' },          // Added for custom development
          { title: 'Sparkles', value: 'sparkles' },  // Added for innovation/AI
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      description: 'Show this service on the homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isAIService',
      title: 'AI Service',
      description: 'Is this an AI-powered service?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'IT Support', value: 'it-support' },
          { title: 'Infrastructure', value: 'infrastructure' },
          { title: 'Software', value: 'software' },
          { title: 'Security', value: 'security' },
          { title: 'AI Solutions', value: 'ai-solutions' },
          { title: 'SaaS Products', value: 'saas-products' },
          { title: 'Custom Development', value: 'custom-development' },
        ],
      },
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon' },
          ],
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      featured: 'featured',
      isAI: 'isAIService',
    },
    prepare(selection) {
      const { featured, isAI } = selection;
      return {
        ...selection,
        subtitle: `${featured ? 'Featured' : ''} ${isAI ? '• AI Service' : ''}`.trim(),
      };
    },
  },
});
