import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { BrandProfile } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: BrandProfile = await request.json();
    
    const {
      company_name,
      website,
      industry,
      product_description,
      campaign_goals,
      influencer_niche,
      audience_size,
      content_style,
      key_message,
      budget_range,
      pricing_model,
      campaign_start,
      campaign_duration,
      additional_info,
    } = body;

    // Validate required fields
    if (!company_name || !industry || !product_description || !campaign_goals.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pool = getPool();
    
    const result = await pool.query(
      `INSERT INTO brand_profiles
        (company_name, website, industry, product_description, campaign_goals, 
         influencer_niche, audience_size, content_style, key_message, 
         budget_range, pricing_model, campaign_start, campaign_duration, additional_info)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING id`,
      [
        company_name,
        website,
        industry,
        product_description,
        campaign_goals,
        influencer_niche,
        audience_size,
        content_style,
        key_message,
        budget_range,
        pricing_model,
        campaign_start,
        campaign_duration,
        additional_info,
      ]
    );

    return NextResponse.json(
      { success: true, id: result.rows[0].id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    );
  }
}