import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 'test_key_in_development');

// Get email addresses from environment variables
const fromEmail = process.env.FROM_EMAIL || 'no-reply@example.com';
const toEmail = process.env.TO_EMAIL || 'info@luzi-afrika.com';

// Define validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  service: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the data
    const validatedData = contactFormSchema.parse(body);
    
    // Format the email content
    const { name, email, phone, company, message, service } = validatedData;
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Email configuration:', { fromEmail, toEmail, resendApiKey: process.env.RESEND_API_KEY ? 'Set' : 'Not set' });
    }
    
    // Skip actual sending in development if API key not set
    if (!process.env.RESEND_API_KEY && process.env.NODE_ENV === 'development') {
      console.log('Would send email with data:', validatedData);
      return NextResponse.json(
        { message: 'Email would be sent in production' },
        { status: 200 }
      );
    }
    
    // Send the email using Resend
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${service ? `<p><strong>Service Interested In:</strong> ${service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    return NextResponse.json(
      { message: 'Email sent successfully', id: result.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
