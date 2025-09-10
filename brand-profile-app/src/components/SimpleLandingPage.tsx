import Link from 'next/link';

export default function SimpleLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Brand Profile Evaluation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover the perfect influencer marketing strategy for your brand. 
            Complete our comprehensive evaluation to get personalized recommendations.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/form"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 text-lg"
          >
            Start Evaluation
          </Link>
          <Link 
            href="/form"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-semibold rounded-lg transition-colors duration-200 text-lg"
          >
            Learn More
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Comprehensive Analysis</h3>
            <p className="text-gray-300">
              8-step evaluation covering your brand, goals, and preferences
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Personalized Recommendations</h3>
            <p className="text-gray-300">
              Get tailored influencer marketing strategies for your brand
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Expert Insights</h3>
            <p className="text-gray-300">
              Professional analysis within 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}