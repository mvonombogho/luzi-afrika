# How to Fix: Dynamic Route Parameter Conflict

This guide explains how to fix the following Next.js error:

```
Error: You cannot use different slug names for the same dynamic path ('id' !== 'slug').
```

## The Problem

In your project, you have two different dynamic path parameter names for the same route:
- `/src/app/services/[id]/page.tsx`
- `/src/app/services/[slug]/page.tsx`

Next.js doesn't allow different parameter names (`id` vs `slug`) for the same dynamic path segment.

## The Solution

You need to delete one of these directories and ensure consistent parameter usage throughout your app.

### Step 1: Delete the Conflicting Directory

Since most of your application uses `slug` as the parameter, we'll keep that one and delete the `[id]` directory.

1. Delete the entire directory: `/src/app/services/[id]`

   ```bash
   # From your project root
   rm -rf src/app/services/[id]
   ```

   If you're on Windows:
   ```bash
   rd /s /q src\app\services\[id]
   ```

2. Make sure there are no other directories with multiple parameter names in your app (e.g., check `/projects` or other routes).

### Step 2: Verify All References Use the Correct Parameter

Ensure all code references use the consistent parameter name:

1. In your `getService` function (or similar), use `params.slug` instead of `params.id` 
2. Make sure all links to service pages use the `/services/[slug]` format

### Step 3: If You Need ID-Based Lookups

If you need to look up data by ID, do it in your data fetching function rather than in the URL structure:

```typescript
// In your data fetching function
async function getServiceByIdOrSlug(slugOrId: string) {
  // Try to fetch by slug first
  const serviceBySlug = await sanityFetch({
    query: getServiceBySlugQuery,
    params: { slug: slugOrId },
  });
  
  if (serviceBySlug) return serviceBySlug;
  
  // Fallback to searching by ID if needed
  const serviceById = await sanityFetch({
    query: getServiceByIdQuery,
    params: { id: slugOrId },
  });
  
  return serviceById;
}
```

## Best Practices for Next.js Routes

1. **Consistent Parameter Names**: Use the same parameter name (`slug`, `id`, etc.) for the same type of resource across your app

2. **Descriptive Parameters**: Prefer descriptive names like `slug` over generic names like `id`

3. **URL Structure Planning**: Plan your URL structure in advance to ensure consistency

4. **Route Organization**: Group related routes together for easier maintenance

## Testing Your Fix

After making these changes:

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Check if the error is resolved

3. Test navigation to service detail pages to ensure they work correctly

## Need More Help?

If you continue to experience route conflicts, you might want to check:

1. If there are any catch-all routes (`[...paramName]` or `[[...paramName]]`) conflicting with your dynamic routes
2. If there are any hardcoded routes that conflict with your dynamic routes
3. If your Next.js configuration has any special route handling
