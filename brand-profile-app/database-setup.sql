-- Brand Profile Evaluation Database Setup
-- Run this script in your Neon PostgreSQL database

-- Create the brand_profiles table
CREATE TABLE IF NOT EXISTS brand_profiles (
    id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    website TEXT,
    industry TEXT NOT NULL,
    product_description TEXT NOT NULL,
    campaign_goals TEXT[] NOT NULL,  -- Array of campaign goals
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

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_brand_profiles_created_at ON brand_profiles(created_at);

-- Create index on company_name for faster searches
CREATE INDEX IF NOT EXISTS idx_brand_profiles_company_name ON brand_profiles(company_name);

-- Create index on industry for analytics
CREATE INDEX IF NOT EXISTS idx_brand_profiles_industry ON brand_profiles(industry);

-- Verify table creation
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'brand_profiles'
ORDER BY ordinal_position;