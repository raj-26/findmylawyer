import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const AIHelpPage = () => {
  const starterPrompts = [
    'Summarise my top-risk active cases this week',
    'Create a hearing prep checklist for property disputes',
    'Find missing documents in high-priority matters',
    'Draft first questions for new corporate clients',
  ];

  return (
    <div>
      <PageHeader
        title="AI Intelligence"
        subtitle="Ask anything about your cases, clients, and legal workflow"
        showBack={false}
      />

      <section className="min-h-[70vh] rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 py-8 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-slate-500 font-bold mb-3">FindMyLawyer AI</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">How can I help with your legal work today?</h2>
            <p className="text-slate-500 mt-4">Start with a prompt or open a case directly from the Cases section.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                className="text-left rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-4 text-slate-700 font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-3 sm:p-4 shadow-sm">
            <div className="flex items-end gap-3">
              <textarea
                rows={2}
                placeholder="Message AI Intelligence"
                className="flex-1 resize-none border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none text-slate-700 placeholder:text-slate-400"
              />
              <button className="px-5 py-2.5 rounded-xl bg-[#071b33] text-white font-semibold">Search</button>
            </div>
            <div className="pt-3 px-1 text-xs text-slate-500">
              <p>Use case names, hearing dates, or document IDs for sharper answers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
