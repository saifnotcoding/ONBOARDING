export interface BrandProfile {
  company_name: string;
  website: string;
  industry: string;
  product_description: string;
  campaign_goals: string[];
  influencer_niche: string;
  audience_size: string;
  content_style: string;
  key_message: string;
  budget_range: string;
  pricing_model: string;
  campaign_start: string;
  campaign_duration: string;
  additional_info: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
}

export const CAMPAIGN_GOALS = [
  'Awareness',
  'Conversions',
  'Sign-ups'
] as const;

export const AUDIENCE_SIZES = [
  'Micro (1K-10K)',
  'Mid-tier (10K-100K)',
  'Macro (100K-1M)',
  'Mega (1M+)'
] as const;

export const BUDGET_RANGES = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'Over $50,000'
] as const;

export const PRICING_MODELS = [
  'Flat fee',
  'Performance-based',
  'Hybrid'
] as const;

export const CONTENT_STYLES = [
  'Educational',
  'Entertainment',
  'Lifestyle',
  'Product-focused',
  'Story-driven',
  'Behind-the-scenes'
] as const;

export const CAMPAIGN_DURATIONS = [
  '1 week',
  '2-4 weeks',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Ongoing'
] as const;