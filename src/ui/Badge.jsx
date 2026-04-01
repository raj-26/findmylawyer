import React from 'react';
import { getStatusColorClass, getStatusText } from '../utils';

/**
 * Badge component for status indicators
 */
export const Badge = ({
  variant = 'default',
  text,
  status,
  className = '',
  size = 'md',
}) => {
  const baseStyles = 'inline-flex items-center font-medium border rounded-full';

  const variants = {
    default: 'bg-primary-100 text-primary-900 border-primary-200',
    primary: 'bg-primary-100 text-primary-900 border-primary-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  // If status is provided, use status-specific styling
  if (status) {
    const statusColorClass = getStatusColorClass(status);
    const statusText = getStatusText(status);
    return (
      <span className={`${baseStyles} ${statusColorClass} ${sizes[size]} ${className}`}>
        {statusText}
      </span>
    );
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {text}
    </span>
  );
};
