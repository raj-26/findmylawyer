import React, { useState } from 'react';
import { Card } from '../ui';
import { PageHeader } from '../components/PageHeader';

export const SubscriptionPage = ({ onNavigate }) => {
  const [progress] = useState([
    { title: 'Maharashtra Rent Control Act - 2024 Amendments', meta: 'Property Law · 25 min · Relevant to Amit Singh case', progress: 0, action: 'Start' },
    { title: 'Mutual Consent Divorce - SC Precedents 2023-25', meta: 'Family Law · 18 min · Active case: Rajesh Kumar', progress: 40, action: 'Continue' },
    { title: 'Corporate IP Clauses in Partnership Agreements', meta: 'Corporate Law · 30 min · Ongoing: Priya Patel', progress: 75, action: 'Continue' },
  ]);

  return (
    <div>
      <PageHeader
        title="AI Learning Centre"
        subtitle="Personalised to your active cases and knowledge gaps"
        showBack={false}
      />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-0"><div className="p-6"><p className="text-slate-500">Modules Recommended</p><p className="text-4xl font-extrabold text-blue-600 mt-2">5</p></div></Card>
          <Card className="p-0"><div className="p-6"><p className="text-slate-500">In Progress</p><p className="text-4xl font-extrabold text-amber-500 mt-2">2</p></div></Card>
          <Card className="p-0"><div className="p-6"><p className="text-slate-500">Completed This Month</p><p className="text-4xl font-extrabold text-emerald-600 mt-2">3</p></div></Card>
        </div>

        <h3 className="text-3xl font-bold mb-4">Recommended for You</h3>
        <div className="space-y-4">
          {progress.map((item, idx) => (
            <Card key={item.title} className="p-0 border-l-4 border-l-red-400">
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="text-2xl font-bold">{item.title}</h4>
                    <span className="px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">Priority</span>
                  </div>
                  <p className="text-slate-500">{item.meta}</p>
                  {item.progress > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-slate-500 mb-1">Progress</p>
                      <div className="h-2 bg-slate-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={() => onNavigate('ai-help')} className={`px-6 py-3 rounded-xl font-semibold ${idx === 0 ? 'bg-[#071b33] text-white' : 'bg-blue-500 text-white'}`}>
                  {item.action}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
