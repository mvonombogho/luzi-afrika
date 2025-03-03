import { NextResponse } from 'next/server';
import { projectId, dataset, apiVersion } from '@/sanity/lib/client';

export async function GET() {
  return NextResponse.json({
    sanityConfig: {
      projectId,
      dataset,
      apiVersion,
      // Don't return the actual token for security reasons
      hasToken: !!process.env.SANITY_API_TOKEN,
    },
    envStatus: {
      nodeEnv: process.env.NODE_ENV,
    }
  });
}