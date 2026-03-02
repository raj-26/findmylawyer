import React, { useState } from 'react';
import { FileText, Landmark, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Button, Input, Textarea } from '../ui';
import { PageHeader } from '../components/PageHeader';

export const DemandDraftPage = ({ onNavigate }) => {
  const [draftFor, setDraftFor] = useState('Court Fee Deposit');
  const [amount, setAmount] = useState('5000');
  const [bankName, setBankName] = useState('State Bank of India');
  const [notes, setNotes] = useState('Draft required before next hearing.');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!draftFor || !amount || !bankName) return;
    setGenerated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title="Demand Draft"
        subtitle="Prepare and review demand draft details for legal workflows"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Demand Draft Setup</CardTitle>
              <CardDescription>Fill in the required details to generate a draft summary.</CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4">
              <Input label="Purpose" value={draftFor} onChange={(e) => setDraftFor(e.target.value)} />
              <Input label="Amount (INR)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <Input label="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
              <Textarea label="Notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
              <Button onClick={handleGenerate}><FileText size={16} className="mr-2" /> Generate Draft Usage</Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Usage Summary</CardTitle>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="rounded-lg border border-primary-100 bg-white p-4 text-sm text-primary-800 min-h-[150px] whitespace-pre-wrap">
                {generated
                  ? `Demand Draft Usage\n\nPurpose: ${draftFor}\nAmount: ₹${Number(amount || 0).toLocaleString('en-IN')}\nBank: ${bankName}\nNotes: ${notes || '-'}\n\nChecklist:\n1) Verify beneficiary name exactly as required.\n2) Confirm amount and payable location with court/authority.\n3) Keep receipt + draft scan in case records.`
                  : 'Generate the demand draft details to view usage summary and checklist.'}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Helps</CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4 text-sm text-primary-700">
              <div className="flex items-start gap-3"><Landmark size={16} className="mt-0.5 text-primary-800" /><span>Standardizes draft details before payment processing.</span></div>
              <div className="flex items-start gap-3"><CheckCircle2 size={16} className="mt-0.5 text-primary-800" /><span>Reduces errors in beneficiary and amount entries.</span></div>
              <div className="flex items-start gap-3"><FileText size={16} className="mt-0.5 text-primary-800" /><span>Creates reusable usage notes for compliance records.</span></div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
