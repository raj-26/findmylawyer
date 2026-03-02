import React, { useState } from 'react';
import { Sparkles, FileSearch, CalendarCheck, Scale, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Button, Textarea } from '../ui';
import { PageHeader } from '../components/PageHeader';

const SUGGESTED_PROMPTS = [
  'Summarize this case file in simple points.',
  'Draft a professional legal notice for delayed payment.',
  'Create a hearing preparation checklist for tomorrow.',
  'Suggest questions to ask a client in a property dispute.',
];

export const AIHelpPage = ({ onNavigate }) => {
  const [prompt, setPrompt] = useState(SUGGESTED_PROMPTS[0]);
  const [response, setResponse] = useState('');

  const handleGenerate = () => {
    const value = prompt.trim();
    if (!value) return;

    setResponse(
      `AI Suggestion\n\n` +
      `1) Clarify objective: ${value}\n` +
      `2) Gather facts: collect all dates, parties, and supporting documents.\n` +
      `3) Build structure: issue, legal grounds, evidence, and desired relief.\n` +
      `4) Draft output: keep language formal, concise, and client-ready.\n` +
      `5) Final check: verify names, dates, citations, and jurisdiction before sharing.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title="AI Help"
        subtitle="Get AI-powered support for drafting, case review, and preparation"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ask AI Assistant</CardTitle>
                <CardDescription>Type your legal workflow task and generate structured guidance.</CardDescription>
              </CardHeader>
              <div className="px-6 pb-6 space-y-4">
                <Textarea
                  rows={6}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what help you need..."
                />
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((item) => (
                    <Button key={item} variant="ghost" size="sm" onClick={() => setPrompt(item)}>
                      <MessageSquare size={14} className="mr-2" /> {item}
                    </Button>
                  ))}
                </div>
                <Button onClick={handleGenerate}>
                  <Sparkles size={16} className="mr-2" /> Generate Help
                </Button>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Response</CardTitle>
              </CardHeader>
              <div className="px-6 pb-6">
                <div className="rounded-lg border border-primary-100 bg-white p-4 min-h-[180px] whitespace-pre-wrap text-sm text-primary-800">
                  {response || 'Your generated AI help will appear here.'}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What AI Can Help With</CardTitle>
              </CardHeader>
              <div className="px-6 pb-6 space-y-4 text-sm text-primary-700">
                <div className="flex items-start gap-3"><FileSearch size={16} className="mt-0.5 text-primary-800" /><span>Case-file summarization and key-point extraction.</span></div>
                <div className="flex items-start gap-3"><Scale size={16} className="mt-0.5 text-primary-800" /><span>Draft templates for notices, replies, and legal communications.</span></div>
                <div className="flex items-start gap-3"><CalendarCheck size={16} className="mt-0.5 text-primary-800" /><span>Hearing prep checklists and document reminders.</span></div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
