import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, Input } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { useBookings } from '../context/BookingContext';

export const BookingManagementPage = ({ onNavigate }) => {
  const { acceptBooking, updateBookingStatus, getFilteredBookings } = useBookings();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter bookings
  const filteredBookings = getFilteredBookings(selectedStatus).filter((booking) =>
    booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusTabs = ['all', 'pending', 'accepted', 'ongoing', 'completed'];

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
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">● AI Call Done</span>
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm">{booking.urgency}</span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm capitalize">{booking.status}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 bg-slate-50 rounded-xl px-4 py-3 mb-4">"{booking.description}"</p>

                  <div className="flex flex-wrap gap-3">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            acceptBooking(booking.id);
                            onNavigate('chat', { clientName: booking.clientName });
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
                    <button onClick={() => onNavigate('ai-help')} className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-800 font-semibold">AI Intelligence</button>
                    <button onClick={() => onNavigate('cases')} className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-800 font-semibold">View Details</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
