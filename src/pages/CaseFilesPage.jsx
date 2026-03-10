import React from 'react';
import { Card } from '../ui';
import { PageHeader } from '../components/PageHeader';

export const CaseFilesPage = ({ onNavigate }) => {
  const caseCards = [
    { id: 'C001', name: 'Priya Patel', type: 'Corporate Law', stage: 'Discovery', next: 'Mar 12, 2026', priority: 'high priority', docs: 7, tasks: 3 },
    { id: 'C002', name: 'Amit Singh', type: 'Property Law', stage: 'Filing', next: 'Mar 19, 2026', priority: 'medium priority', docs: 12, tasks: 1 },
    { id: 'C003', name: 'Suresh Joshi', type: 'Labour Law', stage: 'Closed', next: '—', priority: 'low priority', docs: 5, tasks: 0 },
  ];

  return (
    <div>
      <PageHeader
        title="Cases"
        subtitle="Manage your active and closed cases"
        showBack={false}
        rightAction={
          <button className="px-5 py-2.5 rounded-xl bg-[#071b33] text-white font-semibold">+ New Case</button>
        }
      />

      <div className="space-y-4">
        {caseCards.map((item) => (
          <Card key={item.id} className="p-0">
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-3xl font-bold">{item.name}</h3>
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-sm">{item.id}</span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm">{item.priority}</span>
              </div>
              <p className="text-slate-600 mb-4">{item.type} · Stage: <span className="font-semibold">{item.stage}</span> · Next: {item.next}</p>

              <div className="mb-4">
                <div className="h-2 rounded-full bg-slate-100 relative">
                  <div className="absolute left-0 top-0 h-2 rounded-full bg-blue-500" style={{ width: item.stage === 'Discovery' ? '45%' : item.stage === 'Filing' ? '20%' : '100%' }} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-5 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-semibold">AI Prep</button>
                <button className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700">📄 {item.docs} Documents</button>
                <button className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700">{item.tasks} Tasks</button>
                <button className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700">View Full Case</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
