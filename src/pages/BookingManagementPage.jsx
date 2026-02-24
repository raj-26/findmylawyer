import React, { useState } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, Input, Select, Button } from '../ui';
import { BookingCard, EmptyBookingsState } from '../components/BookingComponents';
import { useBookings } from '../context/BookingContext';

export const BookingManagementPage = ({ onNavigate }) => {
  const { bookings, acceptBooking, updateBookingStatus, getFilteredBookings } = useBookings();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Filter bookings
  const filteredBookings = getFilteredBookings(selectedStatus).filter((booking) =>
    booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const statusOptions = [
    { value: 'all', label: '📋 All Bookings' },
    { value: 'pending', label: '⏳ Pending' },
    { value: 'accepted', label: '✅ Accepted' },
    { value: 'ongoing', label: '🔄 Ongoing' },
    { value: 'completed', label: '✓ Completed' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest' },
  ];

  // Calculate statistics
  const stats = [
    { label: 'Total', count: bookings.length },
    { label: 'Pending', count: bookings.filter((b) => b.status === 'pending').length },
    { label: 'Accepted', count: bookings.filter((b) => b.status === 'accepted').length },
    { label: 'Ongoing', count: bookings.filter((b) => b.status === 'ongoing').length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Client Booking Management</h1>
        <p className="text-primary-600">Review and manage all your booking requests and consultations</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="text-center">
              <p className="text-sm text-primary-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-primary-900">{stat.count}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <div className="space-y-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={statusOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
            />
            <Select
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={sortOptions}
            />
          </div>
        </div>
      </Card>

      {/* Bookings List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-primary-900">
            {statusOptions.find((s) => s.value === selectedStatus)?.label}
          </h2>
          <span className="text-sm text-primary-600">
            Showing {sortedBookings.length} of {bookings.length} bookings
          </span>
        </div>

        {sortedBookings.length === 0 ? (
          <Card>
            <EmptyBookingsState onRefresh={() => window.location.reload()} />
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onAccept={() => acceptBooking(booking.id)}
                onReject={() => updateBookingStatus(booking.id, 'rejected')}
                onStartCall={() => {
                  updateBookingStatus(booking.id, 'ongoing');
                  onNavigate('chat');
                }}
                onViewDetails={() => {
                  // Could open a modal or navigate to detail page
                }}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination (future enhancement) */}
      {sortedBookings.length > 0 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button variant="secondary" size="sm">
            ← Previous
          </Button>
          <Button variant="primary" size="sm">
            1
          </Button>
          <Button variant="secondary" size="sm">
            Next →
          </Button>
        </div>
      )}
    </div>
  );
};
