import React from 'react';

/**
 * Button component with multiple variants
 */
export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      full = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-primary-800 text-white hover:bg-primary-900 focus:ring-primary-800',
      secondary:
        'bg-white border border-slate-200 text-primary-900 hover:bg-slate-50 focus:ring-primary-200',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
      outline:
        'border-2 border-primary-800 text-primary-800 hover:bg-primary-50 focus:ring-primary-800',
      ghost:
        'text-primary-800 hover:bg-slate-100 focus:ring-primary-200',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-sm',
      xl: 'px-5 py-2.5 text-sm',
      icon: 'w-8 h-8 text-xs',
    };

    const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
      full ? 'w-full' : ''
    } ${className}`;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={styles}
        {...props}
      >
        {loading ? (
          <>
            <span className="mr-2">...</span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
