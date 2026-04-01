import React, { useState } from 'react';
import { format } from 'date-fns';
import { Download, TrendingUp, IndianRupee, Eye, MoreVertical, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge, Modal } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { formatCurrency, formatDate } from '../utils';

export const PaymentsPage = ({ onNavigate }) => {
  const [payments, setPayments] = useState([
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
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

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

  const handleExportReport = () => {
    const headers = ['Transaction ID', 'Client', 'Type', 'Amount', 'Date', 'Status'];
    const rows = payments.map((payment) => [
      payment.id,
      payment.clientName,
      payment.type,
      payment.amount,
      formatDate(payment.date, 'dd MMM, yyyy'),
      payment.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `earnings-report-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleMarkCompleted = (paymentId) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId ? { ...payment, status: 'completed' } : payment
      )
    );
    setOpenActionMenuId(null);
  };

  return (
    <div>
      <PageHeader
        title="Earnings"
        subtitle="Revenue overview and transaction history"
        showBack={false}
        rightAction={
          <Button variant="secondary" onClick={handleExportReport}>
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
                <IndianRupee size={24} className="text-emerald-600" />
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
                  <th className="text-center py-3 px-4 font-semibold text-primary-700">Date</th>
                  <th className="text-center py-3 px-4 font-semibold text-primary-700">Status</th>
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
                    <td className="py-3 px-4 text-primary-600 text-center">{formatDate(payment.date, 'dd MMM, yyyy')}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge status={payment.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 justify-end relative">
                        <Button variant="ghost" size="icon" onClick={() => openPaymentDetails(payment)}>
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setOpenActionMenuId((prev) => (prev === payment.id ? null : payment.id))
                          }
                        >
                          <MoreVertical size={16} />
                        </Button>

                        {openActionMenuId === payment.id && (
                          <div className="absolute right-0 top-9 z-10 w-44 rounded-xl border border-slate-200 bg-white shadow-lg p-1">
                            <button
                              onClick={() => {
                                openPaymentDetails(payment);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                alert(`Invoice ${payment.id} download started`);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                            >
                              Download Invoice
                            </button>
                            {payment.status === 'pending' && (
                              <button
                                onClick={() => handleMarkCompleted(payment.id)}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-emerald-700 hover:bg-emerald-50"
                              >
                                Mark as Completed
                              </button>
                            )}
                          </div>
                        )}
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
