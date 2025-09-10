# Vercel Deployment Fix Guide

## Issues Fixed

### 1. GSAP SplitText Plugin Issue
**Problem**: SplitText requires a GSAP premium license for production use, causing 404 errors.
**Solution**: 
- Commented out SplitText import and registration
- Replaced with simple GSAP animations that work without premium plugins
- Maintained the same visual effect

### 2. Server-Side Rendering (SSR) Issues
**Problem**: WebGL/Three.js components can cause hydration mismatches
**Solution**:
- Added `useState` and `useEffect` for client-side mounting checks
- Added fallback loading state for SSR compatibility
- Prevented animations from running until component is mounted

### 3. Environment Configuration
**Problem**: Missing environment variables can cause API route failures
**Solution**: Ensure these environment variables are set in Vercel:

## Vercel Deployment Configuration

### Environment Variables
Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```
DATABASE_URL=your_neon_postgresql_connection_string
NODE_ENV=production
```

### Build Settings
```
Root Directory: brand-profile-app
Build Command: npm run build
Install Command: npm install
Output Directory: (leave empty - Next.js auto-detects)
```

### vercel.json Configuration
Created `vercel.json` with proper configuration for API routes and static files.

## Key Changes Made

### 1. InfiniteHero Component (`src/components/ui/infinite-hero.tsx`)
- ✅ Commented out SplitText import and usage
- ✅ Added client-side mounting check with useState/useEffect
- ✅ Added fallback gradient background for SSR
- ✅ Replaced SplitText animations with simple element animations
- ✅ Added isMounted dependency to useGSAP

### 2. Added vercel.json
- ✅ Proper function runtime configuration for API routes
- ✅ Rewrite rules for routing
- ✅ Build command specification

### 3. Created Fallback Landing Page
- ✅ Simple, production-safe landing page component
- ✅ No complex animations or premium dependencies
- ✅ Can be used as backup if needed

## Deployment Steps

1. **Update Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Navigate to Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon PostgreSQL connection string

2. **Verify Build Settings**
   - Root Directory: `brand-profile-app`
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: (leave empty)

3. **Deploy**
   - Push changes to your GitHub repository
   - Vercel will automatically redeploy
   - Check deployment logs for any remaining issues

## Testing Locally

Before deploying, verify everything works locally:

```bash
cd brand-profile-app
npm run lint         # Should pass with no errors
npm run build        # Should complete successfully
npm run start        # Should serve production build
```

## Fallback Option

If you still experience issues with the WebGL/GSAP components, you can temporarily use the simple landing page:

In `src/app/page.tsx`, replace:
```tsx
import InfiniteHero from '@/components/ui/infinite-hero';

export default function Home() {
  return <InfiniteHero />;
}
```

With:
```tsx
import SimpleLandingPage from '@/components/SimpleLandingPage';

export default function Home() {
  return <SimpleLandingPage />;
}
```

## Expected Result

After applying these fixes:
- ✅ No more 404 errors on the home page
- ✅ All animations work without premium GSAP plugins
- ✅ SSR compatibility maintained
- ✅ Form functionality preserved
- ✅ Database connectivity maintained
- ✅ Vercel build completes successfully

The app maintains all original functionality while being production-ready for Vercel deployment.