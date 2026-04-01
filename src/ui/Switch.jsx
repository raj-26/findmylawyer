import React, { useEffect, useState } from 'react';

export const Switch = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className = '',
  ...props
}) => {
  const isControlled = typeof checked === 'boolean';
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  useEffect(() => {
    if (!isControlled) {
      setInternalChecked(defaultChecked);
    }
  }, [defaultChecked, isControlled]);

  const isChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const nextValue = !isChecked;

    if (!isControlled) {
      setInternalChecked(nextValue);
    }

    onCheckedChange?.(nextValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2 ${
        isChecked ? 'bg-primary-800' : 'bg-primary-200'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
      {...props}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          isChecked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};
