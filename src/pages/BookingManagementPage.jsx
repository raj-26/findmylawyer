import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, Input, Select } from '../ui';
import { BookingCard, EmptyBookingsState } from '../components/BookingComponents';
import { PageHeader } from '../components/PageHeader';
import { useBookings } from '../context/BookingContext';

export const BookingManagementPage = ({ onNavigate }) => {
  const { bookings, acceptBooking, updateBookingStatus, getFilteredBookings } = useBookings();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter bookings
  const filteredBookings = getFilteredBookings(selectedStatus).filter((booking) =>
    booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusOptions = [
    { value: 'all', label: 'All Bookings' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
  ];

  // Calculate statistics
  const stats = [
    { label: 'Total', count: bookings.length, numberColor: 'text-blue-700' },
    { label: 'Pending', count: bookings.filter((b) => b.status === 'pending').length, numberColor: 'text-amber-600' },
    { label: 'Accepted', count: bookings.filter((b) => b.status === 'accepted').length, numberColor: 'text-emerald-600' },
    { label: 'Ongoing', count: bookings.filter((b) => b.status === 'ongoing').length, numberColor: 'text-indigo-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title="Booking Management"
        subtitle="Review and manage all your booking requests"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <div className="p-6 text-center">
                <p className="text-sm text-primary-600 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.numberColor}`}>{stat.count}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <div className="space-y-4 px-6 pb-6">
            {/* Search bar */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-primary-400" />
              <Input
                placeholder="Search by client name or case type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Controls */}
            <Select
              label="Status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={statusOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
            />
          </div>
        </Card>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <EmptyBookingsState onRefresh={() => window.location.reload()} />
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onAccept={() => {
                  acceptBooking(booking.id);
                  onNavigate('chat', { clientName: booking.clientName });
                }}
                onReject={() => updateBookingStatus(booking.id, 'rejected')}
                onStartCall={() => onNavigate('chat')}
                showActions={booking.status === 'pending'}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
