# Deployment Guide for Vercel

## Prerequisites

1. **Neon PostgreSQL Database**: Set up your Neon database and get the connection string
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **Vercel Account**: Sign up at vercel.com

## Database Setup

1. **Create Neon Database**: 
   - Go to [Neon Console](https://console.neon.tech/)
   - Create a new project
   - Copy the connection string

2. **Run Database Schema**:
   ```sql
   CREATE TABLE brand_profiles (
       id SERIAL PRIMARY KEY,
       company_name TEXT NOT NULL,
       website TEXT,
       industry TEXT NOT NULL,
       product_description TEXT NOT NULL,
       campaign_goals TEXT[] NOT NULL,
       influencer_niche TEXT NOT NULL,
       audience_size TEXT NOT NULL,
       content_style TEXT NOT NULL,
       key_message TEXT NOT NULL,
       budget_range TEXT NOT NULL,
       pricing_model TEXT NOT NULL,
       campaign_start DATE NOT NULL,
       campaign_duration TEXT NOT NULL,
       additional_info TEXT,
       created_at TIMESTAMP DEFAULT NOW()
   );
   ```

## Vercel Deployment Steps

### 1. Push to Git Repository

```bash
git add .
git commit -m "Initial commit: Brand Profile Evaluation App"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3. Environment Variables

In Vercel project settings, add:

```
DATABASE_URL=postgresql://username:password@host:5432/database_name?sslmode=require
```

Replace with your actual Neon database connection string.

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## Verification Checklist

- [ ] Database connection string is correct
- [ ] Environment variable is set in Vercel
- [ ] All pages load correctly:
  - [ ] `/` - Landing page
  - [ ] `/form` - Multi-step form
  - [ ] `/success` - Success confirmation
- [ ] Form submission works and saves to database
- [ ] API endpoint `/api/saveProfile` responds correctly

## Post-Deployment

1. **Test the application** thoroughly
2. **Monitor logs** in Vercel dashboard for any issues
3. **Set up analytics** if needed
4. **Configure custom domain** (optional)

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify `DATABASE_URL` format
   - Ensure SSL mode is set correctly
   - Check Neon database status

2. **Build Failures**:
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Review build logs in Vercel

3. **API Route Issues**:
   - Ensure API routes are in correct directory structure
   - Verify request/response formats
   - Check server logs

### Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)

## Security Notes

- Never commit `.env.local` or sensitive credentials
- Use environment variables for all secrets
- Enable CORS protection if needed
- Implement rate limiting for production use