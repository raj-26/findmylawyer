import React from 'react';

/**
 * Card component for content containers
 */
export const Card = React.forwardRef(
  ({ children, className = '', hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-white rounded-xl px-6 py-6 shadow-sm border border-primary-100
          ${hover ? 'transition-all duration-200 hover:shadow-md hover:border-primary-200 cursor-pointer' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card header component
 */
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 pb-4 border-b border-primary-100 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card title component
 */
export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-bold text-primary-900 ${className}`} {...props}>
    {children}
  </h3>
);

/**
 * Card description component
 */
export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-primary-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

/**
 * Card footer component
 */
export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-6 pt-4 border-t border-primary-100 flex gap-3 ${className}`} {...props}>
    {children}
  </div>
);
