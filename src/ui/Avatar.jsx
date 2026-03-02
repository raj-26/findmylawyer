import React from 'react';

export const Avatar = React.forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`relative inline-flex h-10 w-10 shrink-0 aspect-square overflow-hidden rounded-full bg-primary-100 ${className}`}
    {...props}
  >
    {children}
  </div>
));

Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef(({ className = '', alt = '', src, ...props }, ref) => {
  if (!src) return null;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      {...props}
    />
  );
});

AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef(({ children, className = '', ...props }, ref) => (
  <span
    ref={ref}
    className={`absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-primary-200 text-sm font-medium text-primary-900 ${className}`}
    {...props}
  >
    {children}
  </span>
));

AvatarFallback.displayName = 'AvatarFallback';
