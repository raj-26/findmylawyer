import React, { useState } from 'react';
import { Download, TrendingUp, DollarSign, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge, Modal } from '../ui';
import { formatCurrency, formatDate } from '../utils';

export const PaymentsPage = ({ onNavigate }) => {
  const [payments] = useState([
    {
      id: 'PAY001',
      clientName: 'Rajesh Kumar',
      amount: 1500,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'completed',
      type: 'Consultation',
      invoiceUrl: '#',
    },
    {
      id: 'PAY002',
      clientName: 'Priya Patel',
      amount: 2000,
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      status: 'completed',
      type: 'Video Call',
      invoiceUrl: '#',
    },
    {
      id: 'PAY003',
      clientName: 'Amit Singh',
      amount: 1500,
      date: new Date(),
      status: 'pending',
      type: 'Consultation',
      invoiceUrl: '#',
    },
  ]);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate statistics
  const totalEarnings = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  const monthlyEarnings = payments
    .filter((p) => p.status === 'completed' && new Date(p.date).getMonth() === new Date().getMonth())
    .reduce((sum, p) => sum + p.amount, 0);

  const openPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Payment Records</h1>
        <p className="text-primary-600">Track your earnings and manage payment history</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-start gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-primary-600 mb-1">Total Earnings</p>
            <h3 className="text-2xl font-bold text-primary-900">
              {formatCurrency(totalEarnings)}
            </h3>
            <p className="text-xs text-emerald-600 mt-1">✓ Completed payments</p>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-primary-600 mb-1">This Month</p>
            <h3 className="text-2xl font-bold text-primary-900">
              {formatCurrency(monthlyEarnings)}
            </h3>
            <p className="text-xs text-amber-600 mt-1">📅 Feb 2026</p>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-primary-600 mb-1">Pending Amount</p>
            <h3 className="text-2xl font-bold text-primary-900">
              {formatCurrency(pendingAmount)}
            </h3>
            <p className="text-xs text-blue-600 mt-1">⏳ {payments.filter((p) => p.status === 'pending').length} payments</p>
          </div>
        </Card>
      </div>

      {/* Earnings Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Trend</CardTitle>
        </CardHeader>
        <div className="h-40 flex items-end justify-around px-4 pb-4">
          {[12, 15, 10, 18, 22, 19, 25].map((value, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className="w-8 bg-gradient-to-t from-primary-800 to-primary-600 rounded-t"
                style={{ height: `${(value / 30) * 100}%` }}
              />
              <span className="text-xs text-primary-500">W{idx + 1}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Button variant="secondary" size="sm">
              📥 Export
            </Button>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-100">
                <th className="text-left py-3 px-4 font-bold text-primary-900">Payment ID</th>
                <th className="text-left py-3 px-4 font-bold text-primary-900">Client</th>
                <th className="text-left py-3 px-4 font-bold text-primary-900">Type</th>
                <th className="text-left py-3 px-4 font-bold text-primary-900">Amount</th>
                <th className="text-left py-3 px-4 font-bold text-primary-900">Date</th>
                <th className="text-left py-3 px-4 font-bold text-primary-900">Status</th>
                <th className="text-right py-3 px-4 font-bold text-primary-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-primary-100 hover:bg-primary-50">
                  <td className="py-3 px-4 font-medium text-primary-900">{payment.id}</td>
                  <td className="py-3 px-4 text-primary-700">{payment.clientName}</td>
                  <td className="py-3 px-4 text-primary-600 text-sm">{payment.type}</td>
                  <td className="py-3 px-4 font-bold text-primary-900">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="py-3 px-4 text-primary-600 text-sm">
                    {formatDate(payment.date, 'dd MMM, yyyy')}
                  </td>
                  <td className="py-3 px-4">
                    <Badge status={payment.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openPaymentDetails(payment)}
                        className="p-1.5 hover:bg-blue-100 rounded text-accent-blue"
                      >
                        <Eye size={18} />
                      </button>
                      <a
                        href={payment.invoiceUrl}
                        className="p-1.5 hover:bg-emerald-100 rounded text-accent-emerald"
                      >
                        <Download size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Payment Details"
      >
        {selectedPayment && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-primary-600 mb-1">Payment ID</p>
                <p className="font-bold text-primary-900">{selectedPayment.id}</p>
              </div>
              <div>
                <p className="text-sm text-primary-600 mb-1">Status</p>
                <Badge status={selectedPayment.status} size="sm" />
              </div>
              <div>
                <p className="text-sm text-primary-600 mb-1">Client Name</p>
                <p className="font-bold text-primary-900">{selectedPayment.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-primary-600 mb-1">Amount</p>
                <p className="font-bold text-primary-900 text-lg">
                  {formatCurrency(selectedPayment.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-primary-600 mb-1">Type</p>
                <p className="font-bold text-primary-900">{selectedPayment.type}</p>
              </div>
              <div>
                <p className="text-sm text-primary-600 mb-1">Date</p>
                <p className="font-bold text-primary-900">
                  {formatDate(selectedPayment.date, 'dd MMM, yyyy')}
                </p>
              </div>
            </div>

            <div className="border-t border-primary-100 pt-4 flex gap-2">
              <Button variant="secondary" full>
                <Download size={18} className="mr-2" />
                Download Invoice
              </Button>
              <Button variant="primary" full onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
