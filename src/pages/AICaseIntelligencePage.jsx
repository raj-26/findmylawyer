import React, { useMemo, useState } from 'react';
import { Card } from '../ui';
import { PageHeader } from '../components/PageHeader';

const CASE_INTELLIGENCE = {
  C001: {
    quote: 'Need legal help on partnership agreement breach and liability exposure.',
    status: 'AI review complete',
    statusMeta: '16 min analysis · 1 hour ago · 6/6 checklist items',
    summary:
      'Client alleges breach of exclusivity and indemnity terms in a partnership contract. Counterparty disputes liability caps and seeks revised revenue sharing. Immediate focus is clause-level risk mapping and interim protection before the next negotiation round.',
    checklist: [
      'Dispute Type: Partnership contract breach with indemnity conflict',
      'Current Stage: Discovery and risk assessment',
      'Commercial Exposure: Medium to High based on liability wording',
      'Primary Concern: Ambiguous indemnity and non-compete clauses',
      'Counterparty Stance: Partially cooperative; negotiation likely',
      'Urgency: High due to upcoming execution milestone',
    ],
    documents: ['Master Service Agreement.pdf', 'Partnership Addendum.pdf', 'Email Negotiation Trail.pdf'],
    insights: [
      {
        title: 'Relevant Precedent',
        priority: 'high',
        text: 'Recent commercial rulings emphasize strict interpretation of indemnity carve-outs when language is explicit.',
      },
      {
        title: 'Negotiation Leverage',
        priority: 'medium',
        text: 'Timeline pressure before execution can support interim commercial safeguards without full litigation.',
      },
      {
        title: 'Knowledge Gap',
        priority: 'high',
        text: 'Need deeper review of arbitration seat and governing law conflict in the current draft stack.',
      },
    ],
    drafts: ['Risk Advisory Note', 'Clause Redline Proposal', 'Pre-Litigation Notice Draft'],
  },
  C002: {
    quote: 'Need legal strategy for title dispute and conflicting registry records.',
    status: 'AI review complete',
    statusMeta: '12 min analysis · 3 hours ago · 5/6 checklist items',
    summary:
      'The title chain appears inconsistent across registry extracts and sale deed references. Filing strategy should prioritize documentary sequence validation and immediate injunction readiness if third-party transfer risk rises.',
    checklist: [
      'Dispute Type: Property ownership and title chain conflict',
      'Current Stage: Filing preparation',
      'Primary Risk: Competing registry entries',
      'Possession Status: Shared and disputed',
      'Counterparty Stance: Adversarial',
      'Urgency: Medium with potential escalation',
    ],
    documents: ['Sale Deed Copy.pdf', 'Encumbrance Certificate.pdf', 'Registry Extracts.pdf'],
    insights: [
      {
        title: 'Court Strategy',
        priority: 'high',
        text: 'Early interim relief can preserve status quo where title mutation or transfer is actively contested.',
      },
      {
        title: 'Evidentiary Strength',
        priority: 'medium',
        text: 'Chronological document matrix will likely be decisive in determining beneficial ownership.',
      },
      {
        title: 'Knowledge Gap',
        priority: 'high',
        text: 'Need municipal record verification to reconcile registry metadata mismatch.',
      },
    ],
    drafts: ['Interim Injunction Motion', 'Title Objection Brief', 'Client Evidence Request'],
  },
  C003: {
    quote: 'Matter closed after negotiated settlement between employer and employee.',
    status: 'AI closure review complete',
    statusMeta: '8 min summary · yesterday · 4/4 closure checks',
    summary:
      'The labour dispute concluded through negotiated terms covering compensation, release clauses, and record correction. The remaining action is closure documentation and archival quality check for future compliance review.',
    checklist: [
      'Dispute Type: Employment termination and settlement',
      'Current Stage: Closed',
      'Settlement Terms: Executed by both parties',
      'Compliance Status: Satisfactory',
      'Post-Closure Risk: Low',
      'Urgency: None',
    ],
    documents: ['Settlement Agreement.pdf', 'HR Correspondence.pdf', 'Closure Acknowledgment.pdf'],
    insights: [
      {
        title: 'Record Hygiene',
        priority: 'medium',
        text: 'Ensure all signed annexures are indexed for compliance and audit retrieval.',
      },
      {
        title: 'Residual Risk',
        priority: 'low',
        text: 'Future claims risk appears low if payment proof and release language are complete.',
      },
      {
        title: 'Knowledge Gap',
        priority: 'low',
        text: 'Optional check of internal policy alignment for final archival standards.',
      },
    ],
    drafts: ['Final Closure Memo', 'Settlement Compliance Note', 'Archive Checklist'],
  },
};

const DEFAULT_CASE = {
  id: 'C000',
  name: 'Client',
  type: 'General Law',
  stage: 'Discovery',
  next: 'TBD',
  location: 'India',
  priority: 'medium priority',
  summary: 'No case summary available yet.',
};

