# Debugging Dynamic Route Issues in Luzi Afrika

## Current Issue

If you're seeing the following error:

```
Error: You cannot use different slug names for the same dynamic path ('id' !== 'slug').
    at handleSlug (C:\Users\Admin\Downloads\luzi-afrika-main\luzi-afrika-main\node_modules\next\dist\shared\lib\router\utils\sorted-routes.js:94:31)
```

This is due to a conflict between two dynamic route folders with different parameter names at the same level of the routing structure.

## Root Cause

The error occurs because Next.js found two competing dynamic route folders:
- `/src/app/services/[id]` 
- `/src/app/services/[slug]`

These both try to handle the same URL pattern (like `/services/some-service`), but use different parameter names.

## Step-by-Step Fix

1. **Manually delete the conflicting directory**:
   ```bash
   rm -rf src/app/services/[id]
   ```
   
   If using Windows Command Prompt:
   ```
   rmdir /s /q "src\app\services\[id]"
   ```

   Or simply delete the folder using your file explorer.

2. **Clean the Next.js cache**:
   ```bash
   npm run clean
   # or 
   rm -rf .next
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Why This Fix Works

We've updated the routing system to use a consistent approach:

1. All service detail pages now use the `[slug]` dynamic parameter
2. The service links in `src/app/services/page.tsx` now properly link to `/services/[slug-value]`
3. The service detail page in `src/app/services/[slug]/page.tsx` now correctly handles both Sanity CMS data and local fallback data

## Changes Made to Fix This Issue

1. **Updated Services Data**: Added proper `slug` properties to all local services data.
2. **Fixed Links**: Updated the links in the services list page to use `service.slug?.current || service.id`.
3. **Enhanced Error Handling**: Improved the service detail page to better handle data fetching and fallbacks.
4. **Documentation**: Added detailed explanation and fix guides.

## If You Still Have Issues

If you're still encountering the error after following these steps, ensure:

1. You've completely removed the `[id]` directory from your local filesystem.
2. No other dynamic route conflicts exist in the project.
3. You're using the latest code from the repository.

For further assistance, please consult the Next.js documentation on dynamic routes or create an issue in the project repository.
