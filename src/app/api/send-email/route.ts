import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/schemas/contact';

// Initialize Resend with API key
// In production, use environment variable
const resend = new Resend(process.env.RESEND_API_KEY || 'mock_api_key');

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the data with Zod schema
    const validatedData = contactFormSchema.parse(body);
    
    // Format the email data
    const { name, email, company, message } = validatedData;
    
    // If we're in development mode or testing, log instead of sending
    if (process.env.NODE_ENV === 'development' || !process.env.RESEND_API_KEY) {
      console.log('Would send email with data:', validatedData);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Email would be sent in production' 
      });
    }
    
    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use a verified domain in production
      to: 'info@luziafrika.com', // Replace with your recipient email
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not provided'}
        
        Message:
        ${message}
      `,
    });
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      id: emailResponse.id
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    
    // Handle validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}