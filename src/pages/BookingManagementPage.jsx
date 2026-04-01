import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, Input } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { useBookings } from '../context/BookingContext';

export const BookingManagementPage = ({ onNavigate }) => {
  const { acceptBooking, updateBookingStatus, getFilteredBookings } = useBookings();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const getUrgencyClass = (urgency) => {
    const level = String(urgency || '').toLowerCase();
    if (level === 'urgent') return 'bg-red-50 text-red-700 border border-red-200';
    if (level === 'moderate') return 'bg-amber-50 text-amber-700 border border-amber-200';
    if (level === 'flexible') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    return 'bg-slate-100 text-slate-700 border border-slate-200';
  };

  const getCaseCategory = (caseType) => {
    const type = String(caseType || '').toLowerCase();
    if (type.includes('criminal')) return 'Criminal';
    if (type.includes('corporate')) return 'Corporate';
    return 'Settlement';
  };

  const getUploadedDocuments = (booking) => {
    const category = getCaseCategory(booking.caseType);
    if (category === 'Criminal') {
      return ['FIR Copy', 'Charge Sheet', 'Identity Proof'];
    }
    if (category === 'Corporate') {
      return ['Partnership Agreement', 'Business Registration', 'Contract Draft'];
    }
    return ['Notice Copy', 'Supporting Evidence', 'Address Proof'];
  };

  // Filter bookings
  const filteredBookings = getFilteredBookings(selectedStatus).filter((booking) =>
    booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusTabs = ['all', 'accepted', 'ongoing', 'completed'];

  return (
    <div>
      <PageHeader
        title="Bookings"
        subtitle="Manage all consultation requests"
        showBack={false}
      />

      <div>
        <Card className="mb-5 p-0">
          <div className="p-3">
            <div className="flex flex-wrap gap-2">
              {statusTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedStatus(tab)}
                  className={`px-5 py-2.5 rounded-xl font-semibold capitalize ${
                    selectedStatus === tab
                      ? 'bg-[#071b33] text-white'
                      : 'bg-transparent text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="mb-6 p-0">
          <div className="p-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-primary-400" />
              <Input
                placeholder="Search by client name or case type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {filteredBookings.length === 0 ? (
          <Card className="text-center py-16">
            <p className="text-slate-500">No bookings found for this filter.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{booking.clientName}</h3>
                      <p className="text-slate-500">{booking.caseType} • {booking.location} • {booking.language}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyClass(booking.urgency)}`}>
                        {booking.urgency}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 bg-slate-50 rounded-xl px-4 py-3 mb-4">"{booking.description}"</p>

                  <div className="flex flex-wrap gap-3">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            acceptBooking(booking.id);
                            onNavigate('chat', {
                              clientName: booking.clientName,
                              bookingId: booking.id,
                              autoMessage: `Your case has been taken. I have accepted your ${booking.caseType} matter and will begin review shortly.`,
                            });
                          }}
                          className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'rejected')}
                          className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-semibold"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onNavigate('ai-help')}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
                    >
                      AI Intelligence
                    </button>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedBooking && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Case Details</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500 mb-1">Client</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.clientName}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500 mb-1">Case Type</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.caseType}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500 mb-1">Case Category</p>
                    <p className="font-semibold text-slate-900">{getCaseCategory(selectedBooking.caseType)}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500 mb-1">Submitted On</p>
                    <p className="font-semibold text-slate-900">
                      {new Date(selectedBooking.createdAt).toLocaleString([], {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500 mb-1">Brief of Case</p>
                  <p className="text-slate-800">{selectedBooking.description}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-2">Uploaded Documents</p>
                  <div className="flex flex-wrap gap-2">
                    {getUploadedDocuments(selectedBooking).map((doc) => (
                      <span key={doc} className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-200">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
