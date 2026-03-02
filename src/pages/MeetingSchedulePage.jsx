import React, { useState } from 'react';
import { Calendar, Video, MessageSquare, Clock } from 'lucide-react';
import { Card, Button } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { useBookings } from '../context/BookingContext';
import { formatTimeAgo } from '../utils';

const MeetingCard = ({ meeting, isUpcoming }) => {
  const { updateBookingStatus } = useBookings();

  const handleAction = (status) => {
    updateBookingStatus(meeting.id, status);
  };

  return (
    <Card>
      <div className="p-4 flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-lg font-bold text-primary-900">
          {meeting.clientName[0]}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-primary-900">{meeting.clientName}</p>
              <p className="text-sm text-primary-600">{meeting.caseType}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary-900">{formatTimeAgo(meeting.createdAt)}</p>
              <p className="text-xs text-primary-500">{meeting.consultationType}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {meeting.status === 'accepted' && (
              <Button onClick={() => handleAction('ongoing')} size="sm" className="flex-1">
                <Video size={16} className="mr-2" /> Start Call
              </Button>
            )}
            {meeting.status === 'ongoing' && (
              <>
                <Button size="sm" variant="secondary" className="flex-1">
                  <MessageSquare size={16} className="mr-2" /> Open Chat
                </Button>
                <Button onClick={() => handleAction('completed')} size="sm" variant="danger" className="flex-1">
                  End Call
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export const MeetingSchedulePage = ({ onNavigate }) => {
  const { bookings } = useBookings();
  const [viewMode, setViewMode] = useState('list');

  const scheduledMeetings = bookings.filter(
    (b) => b.status === 'accepted' || b.status === 'ongoing'
  );

  const getMeetingStatusCounts = () => {
    const today = new Date().toDateString();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
    
    return scheduledMeetings.reduce(
      (acc, meeting) => {
        const meetingDate = new Date(meeting.createdAt).toDateString();
        if (meetingDate === today) acc.today++;
        else if (meetingDate === tomorrow) acc.tomorrow++;
        else acc.upcoming++;
        return acc;
      },
      { today: 0, tomorrow: 0, upcoming: 0 }
    );
  };

  const meetingStatuses = getMeetingStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title="Meeting Schedule"
        subtitle="View and manage your upcoming consultations"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Today</p>
                <p className="text-2xl font-bold text-primary-900">{meetingStatuses.today}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Tomorrow</p>
                <p className="text-2xl font-bold text-primary-900">{meetingStatuses.tomorrow}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Calendar size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Upcoming</p>
                <p className="text-2xl font-bold text-primary-900">{meetingStatuses.upcoming}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setViewMode('list')}
            variant={viewMode === 'list' ? 'primary' : 'secondary'}
            size="sm"
          >
            List View
          </Button>
          <Button
            onClick={() => setViewMode('calendar')}
            variant={viewMode === 'calendar' ? 'primary' : 'secondary'}
            size="sm"
          >
            Calendar View
          </Button>
        </div>

        {/* Meetings List */}
        <div className="space-y-6">
          {scheduledMeetings.length > 0 ? (
            <>
              {meetingStatuses.today > 0 && (
                <div>
                  <h3 className="font-bold text-primary-900 mb-4 text-lg">Today</h3>
                  <div className="space-y-3">
                    {scheduledMeetings
                      .filter((m) => new Date(m.createdAt).toDateString() === new Date().toDateString())
                      .map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                      ))}
                  </div>
                </div>
              )}
              {meetingStatuses.tomorrow > 0 && (
                <div>
                  <h3 className="font-bold text-primary-900 mb-4 text-lg">Tomorrow</h3>
                  <div className="space-y-3">
                    {scheduledMeetings
                      .filter(
                        (m) =>
                          new Date(m.createdAt).toDateString() ===
                          new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()
                      )
                      .map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} isUpcoming={true} />
                      ))}
                  </div>
                </div>
              )}
              {meetingStatuses.upcoming > 0 && (
                <div>
                  <h3 className="font-bold text-primary-900 mb-4 text-lg">Upcoming</h3>
                  <div className="space-y-3">
                    {scheduledMeetings
                      .filter((m) => {
                        const today = new Date().toDateString();
                        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
                        const meetingDate = new Date(m.createdAt).toDateString();
                        return meetingDate !== today && meetingDate !== tomorrow;
                      })
                      .map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} isUpcoming={true} />
                      ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Card>
              <div className="text-center py-12">
                <Calendar className="mx-auto text-primary-300 mb-4" size={48} />
                <h3 className="text-lg font-bold text-primary-900">No Meetings Scheduled</h3>
                <p className="text-primary-600">You have no upcoming consultations.</p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};
