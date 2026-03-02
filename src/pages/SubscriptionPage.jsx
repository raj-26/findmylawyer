import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Modal, Switch } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { PRICING_PLANS } from '../constants';
import { formatCurrency } from '../utils';

const PlanCard = ({ plan, currentPlan, onSelect }) => (
  <Card
    className={`flex flex-col relative transition-all duration-300 ${
      plan.popular ? 'ring-2 ring-primary-800 md:scale-105 z-10 bg-white' : 'bg-gray-50 lg:bg-white'
    } ${currentPlan === plan.id ? 'ring-2 ring-emerald-500' : ''}`}
  >
    {plan.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="bg-primary-800 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star size={14} /> MOST POPULAR
        </span>
      </div>
    )}
    <div className={`p-8 flex-1 flex flex-col ${plan.popular ? 'pt-12' : ''}`}>
      <h3 className="text-2xl font-bold text-primary-900 mb-2">{plan.name}</h3>
      <p className="text-primary-600 mb-6 h-10">{plan.description}</p>
      
      <div className="mb-6">
        <span className="text-5xl font-bold text-primary-900">{formatCurrency(plan.price)}</span>
        <span className="text-primary-600">/month</span>
      </div>

      <div className="mb-8 space-y-4 flex-1">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <Check size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="text-primary-700">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={() => onSelect(plan)}
        variant={plan.popular ? 'primary' : 'secondary'}
        size="lg"
        className="w-full"
        disabled={currentPlan === plan.id}
      >
        {currentPlan === plan.id ? 'Current Plan' : 'Choose Plan'}
      </Button>
    </div>
  </Card>
);

export const SubscriptionPage = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('pro'); // Demo: user is on Pro
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan.id);
      setIsModalOpen(false);
      alert(`Successfully subscribed to ${selectedPlan.name} plan!`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PageHeader
        title="Subscription"
        subtitle="Choose the plan that's right for your practice"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-primary-900 mb-4">Flexible Pricing for Lawyers</h1>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto">
              Unlock powerful features to grow your client base and manage your practice efficiently. Save up to 20% with annual billing.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="font-medium text-primary-700">Monthly</span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className="font-medium text-primary-700">
                Annual <span className="text-emerald-600 font-bold">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {PRICING_PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={{
                  ...plan,
                  price: isAnnual ? Math.round(plan.price * 0.8) : plan.price,
                }}
                currentPlan={currentPlan}
                onSelect={handleSelectPlan}
              />
            ))}
          </div>

          <Card className="mt-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-primary-900 mb-2">Can I change my plan?</h4>
                <p className="text-sm text-primary-600">Yes, you can upgrade or downgrade your plan at any time from your settings page.</p>
              </div>
              <div>
                <h4 className="font-bold text-primary-900 mb-2">What payment methods are accepted?</h4>
                <p className="text-sm text-primary-600">We accept all major credit cards, debit cards, and UPI payments.</p>
              </div>
              <div>
                <h4 className="font-bold text-primary-900 mb-2">Is there a free trial?</h4>
                <p className="text-sm text-primary-600">We offer a 7-day free trial on our Pro plan for all new lawyers.</p>
              </div>
              <div>
                <h4 className="font-bold text-primary-900 mb-2">What happens if I cancel?</h4>
                <p className="text-sm text-primary-600">Your subscription remains active until the end of your billing cycle. You won't be charged again.</p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Subscription">
        {selectedPlan && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-primary-600">You are upgrading to</p>
              <h3 className="text-2xl font-bold text-primary-900">{selectedPlan.name} Plan</h3>
            </div>
            <Card className="bg-gray-50">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-primary-900">{selectedPlan.name} ({isAnnual ? 'Annual' : 'Monthly'})</p>
                  <p className="text-sm text-primary-600">Billed {isAnnual ? 'annually' : 'monthly'}.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-900">
                    {formatCurrency(isAnnual ? selectedPlan.price * 12 : selectedPlan.price)}
                  </p>
                  <p className="text-xs text-primary-500">
                    {formatCurrency(isAnnual ? selectedPlan.price : selectedPlan.price)}/month
                  </p>
                </div>
              </div>
            </Card>
            <p className="text-xs text-center text-primary-500">
              By confirming, you agree to our Terms of Service. Your subscription will auto-renew. You can cancel anytime.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={handleSubscribe}>Confirm & Pay</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
