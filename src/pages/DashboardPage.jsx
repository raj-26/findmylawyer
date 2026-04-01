import React from 'react';
import { Card } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { formatCurrency } from '../utils';

export const DashboardPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { bookings } = useBookings();

  const requiredProfileFields = [
    user?.name,
    user?.age,
    user?.phone,
    user?.college,
    user?.specialization,
    user?.address,
    user?.workAddress,
    user?.panCard,
    user?.lawyerLicence,
    user?.workplace,
    user?.barCouncilNo,
    user?.profilePhoto,
  ];

  const isProfileComplete = requiredProfileFields.every(
    (value) => typeof value === 'string' && value.trim().length > 0
  );

  // Calculate statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const ongoingConsultations = bookings.filter((b) => b.status === 'ongoing').length;
  const monthlyEarnings = 45000;
  const recentBookings = bookings.slice(0, 3);

  return (
    <div>
      <PageHeader
        title={`Hello, ${user.name ? user.name.replace('Adv. ', '') : 'Advocate'}`}
        subtitle="Here's your overview for today, March 5, 2026"
        showBack={false}
      />

      <div>
        <div
          className={`mb-6 rounded-2xl px-5 py-4 font-medium border ${
            isProfileComplete
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}
        >
          {isProfileComplete
            ? "Profile Complete - You're ready to accept consultations. Your profile is 100% complete."
            : 'Your profile is not complete. Please complete all details in profile setup.'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-0"><div className="p-6"><p className="text-slate-500 text-sm">Total Bookings</p><p className="text-4xl font-extrabold mt-2">{totalBookings}</p><p className="text-emerald-600 text-sm mt-2">↑ 12%</p></div></Card>
          <Card className="p-0"><div className="p-6"><p className="text-slate-500 text-sm">Pending Requests</p><p className="text-4xl font-extrabold mt-2">{pendingBookings}</p><p className="text-red-500 text-sm mt-2">↓ 5%</p></div></Card>
          <Card className="p-0"><div className="p-6"><p className="text-slate-500 text-sm">Ongoing Cases</p><p className="text-4xl font-extrabold mt-2">{ongoingConsultations}</p><p className="text-emerald-600 text-sm mt-2">↑ 8%</p></div></Card>
        </div>

        <Card className="mb-6 p-0">
          <div className="p-6">
            <p className="text-slate-500 text-sm">Monthly Earnings</p>
            <p className="text-5xl font-extrabold mt-2">{formatCurrency(monthlyEarnings)}</p>
            <p className="text-emerald-600 text-sm mt-2">↑ 15%</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-0">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Recent Booking Requests</h3>
                <p className="text-slate-500 text-sm">{pendingBookings} pending requests</p>
              </div>
              <button className="text-blue-600 font-semibold" onClick={() => onNavigate('bookings')}>View all →</button>
            </div>
            <div className="p-6 space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="border border-slate-200 rounded-xl p-4">
                  <p className="font-bold text-lg">{booking.clientName}</p>
                  <p className="text-slate-500 text-sm">{booking.caseType}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-0">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-2xl font-bold">Today's Schedule</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentBookings.map((booking, index) => (
                <div key={booking.id} className="flex gap-4 items-start">
                  <p className="w-20 font-bold text-slate-800">{index === 0 ? '10:00 AM' : '02:00 PM'}</p>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <p className="font-bold">{booking.clientName}</p>
                    <p className="text-slate-500 text-sm">{booking.caseType} · Video</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-200 flex gap-2">
                <button
                  onClick={() => onNavigate('schedule')}
                  className="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 font-bold hover:bg-black hover:text-white hover:border-black transition-colors"
                >
                  Open Schedule
                </button>
                <button
                  onClick={() => onNavigate('chat')}
                  className="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 font-bold hover:bg-black hover:text-white hover:border-black transition-colors"
                >
                  Open Chat
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
