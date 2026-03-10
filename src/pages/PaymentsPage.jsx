import React, { useState } from 'react';
import { Download, TrendingUp, DollarSign, Eye, MoreVertical, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge, Modal } from '../ui';
import { PageHeader } from '../components/PageHeader';
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
    {
      id: 'PAY004',
      clientName: 'Sunita Sharma',
      amount: 5000,
      date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
      status: 'completed',
      type: 'Case Retainer',
      invoiceUrl: '#',
    },
  ]);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div>
      <PageHeader
        title="Earnings"
        subtitle="Revenue overview and transaction history"
        showBack={false}
        rightAction={
          <Button variant="secondary">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        }
      />

      <div>
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <DollarSign size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Total Earnings</p>
                <p className="text-2xl font-bold text-primary-900">{formatCurrency(totalEarnings)}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <TrendingUp size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">This Month</p>
                <p className="text-2xl font-bold text-primary-900">{formatCurrency(monthlyEarnings)}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Pending Amount</p>
                <p className="text-2xl font-bold text-primary-900">{formatCurrency(pendingAmount)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-primary-700">Client</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-700">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-primary-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-primary-900">{payment.clientName}</div>
                      <div className="text-primary-600 text-xs">{payment.type}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-primary-900">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 px-4 text-primary-600">{formatDate(payment.date, 'dd MMM, yyyy')}</td>
                    <td className="py-3 px-4">
                      <Badge status={payment.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => openPaymentDetails(payment)}>
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Payment Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Payment Details">
        {selectedPayment && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-primary-600">Payment from {selectedPayment.clientName}</p>
              <p className="text-4xl font-bold text-primary-900">{formatCurrency(selectedPayment.amount)}</p>
              <Badge status={selectedPayment.status} className="mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="text-primary-600">Transaction ID</div>
              <div className="text-primary-900 font-medium text-right">{selectedPayment.id}</div>
              <div className="text-primary-600">Date</div>
              <div className="text-primary-900 font-medium text-right">{formatDate(selectedPayment.date, 'PPpp')}</div>
              <div className="text-primary-600">Payment For</div>
              <div className="text-primary-900 font-medium text-right">{selectedPayment.type}</div>
            </div>
            <div className="border-t border-gray-200 pt-4 flex gap-2">
              <Button variant="primary" className="flex-1">
                <Download size={16} className="mr-2" />
                Download Invoice
              </Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
