'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactCard } from '@/components/ui/contact-card';
import { FallingPattern } from '@/components/ui/falling-pattern';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ProgressIndicator from './ProgressIndicator';
import { BrandProfile, CAMPAIGN_GOALS, AUDIENCE_SIZES, BUDGET_RANGES, PRICING_MODELS, CONTENT_STYLES, CAMPAIGN_DURATIONS } from '@/types';
import { Building2, Package, Target, Users, MessageSquare, DollarSign, Calendar, FileText } from 'lucide-react';

const FORM_STEPS = [
  'Company Info',
  'Product/Service', 
  'Campaign Goals',
  'Influencer Preferences',
  'Content & Messaging',
  'Budget & Model',
  'Timeline',
  'Additional Info'
];

// const STEP_ICONS = [
//   Building2,
//   Package,
//   Target,
//   Users,
//   MessageSquare,
//   DollarSign,
//   Calendar,
//   FileText
// ];

export default function ModernMultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BrandProfile>({
    company_name: '',
    website: '',
    industry: '',
    product_description: '',
    campaign_goals: [],
    influencer_niche: '',
    audience_size: '',
    content_style: '',
    key_message: '',
    budget_range: '',
    pricing_model: '',
    campaign_start: '',
    campaign_duration: '',
    additional_info: ''
  });

  const handleInputChange = (field: keyof BrandProfile, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/saveProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/success');
      } else {
        console.error('Failed to save profile');
        alert('Failed to save profile. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return {
          title: 'Company Information',
          description: 'Tell us about your company to help us understand your brand better.',
          contactInfo: [
            { icon: Building2, label: 'Step', value: '1 of 8' },
            { icon: Target, label: 'Focus', value: 'Brand Identity' }
          ],
          form: (
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Company Name *</Label>
                <Input 
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="Enter your company name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Website</Label>
                <Input 
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Industry *</Label>
                <Input 
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="e.g., Fashion, Technology, Food & Beverage"
                  required
                />
              </div>
            </div>
          )
        };

      case 2:
        return {
          title: 'Product/Service',
          description: 'Describe what you offer and who your target audience is.',
          contactInfo: [
            { icon: Package, label: 'Step', value: '2 of 8' },
            { icon: Target, label: 'Focus', value: 'Product Details' }
          ],
          form: (
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Product/Service Description *</Label>
                <Textarea 
                  value={formData.product_description}
                  onChange={(e) => handleInputChange('product_description', e.target.value)}
                  placeholder="Briefly describe your product or service, its key features, and target audience..."
                  rows={4}
                  required
                />
              </div>
            </div>
          )
        };

      case 3:
        return {
          title: 'Campaign Goals',
          description: 'Select your primary objectives for influencer marketing campaigns.',
          contactInfo: [
            { icon: Target, label: 'Step', value: '3 of 8' },
            { icon: Building2, label: 'Focus', value: 'Objectives' }
          ],
          form: (
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Campaign Goals (Select all that apply) *</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {CAMPAIGN_GOALS.map((goal) => (
                    <label key={goal} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.campaign_goals.includes(goal)}
                        onChange={(e) => {
                          const updatedGoals = e.target.checked
                            ? [...formData.campaign_goals, goal]
                            : formData.campaign_goals.filter(g => g !== goal);
                          handleInputChange('campaign_goals', updatedGoals);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )
        };

      case 4:
        return {
          title: 'Influencer Preferences',
          description: 'Define your ideal influencer criteria and audience preferences.',
          contactInfo: [
            { icon: Users, label: 'Step', value: '4 of 8' },
            { icon: Target, label: 'Focus', value: 'Influencer Match' }
          ],
          form: (
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Preferred Influencer Niche *</Label>
                <Input 
                  type="text"
                  value={formData.influencer_niche}
                  onChange={(e) => handleInputChange('influencer_niche', e.target.value)}
                  placeholder="e.g., Beauty, Fitness, Tech, Lifestyle"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Preferred Audience Size *</Label>
                <select
                  value={formData.audience_size}
                  onChange={(e) => handleInputChange('audience_size', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select audience size</option>
                  {AUDIENCE_SIZES.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          )
        };

      case 5:
        return {
          title: 'Content & Messaging',
          description: 'Define your content style and key messaging for the campaign.',
          contactInfo: [
            { icon: MessageSquare, label: 'Step', value: '5 of 8' },
            { icon: Target, label: 'Focus', value: 'Content Strategy' }
          ],
          form: (
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Content Style *</Label>
                <select
                  value={formData.content_style}
                  onChange={(e) => handleInputChange('content_style', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select content style</option>
                  {CONTENT_STYLES.map((style) => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Key Message *</Label>
                <Textarea 
                  value={formData.key_message}
                  onChange={(e) => handleInputChange('key_message', e.target.value)}
                  placeholder="What's the main message you want to convey through this campaign?"
                  rows={3}
                  required
                />
              </div>
            </div>
          )
        };

      case 6:
        return {
          title: 'Budget & Pricing Model',
          description: 'Set your budget range and preferred pricing structure.',
          contactInfo: [
            { icon: DollarSign, label: 'Step', value: '6 of 8' },
            { icon: Target, label: 'Focus', value: 'Investment' }
          ],
          form: (
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Budget Range *</Label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => handleInputChange('budget_range', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select budget range</option>
                  {BUDGET_RANGES.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Pricing Model *</Label>
                <select
                  value={formData.pricing_model}
                  onChange={(e) => handleInputChange('pricing_model', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select pricing model</option>
                  {PRICING_MODELS.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>
          )
        };

      case 7:
        return {
          title: 'Timeline',
          description: 'Set your campaign start date and duration preferences.',
          contactInfo: [
            { icon: Calendar, label: 'Step', value: '7 of 8' },
            { icon: Target, label: 'Focus', value: 'Schedule' }
          ],
          form: (
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Campaign Start Date *</Label>
                <Input 
                  type="date"
                  value={formData.campaign_start}
                  onChange={(e) => handleInputChange('campaign_start', e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Campaign Duration *</Label>
                <select
                  value={formData.campaign_duration}
                  onChange={(e) => handleInputChange('campaign_duration', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select duration</option>
                  {CAMPAIGN_DURATIONS.map((duration) => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
            </div>
          )
        };

      case 8:
        return {
          title: 'Additional Information',
          description: 'Share any additional details or special requirements for your campaign.',
          contactInfo: [
            { icon: FileText, label: 'Step', value: '8 of 8' },
            { icon: Target, label: 'Focus', value: 'Final Details' }
          ],
          form: (
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Additional Information</Label>
                <Textarea 
                  value={formData.additional_info}
                  onChange={(e) => handleInputChange('additional_info', e.target.value)}
                  placeholder="Any additional information, special requirements, or notes about your campaign..."
                  rows={4}
                />
              </div>
            </div>
          )
        };

      default:
        return {
          title: 'Error',
          description: 'Invalid step',
          contactInfo: [],
          form: <div>Error: Invalid step</div>
        };
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.company_name && formData.industry;
      case 2:
        return formData.product_description;
      case 3:
        return formData.campaign_goals.length > 0;
      case 4:
        return formData.influencer_niche && formData.audience_size;
      case 5:
        return formData.content_style && formData.key_message;
      case 6:
        return formData.budget_range && formData.pricing_model;
      case 7:
        return formData.campaign_start && formData.campaign_duration;
      case 8:
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  const stepContent = getStepContent();

  return (
    <div className="min-h-screen relative">
      {/* Falling Pattern Background */}
      <div className="fixed inset-0 z-0">
        <FallingPattern 
          color="hsl(var(--primary))" 
          backgroundColor="hsl(var(--background))"
          duration={120}
          blurIntensity="0.5em"
          density={0.8}
          className="h-full w-full"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <ProgressIndicator 
              currentStep={currentStep} 
              totalSteps={FORM_STEPS.length} 
              steps={FORM_STEPS}
            />
          </div>

          <ContactCard
            title={stepContent.title}
            description={stepContent.description}
            contactInfo={stepContent.contactInfo}
            className="mb-8 bg-card/90 backdrop-blur-sm border-border/50"
          >
            <div className="w-full space-y-6">
              {stepContent.form}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t border-border/50">
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  variant="outline"
                >
                  Previous
                </Button>

                {currentStep === FORM_STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isCurrentStepValid() || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </ContactCard>
        </div>
      </div>
    </div>
  );
}