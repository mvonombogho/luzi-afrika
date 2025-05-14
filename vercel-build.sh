#!/bin/bash

# This script is used by Vercel during deployment to build the project

# Set environment variables for build
export NEXT_SKIP_TYPECHECK=1
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production

# Disable React concurrent features that can cause issues with framer-motion
export DISABLE_REACT_CONCURRENT=true

# Disable SSG rendering for static files
export NEXT_DISABLE_SSG_COMPONENTS=true

# Turn off static optimization
export NEXT_STATIC_GEN_BAILOUT=true

# Print some debug information
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"
echo "Starting build with environment:"
echo "NEXT_PUBLIC_SANITY_PROJECT_ID: $NEXT_PUBLIC_SANITY_PROJECT_ID"
echo "NEXT_PUBLIC_SANITY_DATASET: $NEXT_PUBLIC_SANITY_DATASET"
echo "FROM_EMAIL is set: $(if [ -n "$FROM_EMAIL" ]; then echo "YES"; else echo "NO"; fi)"
echo "TO_EMAIL is set: $(if [ -n "$TO_EMAIL" ]; then echo "YES"; else echo "NO"; fi)"
echo "RESEND_API_KEY is set: $(if [ -n "$RESEND_API_KEY" ]; then echo "YES"; else echo "NO"; fi)"

# Run the build command
echo "Running next build with --no-lint flag"
next build --no-lint
