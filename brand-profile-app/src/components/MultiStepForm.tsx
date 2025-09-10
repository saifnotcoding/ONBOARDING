'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressIndicator from './ProgressIndicator';
import { BrandProfile, CAMPAIGN_GOALS, AUDIENCE_SIZES, BUDGET_RANGES, PRICING_MODELS, CONTENT_STYLES, CAMPAIGN_DURATIONS } from '@/types';

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

export default function MultiStepForm() {
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                placeholder="e.g., Fashion, Technology, Food & Beverage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product/Service</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product/Service Description *
              </label>
              <textarea
                value={formData.product_description}
                onChange={(e) => handleInputChange('product_description', e.target.value)}
                placeholder="Briefly describe your product or service, its key features, and target audience..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Campaign Goals</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your primary campaign goals? (Select all that apply) *
              </label>
              <div className="space-y-2">
                {CAMPAIGN_GOALS.map((goal) => (
                  <label key={goal} className="flex items-center">
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
                    <span className="ml-2 text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Influencer Preferences</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Influencer Niche *
              </label>
              <input
                type="text"
                value={formData.influencer_niche}
                onChange={(e) => handleInputChange('influencer_niche', e.target.value)}
                placeholder="e.g., Beauty, Fitness, Tech, Lifestyle"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Audience Size *
              </label>
              <select
                value={formData.audience_size}
                onChange={(e) => handleInputChange('audience_size', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select audience size</option>
                {AUDIENCE_SIZES.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Content & Messaging</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Style *
              </label>
              <select
                value={formData.content_style}
                onChange={(e) => handleInputChange('content_style', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select content style</option>
                {CONTENT_STYLES.map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Message *
              </label>
              <textarea
                value={formData.key_message}
                onChange={(e) => handleInputChange('key_message', e.target.value)}
                placeholder="What's the main message you want to convey through this campaign?"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Budget & Pricing Model</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range *
              </label>
              <select
                value={formData.budget_range}
                onChange={(e) => handleInputChange('budget_range', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select budget range</option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing Model *
              </label>
              <select
                value={formData.pricing_model}
                onChange={(e) => handleInputChange('pricing_model', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select pricing model</option>
                {PRICING_MODELS.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Timeline</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Start Date *
              </label>
              <input
                type="date"
                value={formData.campaign_start}
                onChange={(e) => handleInputChange('campaign_start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Duration *
              </label>
              <select
                value={formData.campaign_duration}
                onChange={(e) => handleInputChange('campaign_duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select duration</option>
                {CAMPAIGN_DURATIONS.map((duration) => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.additional_info}
                onChange={(e) => handleInputChange('additional_info', e.target.value)}
                placeholder="Any additional information, special requirements, or notes about your campaign..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      default:
        return null;
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={FORM_STEPS.length} 
            steps={FORM_STEPS}
          />

          <form onSubmit={(e) => e.preventDefault()}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-md font-medium ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep === FORM_STEPS.length ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isCurrentStepValid() || isSubmitting}
                  className={`px-6 py-2 rounded-md font-medium ${
                    !isCurrentStepValid() || isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  className={`px-6 py-2 rounded-md font-medium ${
                    !isCurrentStepValid()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}