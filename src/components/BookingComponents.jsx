import React from 'react';
import { MapPin, MessageSquare, Users, AlertCircle, Phone, Video, MessageCircle } from 'lucide-react';
import { Card, Badge, Button } from '../ui';
import { formatTimeAgo, formatCurrency, truncateText } from '../utils';

/**
 * Booking Card Component - Displays a single booking/consultation request
 */
export const BookingCard = ({
  booking,
  onAccept,
  onReject,
  onStartCall,
  onViewDetails,
  showActions = true,
}) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Urgent':
        return 'danger';
      case 'Moderate':
        return 'warning';
      default:
        return 'info';
    }
  };

  const canAccept = booking.status === 'pending';
  const canReject = booking.status === 'pending';
  const canStartCall = ['accepted', 'ongoing'].includes(booking.status);

  return (
    <Card hover className="mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary-900 mb-1">{booking.clientName}</h3>
          <Badge status={booking.status} size="sm" />
        </div>
        <Badge variant={getUrgencyColor(booking.urgency)} text={booking.urgency} size="sm" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-primary-600">
          <MessageSquare size={16} />
          <span>{booking.caseType}</span>
        </div>
        <div className="flex items-center gap-2 text-primary-600">
          <MapPin size={16} />
          <span>{booking.location}</span>
        </div>
        <div className="flex items-center gap-2 text-primary-600">
          <Users size={16} />
          <span>{booking.language}</span>
        </div>
        <div className="text-primary-500 text-xs">{formatTimeAgo(booking.createdAt)}</div>
      </div>

      <div className="bg-primary-50 p-3 rounded-lg mb-4">
        <p className="text-sm text-primary-700">{truncateText(booking.description, 150)}</p>
      </div>

      {showActions && (
        <div className="flex gap-2">
          {canAccept && (
            <Button
              onClick={() => onAccept(booking.id)}
              variant="success"
              size="sm"
              className="flex-1"
            >
              Accept
            </Button>
          )}
          {canReject && (
            <Button
              onClick={() => onReject(booking.id)}
              variant="danger"
              size="sm"
              className="flex-1"
            >
              Reject
            </Button>
          )}
          {canStartCall && (
            <Button
              onClick={() => onStartCall(booking.id)}
              variant="primary"
              size="sm"
              className="flex-1"
            >
              Start Consultation
            </Button>
          )}
          <Button
            onClick={() => onViewDetails(booking.id)}
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
        </div>
      )}
    </Card>
  );
};

/**
 * Consultation Type Selector Component
 */
export const ConsultationTypeSelector = ({ selected, onSelect }) => {
  const types = [
    { id: 'call', label: 'Voice Call', icon: Phone, price: 1500 },
    { id: 'video', label: 'Video Call', icon: Video, price: 2000 },
    { id: 'chat', label: 'Chat', icon: MessageCircle, price: 1000 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {types.map((type) => {
        const Icon = type.icon;
        return (
          <Button
            key={type.id}
            onClick={() => onSelect(type.id)}
            variant={selected === type.id ? 'primary' : 'secondary'}
            className="flex flex-col items-center gap-2 py-6"
            full
          >
            <Icon size={24} />
            <span>{type.label}</span>
            <span className="text-sm">{formatCurrency(type.price)}</span>
          </Button>
        );
      })}
    </div>
  );
};

/**
 * Stats Card Component - For dashboard
 */
export const StatsCard = ({ icon: Icon, label, value, trend, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
  };

  return (
    <Card className="flex items-start gap-4">
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-primary-500 mb-1">{label}</p>
        <div className="flex items-end gap-2">
          <h3 className="text-2xl font-bold text-primary-900">{value}</h3>
          {trend && (
            <span className={`text-sm ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

/**
 * Empty Bookings State Component
 */
export const EmptyBookingsState = ({ onRefresh }) => (
  <div className="text-center py-12">
    <MessageSquare size={48} className="mx-auto text-primary-300 mb-4" />
    <h3 className="text-lg font-bold text-primary-900 mb-2">No bookings yet</h3>
    <p className="text-primary-500 mb-4">
      Your consultation requests will appear here once clients book you.
    </p>
    <Button onClick={onRefresh} variant="secondary">
      Refresh
    </Button>
  </div>
);
