import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Alert,
} from '../ui';
import { useBookings } from '../context/BookingContext';
import { formatDate, formatTime } from '../utils';

export const MeetingSchedulePage = ({ onNavigate }) => {
  const { bookings, startConsultation, completeConsultation } = useBookings();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Get scheduled meetings
  const scheduledMeetings = bookings.filter((b) => ['accepted', 'ongoing'].includes(b.status));

  // Group by date
  const groupedByDate = scheduledMeetings.reduce((acc, meeting) => {
    const date = formatDate(meeting.createdAt, 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(meeting);
    return acc;
  }, {});

  const meetingStatuses = {
    today: 0,
    tomorrow: 0,
    upcoming: 0,
  };

  scheduledMeetings.forEach((meeting) => {
    const today = new Date().toDateString();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
    const meetingDate = new Date(meeting.createdAt).toDateString();

    if (meetingDate === today) meetingStatuses.today++;
    else if (meetingDate === tomorrow) meetingStatuses.tomorrow++;
    else meetingStatuses.upcoming++;
  });

  const MeetingCard = ({ meeting, isUpcoming }) => (
    <Card hover className="flex items-start gap-4 p-5">
      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-900">
        {meeting.clientName[0]}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-bold text-primary-900">{meeting.clientName}</h4>
            <p className="text-xs text-primary-500">{meeting.caseType}</p>
          </div>
          <Badge status={meeting.status} size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-3 my-3 text-sm">
          <div className="flex items-center gap-2 text-primary-600">
            <Clock size={16} />
            <span>{formatTime(new Date())}</span>
          </div>
          <div className="flex items-center gap-2 text-primary-600">
            <Video size={16} />
            <span>Video Call</span>
          </div>
        </div>

        <div className="flex gap-2">
          {isUpcoming && meeting.status === 'accepted' && (
            <Button
              onClick={() => startConsultation(meeting.id)}
              variant="success"
              size="sm"
            >
              Start Call
            </Button>
          )}
          {meeting.status === 'ongoing' && (
            <>
              <Button
                onClick={() => onNavigate('chat')}
                variant="primary"
                size="sm"
              >
                Open Chat
              </Button>
              <Button
                onClick={() => completeConsultation(meeting.id)}
                variant="secondary"
                size="sm"
              >
                End Call
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Meeting Schedule</h1>
        <p className="text-primary-600">Manage your upcoming consultations and video calls</p>
      </div>

      {/* Alert if no meetings */}
      {scheduledMeetings.length === 0 && (
        <Alert
          type="info"
          title="No Scheduled Meetings"
          message="You don't have any scheduled meetings. Accept booking requests to get started!"
        />
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="text-3xl">📅</div>
            <div>
              <p className="text-sm text-primary-600">Today</p>
              <p className="text-2xl font-bold text-primary-900">{meetingStatuses.today}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="text-3xl">📆</div>
            <div>
              <p className="text-sm text-primary-600">Tomorrow</p>
              <p className="text-2xl font-bold text-primary-900">{meetingStatuses.tomorrow}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="text-3xl">📊</div>
            <div>
              <p className="text-sm text-primary-600">Upcoming</p>
              <p className="text-2xl font-bold text-primary-900">{meetingStatuses.upcoming}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
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
            {/* Today's Meetings */}
            {meetingStatuses.today > 0 && (
              <div>
                <h3 className="font-bold text-primary-900 mb-4 text-lg">📅 Today</h3>
                <div className="space-y-3">
                  {scheduledMeetings
                    .filter((m) => new Date(m.createdAt).toDateString() === new Date().toDateString())
                    .map((meeting) => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        isUpcoming={false}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Tomorrow's Meetings */}
            {meetingStatuses.tomorrow > 0 && (
              <div>
                <h3 className="font-bold text-primary-900 mb-4 text-lg">📆 Tomorrow</h3>
                <div className="space-y-3">
                  {scheduledMeetings
                    .filter(
                      (m) =>
                        new Date(m.createdAt).toDateString() ===
                        new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()
                    )
                    .map((meeting) => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        isUpcoming={true}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Upcoming Meetings */}
            {meetingStatuses.upcoming > 0 && (
              <div>
                <h3 className="font-bold text-primary-900 mb-4 text-lg">📊 Upcoming</h3>
                <div className="space-y-3">
                  {scheduledMeetings
                    .filter((m) => {
                      const today = new Date().toDateString();
                      const tomorrow = new Date(
                        Date.now() + 24 * 60 * 60 * 1000
                      ).toDateString();
                      const meetingDate = new Date(m.createdAt).toDateString();
                      return meetingDate !== today && meetingDate !== tomorrow;
                    })
                    .map((meeting) => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        isUpcoming={true}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <Card className="text-center py-12">
            <Calendar size={48} className="mx-auto text-primary-300 mb-4" />
            <h3 className="text-lg font-bold text-primary-900 mb-2">No Meetings Scheduled</h3>
            <p className="text-primary-600">Accept client bookings to schedule meetings</p>
          </Card>
        )}
      </div>
    </div>
  );
};
