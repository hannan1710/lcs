import React from 'react';

const Logo = ({ size = 'md', className = '', showText = true, variant = 'default' }) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const variants = {
    default: {
      logoClass: sizeClasses[size] || sizeClasses.md,
      textClass: `${textSizes[size] || textSizes.md} font-heading font-semibold text-primary`
    },
    footer: {
      logoClass: sizeClasses[size] || sizeClasses.md,
      textClass: `${textSizes[size] || textSizes.md} font-heading font-bold text-background`
    },
    white: {
      logoClass: sizeClasses[size] || sizeClasses.md,
      textClass: `${textSizes[size] || textSizes.md} font-heading font-semibold text-white`
    }
  };

  const { logoClass, textClass } = variants[variant] || variants.default;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
       src="/lcsg.png" 
        alt="La Coiffure Salon Logo" 
        className={logoClass}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={textClass}>
            La Coiffure
          </span>
          {size !== 'xs' && size !== 'sm' && (
            <span className="font-caption text-xs text-muted-foreground -mt-1">
              Luxury Salon
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