const DEFAULT_INTELLIGENCE = {
  quote: 'Select a case from the Cases page to load full AI intelligence details.',
  status: 'Awaiting case selection',
  statusMeta: 'No intake analysis is attached to this view yet.',
  summary: 'Open a case and choose View Full Case to see client-specific summary, checklist, documents, insights, and drafts.',
  checklist: [
    'Case not selected yet',
    'Open Cases page',
    'Click View Full Case',
    'Review generated intelligence',
    'Validate client facts',
    'Proceed with action plan',
  ],
  documents: ['No documents loaded'],
  insights: [
    {
      title: 'Tip',
      priority: 'low',
      text: 'Use View Full Case from the Cases page for a client-specific intelligence view.',
    },
  ],
  drafts: ['No drafts loaded'],
};

const QUICK_OPTIONS = ['Brief', 'Checklist', 'Documents', 'Insights', 'Drafts'];

const buildReply = (option, intelligence) => {
  const normalized = option.trim().toLowerCase();

  if (normalized.includes('brief')) {
    return `Case Brief:\n${intelligence.summary}`;
  }

  if (normalized.includes('checklist')) {
    return `Intake Checklist:\n${intelligence.checklist.map((line) => `- ${line}`).join('\n')}`;
  }

  if (normalized.includes('document')) {
    return `Client Documents:\n${intelligence.documents.map((doc, idx) => `${idx + 1}. ${doc}`).join('\n')}`;
  }

  if (normalized.includes('insight')) {
    return `Key Insights:\n${intelligence.insights
      .map((item) => `${item.title} (${item.priority}) - ${item.text}`)
      .join('\n')}`;
  }

  if (normalized.includes('draft')) {
    return `Available Drafts:\n${intelligence.drafts.map((draft, idx) => `${idx + 1}. ${draft}`).join('\n')}`;
  }

  return `I can help with Brief, Checklist, Documents, Insights, and Drafts for ${intelligence.status.toLowerCase()}. Try one of the quick options above.`;
};

export const AICaseIntelligencePage = ({ onNavigate, navState }) => {
  const caseData = navState?.caseData || DEFAULT_CASE;

  const intelligence = useMemo(() => {
    return CASE_INTELLIGENCE[caseData.id] || DEFAULT_INTELLIGENCE;
  }, [caseData.id]);

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: `Hi, I am your AI Case Assistant for ${caseData.name}. Choose an option below or ask a custom question.`,
    },
  ]);

  const pushConversation = (promptText) => {
    const cleaned = promptText.trim();
    if (!cleaned) return;

    const reply = buildReply(cleaned, intelligence);
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text: cleaned },
      { id: Date.now() + 1, role: 'assistant', text: reply },
    ]);
    setChatInput('');
  };

  return (
    <div>
      <PageHeader
        title="AI Case Intelligence"
        subtitle={`${caseData.name} · ${caseData.type} · ${caseData.location}`}
        showBack={true}
        onBack={() => onNavigate('cases')}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 space-y-4">
          <Card className="p-0">
            <div className="p-6">
              <h3 className="text-3xl font-bold">{caseData.name}</h3>
              <p className="text-slate-500">{caseData.type} · {caseData.location}</p>
              <div className="mt-4 bg-slate-50 rounded-xl p-4 text-slate-700">
                {intelligence.quote}
              </div>
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-800">
                {intelligence.status}
                <p className="text-sm text-emerald-700 mt-1">{intelligence.statusMeta}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-semibold">Accept</button>
                <button className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-500 font-semibold">Decline</button>
              </div>
            </div>
          </Card>

          <Card className="p-0">
            <div className="p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-3">Case Snapshot</p>
              <div className="space-y-3 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-800">Case ID:</span> {caseData.id}</p>
                <p><span className="font-semibold text-slate-800">Priority:</span> {caseData.priority}</p>
                <p><span className="font-semibold text-slate-800">Stage:</span> {caseData.stage}</p>
                <p><span className="font-semibold text-slate-800">Next Milestone:</span> {caseData.next}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="xl:col-span-8 p-0 flex flex-col min-h-[640px]">
          <div className="p-5 border-b border-slate-200">
            <p className="text-sm font-semibold text-slate-800">AI Case Chatbot</p>
            <p className="text-xs text-slate-500 mt-1">Ask questions or tap quick actions, just like a real chat assistant.</p>
          </div>

          <div className="p-5 border-b border-slate-200">
            <div className="flex flex-wrap gap-2">
              {QUICK_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => pushConversation(option)}
                  className="px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-5 bg-slate-50 overflow-y-auto space-y-4">
            {chatMessages.map((message) => {
              const isUser = message.role === 'user';

              return (
                <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line px-4 py-3 rounded-2xl text-sm leading-6 ${
                      isUser
                        ? 'bg-[#071b33] text-white rounded-br-md'
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-md'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    pushConversation(chatInput);
                  }
                }}
                placeholder="Ask about this case..."
                className="flex-1 h-11 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <button
                onClick={() => pushConversation(chatInput)}
                className="h-11 px-5 rounded-xl bg-[#071b33] text-white font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
