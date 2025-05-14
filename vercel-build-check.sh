#!/bin/bash
# This script is intended to be used with Vercel's "Ignored Build Step" setting
# It always returns a non-zero exit code (1) which tells Vercel to proceed with the build

# If you want to use this script in Vercel's Ignored Build Step setting, set it to:
# bash -c "false"

# This ensures the build always proceeds
exit 0
