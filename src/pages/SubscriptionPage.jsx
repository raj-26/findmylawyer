import React, { useState } from 'react';
import { Check, X, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Modal } from '../ui';
import { PRICING_PLANS } from '../constants';
import { formatCurrency } from '../utils';

export const SubscriptionPage = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('basic'); // Demo: user is on Basic

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan.id);
      setIsModalOpen(false);
      alert(`Successfully upgraded to ${selectedPlan.name} plan!`);
    }
  };

  const allFeatures = [
    { feature: 'Consultations', basic: '10', pro: '40', elite: 'Unlimited' },
    { feature: 'Client Matching', basic: 'Basic', pro: 'Advanced', elite: 'Premium' },
    { feature: 'Support', basic: 'Standard', pro: 'Priority', elite: '24/7 Dedicated' },
    { feature: 'Commission', basic: '20%', pro: '15%', elite: '10%' },
    { feature: 'Analytics', basic: false, pro: true, elite: true },
    { feature: 'Performance Insights', basic: false, pro: true, elite: true },
    { feature: 'Personal Account Manager', basic: false, pro: false, elite: true },
    { feature: 'Priority Legal Resources', basic: false, pro: true, elite: true },
    { feature: 'Verified Badge', basic: false, pro: true, elite: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Subscription Plans</h1>
        <p className="text-primary-600 max-w-2xl mx-auto">
          Choose the perfect plan to grow your legal practice and reach more clients
        </p>
      </div>

      {/* Current Plan Alert */}
      <Card className="bg-blue-50 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 mb-1">Current Plan</p>
            <p className="font-bold text-blue-900">
              {PRICING_PLANS.find((p) => p.id === currentPlan)?.name} Plan
            </p>
          </div>
          <Button variant="secondary" size="sm">
            View Details
          </Button>
        </div>
      </Card>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`relative transition-all ${
              plan.popular ? 'ring-2 ring-primary-800 md:scale-105' : ''
            } ${currentPlan === plan.id ? 'ring-2 ring-accent-emerald' : ''}`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <span className="bg-primary-800 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={14} />
                  Most Popular
                </span>
              </div>
            )}

            {/* Current Plan Badge */}
            {currentPlan === plan.id && (
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <span className="bg-accent-emerald text-white px-4 py-1 rounded-full text-xs font-bold">
                  Current Plan
                </span>
              </div>
            )}

            <div className={`${plan.popular ? 'pt-8' : ''}`}>
              {/* Plan Name and Duration */}
              <h3 className="text-2xl font-bold text-primary-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-primary-600 mb-4">{plan.duration}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-primary-900">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-primary-600 ml-2">only</span>
                </div>
                <p className="text-xs text-primary-600 mt-1">
                  ₹{(plan.price / (plan.duration.split(' ')[0])).toFixed(0)}/month
                </p>
              </div>

              {/* Features List */}
              <div className="mb-6 space-y-3 border-b border-primary-100 pb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check size={18} className="text-accent-emerald flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-primary-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleSelectPlan(plan)}
                variant={plan.popular ? 'primary' : 'secondary'}
                full
                disabled={currentPlan === plan.id}
                className="flex items-center justify-center gap-2"
              >
                {currentPlan === plan.id ? '✓ Current Plan' : `Upgrade → ${plan.name}`}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Feature Comparison</CardTitle>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-100">
                <th className="text-left py-3 px-4 font-bold text-primary-900">Feature</th>
                <th className="text-center py-3 px-4 font-bold text-primary-900">Basic</th>
                <th className="text-center py-3 px-4 font-bold text-primary-900">Pro</th>
                <th className="text-center py-3 px-4 font-bold text-primary-900">Elite</th>
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((row, idx) => (
                <tr key={idx} className="border-b border-primary-100 hover:bg-primary-50">
                  <td className="py-3 px-4 font-medium text-primary-900">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? (
                        <Check size={20} className="text-accent-emerald mx-auto" />
                      ) : (
                        <X size={20} className="text-primary-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-primary-700">{row.basic}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? (
                        <Check size={20} className="text-accent-emerald mx-auto" />
                      ) : (
                        <X size={20} className="text-primary-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-primary-700">{row.pro}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.elite === 'boolean' ? (
                      row.elite ? (
                        <Check size={20} className="text-accent-emerald mx-auto" />
                      ) : (
                        <X size={20} className="text-primary-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-primary-700">{row.elite}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>

        <div className="space-y-4">
          <div className="border-b border-primary-100 pb-4 last:border-0">
            <h4 className="font-bold text-primary-900 mb-2">Can I change my plan anytime?</h4>
            <p className="text-sm text-primary-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will take effect in your next billing cycle.
            </p>
          </div>

          <div className="border-b border-primary-100 pb-4 last:border-0">
            <h4 className="font-bold text-primary-900 mb-2">What payment methods do you accept?</h4>
            <p className="text-sm text-primary-600">
              We accept all major credit cards, debit cards, and digital payment methods including Google Pay and Apple Pay.
            </p>
          </div>

          <div className="border-b border-primary-100 pb-4 last:border-0">
            <h4 className="font-bold text-primary-900 mb-2">Is there a free trial?</h4>
            <p className="text-sm text-primary-600">
              Yes! New lawyers get a 7-day free trial with full access to all features. No credit card required.
            </p>
          </div>

          <div className="pb-4 last:border-0">
            <h4 className="font-bold text-primary-900 mb-2">What happens if I cancel?</h4>
            <p className="text-sm text-primary-600">
              You can cancel anytime. Your account will remain active until the end of the billing period.
            </p>
          </div>
        </div>
      </Card>

      {/* Upgrade Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPlan ? `Upgrade to ${selectedPlan.name}` : 'Select Plan'}
      >
        {selectedPlan && (
          <div className="space-y-6">
            {/* Plan Summary */}
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-primary-600">Plan</p>
                  <h4 className="text-xl font-bold text-primary-900">{selectedPlan.name}</h4>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-900">
                    {formatCurrency(selectedPlan.price)}
                  </p>
                  <p className="text-xs text-primary-600">{selectedPlan.duration}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h5 className="font-bold text-primary-900 mb-3">What's Included:</h5>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-accent-emerald flex-shrink-0 mt-0.5" />
                    <span className="text-primary-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Method */}
            <div>
              <h5 className="font-bold text-primary-900 mb-3">Payment Method</h5>
              <select className="w-full p-3 border border-primary-200 rounded-lg">
                <option>💳 Credit/Debit Card</option>
                <option>🏠 Bank Transfer</option>
                <option>📱 Digital Wallet</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="primary" full onClick={handleSubscribe}>
                <Check size={18} className="mr-2" />
                Confirm Upgrade
              </Button>
              <Button variant="secondary" full onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>

            <p className="text-xs text-primary-600 text-center">
              Your card will not be charged until you confirm
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
