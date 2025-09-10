'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8 bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border/50">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-foreground mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="hidden md:flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2
                ${isCompleted 
                  ? 'bg-green-600 text-white' 
                  : isCurrent 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span className={`text-xs text-center max-w-20 ${
                isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}