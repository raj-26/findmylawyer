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
  return (
    <div className="mb-4">
      {centerTitle ? null : (
        <p className="text-xs text-slate-500 mb-2">Portal / {title}</p>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {leftAction && <div>{leftAction}</div>}
          {showBack && (
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 flex items-center justify-center mt-0.5"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
            {subtitle && <p className="text-slate-500 mt-1.5">{subtitle}</p>}
          </div>
        </div>
        {rightAction && <div className="shrink-0">{rightAction}</div>}
      </div>
    </div>
  );
};
