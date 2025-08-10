import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: 'Services', icon: 'Scissors' },
    { id: 2, label: 'Stylist', icon: 'User' },
    { id: 3, label: 'Date & Time', icon: 'Calendar' },
    { id: 4, label: 'Information', icon: 'FileText' },
    { id: 5, label: 'Summary', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-luxury ${
                  currentStep > step?.id
                    ? 'bg-success text-white'
                    : currentStep === step?.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step?.id ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              
              <span
                className={`mt-2 text-xs font-medium transition-luxury ${
                  currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step?.label}
              </span>
            </div>
            
            {index < steps?.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-luxury ${
                  currentStep > step?.id ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;