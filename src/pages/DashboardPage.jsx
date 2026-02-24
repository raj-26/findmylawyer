import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Button, Alert } from '../ui';
import { StatsCard, BookingCard, EmptyBookingsState } from '../components/BookingComponents';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { formatTimeAgo, formatCurrency } from '../utils';

export const DashboardPage = ({ onNavigate, onViewBookingDetails }) => {
  const { user } = useAuth();
  const { bookings, acceptBooking } = useBookings();
  const [showAlert, setShowAlert] = useState(true);

  // Calculate statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const ongoingConsultations = bookings.filter((b) => b.status === 'ongoing').length;

  // Mock earnings
  const monthlyEarnings = 45000;
  const totalEarnings = 185000;

  // Get recent bookings
  const recentBookings = bookings.slice(0, 3);
  const upcomingMeetings = bookings.filter((b) => b.status === 'accepted').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white p-8 rounded-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-primary-200">
              You're all set. Here's your consultation overview for today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-primary-300">Your Rating</p>
            <p className="text-3xl font-bold">⭐ {user.rating}</p>
            <p className="text-xs text-primary-300">{user.reviews} reviews</p>
          </div>
        </div>
      </div>

      {/* Alert */}
      {showAlert && (
        <Alert
          type="info"
          title="Profile Verification"
          message="Your profile is 95% complete. Add your availability schedule to unlock premium features."
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={Calendar}
          label="Total Bookings"
          value={totalBookings}
          color="blue"
          trend={12}
        />
        <StatsCard
          icon={Clock}
          label="Pending Requests"
          value={pendingBookings}
          color="amber"
          trend={-5}
        />
        <StatsCard
          icon={Users}
          label="Ongoing Consultations"
          value={ongoingConsultations}
          color="blue"
          trend={8}
        />
        <StatsCard
          icon={DollarSign}
          label="Monthly Earnings"
          value={formatCurrency(monthlyEarnings)}
          color="green"
          trend={15}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Requests Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Booking Requests</CardTitle>
                  <CardDescription>
                    {pendingBookings} pending request{pendingBookings !== 1 ? 's' : ''}
                  </CardDescription>
                </div>
                {pendingBookings > 0 && (
                  <Bell className="text-accent-amber animate-bounce" size={20} />
                )}
              </div>
            </CardHeader>

            {recentBookings.length === 0 ? (
              <EmptyBookingsState onRefresh={() => window.location.reload()} />
            ) : (
              <div className="space-y-0">
                {recentBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onAccept={() => acceptBooking(booking.id)}
                    onReject={() => {
                      // Handle rejection
                    }}
                    onStartCall={() => onNavigate('chat')}
                    onViewDetails={() => onViewBookingDetails(booking)}
                    showActions={booking.status === 'pending'}
                  />
                ))}
              </div>
            )}

            {bookings.length > 3 && (
              <div className="p-4 border-t border-primary-100">
                <Button
                  onClick={() => onNavigate('bookings')}
                  variant="ghost"
                  full
                  className="justify-center"
                >
                  View All Bookings
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>{upcomingMeetings.length} scheduled</CardDescription>
            </CardHeader>
            {upcomingMeetings.length === 0 ? (
              <div className="text-center py-6">
                <Calendar className="mx-auto text-primary-300 mb-2" size={32} />
                <p className="text-sm text-primary-500">No meetings scheduled</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-start gap-3 pb-3 border-b border-primary-100 last:border-0">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-900">
                      {meeting.clientName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-primary-900 truncate">
                        {meeting.clientName}
                      </p>
                      <p className="text-xs text-primary-500">{formatTimeAgo(meeting.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings Summary</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-primary-600">This Month</span>
                  <span className="font-bold text-primary-900">{formatCurrency(monthlyEarnings)}</span>
                </div>
                <div className="w-full bg-primary-100 rounded-full h-2">
                  <div
                    className="bg-accent-emerald h-2 rounded-full"
                    style={{ width: '65%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-primary-600">Total Earnings</span>
                  <span className="font-bold text-primary-900">{formatCurrency(totalEarnings)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              <Button
                onClick={() => onNavigate('schedule')}
                variant="secondary"
                full
                className="justify-start"
              >
                📅 Update Schedule
              </Button>
              <Button
                onClick={() => onNavigate('cases')}
                variant="secondary"
                full
                className="justify-start"
              >
                📁 Manage Cases
              </Button>
              <Button
                onClick={() => onNavigate('settings')}
                variant="secondary"
                full
                className="justify-start"
              >
                ⚙️ Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
