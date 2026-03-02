import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Button, Alert } from '../ui';
import { StatsCard, BookingCard, EmptyBookingsState } from '../components/BookingComponents';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { formatCurrency } from '../utils';

export const DashboardPage = ({ onNavigate, onLogout }) => {
  const { user } = useAuth();
  const { bookings, acceptBooking } = useBookings();
  const [showAlert, setShowAlert] = useState(true);

  // Calculate statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const ongoingConsultations = bookings.filter((b) => b.status === 'ongoing').length;
  const monthlyEarnings = 45000;
  const totalEarnings = 185000;
  const recentBookings = bookings.slice(0, 3);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PageHeader
        title="Dashboard"
        subtitle="Manage your consultations and earnings"
        showBack={false}
        centerTitle={true}
        leftAction={
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-black/20 border border-white/10">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <img src="/logo.svg" alt="FindMyLawyer logo" className="w-5 h-5" />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-base font-bold text-white">FindMyLawyer</p>
              <p className="text-xs text-primary-200">Welcome back, {user.id}</p>
            </div>
          </div>
        }
        rightAction={
          <button
            onClick={onLogout}
            className="px-4 py-2 text-white hover:bg-primary-700 rounded-lg transition-colors"
          >
            Logout
          </button>
        }
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary-900 mb-2">Hello, {user.name.split(' ')[0]}</h2>
          <p className="text-primary-600">You're all set. Here's your consultation overview for today.</p>
        </div>

        {/* Alert */}
        {showAlert && (
          <Alert
            type="success"
            title="Profile Complete"
            message="Your profile is 100% complete. You're ready to accept consultations."
            onClose={() => setShowAlert(false)}
          />
        )}

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
                <CardTitle>Recent Booking Requests</CardTitle>
                <CardDescription>
                  {pendingBookings} pending request{pendingBookings !== 1 ? 's' : ''}
                </CardDescription>
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
                      onReject={() => {}}
                      onStartCall={() => onNavigate('chat')}
                      showActions={booking.status === 'pending'}
                    />
                  ))}
                </div>
              )}

              {bookings.length > 3 && (
                <div className="px-6 py-4 border-t border-primary-100 bg-primary-50">
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
            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
              </CardHeader>
              <div className="space-y-4 px-6 pb-6">
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
                  <div className="flex justify-between items-center">
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
              <div className="space-y-2 px-6 pb-6">
                <Button
                  onClick={() => onNavigate('schedule')}
                  variant="secondary"
                  full
                  className="justify-start"
                >
                  Update Schedule
                </Button>
                <Button
                  onClick={() => onNavigate('settings')}
                  variant="secondary"
                  full
                  className="justify-start"
                >
                  Profile Settings
                </Button>
                <Button
                  onClick={() => onNavigate('payments')}
                  variant="secondary"
                  full
                  className="justify-start"
                >
                  View Earnings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
