import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal component
 */
export const Modal = ({ isOpen, onClose, title, children, size = 'md', className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`bg-white rounded-xl shadow-lg w-full ${sizes[size]} ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-100">
          <h2 className="text-xl font-bold text-primary-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/**
 * Alert component
 */
export const Alert = ({ type = 'info', title, message, onClose, className = '' }) => {
  const types = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-l-4 border-blue-600',
      text: 'text-blue-900',
      icon: 'ℹ️',
    },
    success: {
      bg: 'bg-emerald-50',
      border: 'border-l-4 border-emerald-600',
      text: 'text-emerald-900',
      icon: '✓',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-l-4 border-amber-600',
      text: 'text-amber-900',
      icon: '⚠️',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-l-4 border-red-600',
      text: 'text-red-900',
      icon: '✕',
    },
  };

  const typeConfig = types[type];

  return (
    <div className={`${typeConfig.bg} ${typeConfig.border} p-4 rounded-lg mb-4 ${className}`}>
      <div className="flex items-start">
        <span className="mr-3 text-xl">{typeConfig.icon}</span>
        <div className="flex-1">
          {title && <h4 className={`font-bold ${typeConfig.text} mb-1`}>{title}</h4>}
          {message && <p className={`text-sm ${typeConfig.text}`}>{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-4 font-bold ${typeConfig.text} hover:opacity-70`}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Skeleton loader component
 */
export const Skeleton = ({ width = 'w-full', height = 'h-4', className = '' }) => (
  <div
    className={`${width} ${height} bg-gradient-to-r from-primary-200 to-primary-100 rounded-lg animate-pulse ${className}`}
  />
);

/**
 * Loading spinner component
 */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-4 border-primary-200 border-t-primary-800 rounded-full animate-spin`} />
    </div>
  );
};

/**
 * Empty state component
 */
export const EmptyState = ({ icon, title, description, action, className = '' }) => (
  <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
    {icon && <div className="text-4xl mb-4">{icon}</div>}
    <h3 className="text-lg font-bold text-primary-900 mb-2">{title}</h3>
    {description && <p className="text-sm text-primary-500 mb-6 max-w-xs">{description}</p>}
    {action && <div>{action}</div>}
  </div>
);
