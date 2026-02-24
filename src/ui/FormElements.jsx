import React from 'react';

/**
 * Input component
 */
export const Input = React.forwardRef(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-primary-900 mb-2">
            {label}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded-lg border-2 border-primary-200 
            bg-white text-primary-900 placeholder-primary-400
            transition-all duration-200
            focus:outline-none focus:border-primary-800 focus:ring-2 focus:ring-primary-800 focus:ring-opacity-5
            disabled:bg-primary-50 disabled:text-primary-500 disabled:cursor-not-allowed
            ${error ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-primary-500 mt-1">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea component
 */
export const Textarea = React.forwardRef(
  ({ label, error, helperText, rows = 4, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-primary-900 mb-2">
            {label}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`
            w-full px-4 py-2.5 rounded-lg border-2 border-primary-200 
            bg-white text-primary-900 placeholder-primary-400
            transition-all duration-200 resize-none
            focus:outline-none focus:border-primary-800 focus:ring-2 focus:ring-primary-800 focus:ring-opacity-5
            disabled:bg-primary-50 disabled:text-primary-500 disabled:cursor-not-allowed
            ${error ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-primary-500 mt-1">{helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

/**
 * Select component
 */
export const Select = React.forwardRef(
  ({ label, error, helperText, options = [], className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-primary-900 mb-2">
            {label}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded-lg border-2 border-primary-200 
            bg-white text-primary-900
            transition-all duration-200
            focus:outline-none focus:border-primary-800 focus:ring-2 focus:ring-primary-800 focus:ring-opacity-5
            disabled:bg-primary-50 disabled:text-primary-500 disabled:cursor-not-allowed
            ${error ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-primary-500 mt-1">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
