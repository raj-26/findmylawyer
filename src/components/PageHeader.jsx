import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const PageHeader = ({
  title,
  subtitle,
  onBack,
  showBack = true,
  rightAction = null,
  leftAction = null,
  centerTitle = false,
}) => {
  if (centerTitle) {
    return (
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white px-6 py-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="justify-self-start">
              {leftAction || (showBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
              ))}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm text-primary-200">{subtitle}</p>}
            </div>
            <div className="justify-self-end">
              {rightAction}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white px-6 py-6 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {leftAction && <div>{leftAction}</div>}
            {showBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm text-primary-200">{subtitle}</p>}
            </div>
          </div>
          {rightAction && <div>{rightAction}</div>}
        </div>
      </div>
    </div>
  );
};
