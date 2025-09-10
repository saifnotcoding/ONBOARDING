import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <span className="text-3xl">✅</span>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Success!
        </h1>
        <p className="text-gray-600 mb-8">
          Your profile has been saved successfully. We&apos;ll review your information and get back to you with personalized influencer recommendations.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            href="/" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Return to Home
          </Link>
          <Link 
            href="/form" 
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Submit Another Profile
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          You&apos;ll receive a follow-up email within 24-48 hours with your personalized recommendations.
        </p>
      </div>
    </div>
  );
}