import React, { useState } from 'react';
import { Card } from '../ui';
import { PageHeader } from '../components/PageHeader';

export const AIHelpPage = ({ onNavigate }) => {
  const [tab, setTab] = useState('brief');

  const tabs = ['brief', 'checklist', 'documents', 'insights', 'drafts'];

  return (
    <div>
      <PageHeader
        title="AI Case Intelligence"
        subtitle="Rajesh Kumar · Family Law · Mumbai — AI pre-call completed 2h ago"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 space-y-4">
          <Card className="p-0">
            <div className="p-6">
              <h3 className="text-3xl font-bold">Rajesh Kumar</h3>
              <p className="text-slate-500">Family Law · Mumbai, MH</p>
              <div className="mt-4 bg-slate-50 rounded-xl p-4 text-slate-700">
                "Need legal help for divorce proceedings"
              </div>
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-800">
                AI Pre-Call Complete
                <p className="text-sm text-emerald-700 mt-1">14 min call · 2 hours ago · 6/6 checklist items</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-semibold">Accept</button>
                <button className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-500 font-semibold">Decline</button>
              </div>
            </div>
          </Card>

          <Card className="p-0">
            <div className="p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-3">Quick Actions</p>
              <div className="space-y-2">
                {['Ask AI anything', 'Generate demand draft', 'Read case files', 'Prep consultation agenda'].map((action) => (
                  <button key={action} className="w-full py-3 px-3 rounded-xl border border-slate-200 text-left font-semibold text-slate-700">{action}</button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-8 space-y-4">
          <Card className="p-0">
            <div className="p-3 flex flex-wrap gap-2">
              {tabs.map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`px-5 py-2.5 rounded-xl capitalize font-semibold ${
                    tab === item ? 'bg-[#071b33] text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </Card>

          {tab === 'brief' && (
            <Card>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-3">AI Call Summary</p>
              <p className="text-lg leading-8 text-slate-800">
                Client confirmed mutual consent divorce. Married 2018, separated since Jan 2025. No children involved. Property dispute regarding 2BHK flat in Andheri West.
                Client is primary earner. Wants expedited proceedings. Spouse is partially cooperative but needs follow-up on property division agreement.
              </p>
            </Card>
          )}

          {tab === 'checklist' && (
            <Card>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-4">Intake Checklist</p>
              <div className="space-y-3">
                {['Nature of Dispute: Mutual Consent Divorce', 'Marriage Duration: 2018-2025 (7 years)', 'Children Involved: None', 'Property Dispute: Yes - 2BHK Andheri West', 'Spouse Cooperation: Partial', 'Financial Dependency: Client is primary earner'].map((line, i) => (
                  <div key={line} className="flex items-center justify-between py-3 border-b border-slate-100">
                    <p className="font-medium text-slate-800">{line}</p>
                    <span className={i === 4 ? 'text-amber-600 text-sm' : 'text-emerald-600'}>{i === 4 ? 'Follow up' : 'Done'}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'documents' && (
            <Card>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-4">Client Documents</p>
              <div className="space-y-3">
                {['Marriage Certificate.pdf', 'Property Documents.pdf', 'Aadhaar / ID Proof'].map((doc) => (
                  <div key={doc} className="flex items-center justify-between border border-slate-200 rounded-xl p-4">
                    <p className="font-semibold">{doc}</p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-slate-300 rounded-lg">View</button>
                      <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">AI Read</button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'insights' && (
            <div className="space-y-3">
              {[
                { t: 'Relevant Case Law', p: 'Armadeep Singh v. Harveen Kaur (2017) - SC reduced cooling-off period for mutual divorce.', s: 'high' },
                { t: 'Local Court Insight', p: 'Bandra Family Court avg 6-8 weeks for MCD first motion.', s: 'medium' },
                { t: 'Knowledge Gap', p: 'Maharashtra Rent Control Act 2024 amendments affect property valuation in this case.', s: 'high' },
              ].map((item) => (
                <Card key={item.t} className="border-l-4 border-l-red-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{item.t}</h3>
                    <span className="text-red-500 text-sm font-semibold">{item.s}</span>
                  </div>
                  <p className="text-slate-600">{item.p}</p>
                </Card>
              ))}
            </div>
          )}

          {tab === 'drafts' && (
            <div className="space-y-3">
              {['Mutual Consent Divorce Petition', 'Property Division Agreement', 'Demand Notice to Spouse'].map((draft, i) => (
                <Card key={draft} className="p-0">
                  <div className="p-5 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold">{draft}</h3>
                      <p className="text-slate-500">{i === 1 ? 'Draft · Needs review' : 'Auto-generated · 2h ago'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-5 py-2.5 border border-slate-300 rounded-xl">Preview</button>
                      <button className="px-5 py-2.5 bg-[#071b33] text-white rounded-xl">Edit & Finalise</button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
