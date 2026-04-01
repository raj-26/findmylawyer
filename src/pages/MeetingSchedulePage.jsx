import React, { useMemo, useState } from 'react';
import {
  addDays,
  addHours,
  addMonths,
  addWeeks,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, Plus, Trash2 } from 'lucide-react';
import { Button, Card, Input, Modal, Textarea } from '../ui';
import { useBookings } from '../context/BookingContext';

const VIEW_OPTIONS = ['week', 'day', 'month', 'agenda'];

const EVENT_COLORS = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  amber: 'bg-amber-100 text-amber-800 border-amber-200',
  rose: 'bg-rose-100 text-rose-800 border-rose-200',
};

const CALENDAR_OPTIONS = [
  { id: 'cases', label: 'Case Calendar', dot: 'bg-blue-500' },
  { id: 'personal', label: 'Personal', dot: 'bg-emerald-500' },
  { id: 'holidays', label: 'Court Holidays', dot: 'bg-amber-500' },
];

const formatInputDateTime = (date) => format(date, "yyyy-MM-dd'T'HH:mm");
const startOfDisplayWeek = (date) => startOfWeek(date, { weekStartsOn: 0 });

export const MeetingSchedulePage = () => {
  const { bookings } = useBookings();
  const [viewMode, setViewMode] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [calendarFilters, setCalendarFilters] = useState({
    cases: true,
    personal: true,
    holidays: true,
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    clientName: '',
    caseType: '',
    location: '',
    notes: '',
    color: 'blue',
    calendarId: 'cases',
    allDay: false,
    start: formatInputDateTime(addHours(new Date(), 1)),
    end: formatInputDateTime(addHours(new Date(), 2)),
  });

  const [events, setEvents] = useState(() => {
    const bookingEvents = bookings
      .filter((booking) => booking.status === 'accepted' || booking.status === 'ongoing')
      .map((booking) => {
        const start = new Date(booking.createdAt);
        return {
          id: `booking-${booking.id}`,
          title: `${booking.consultationType} · ${booking.clientName}`,
          clientName: booking.clientName,
          caseType: booking.caseType,
          location: booking.location || 'Online',
          notes: booking.description || '',
          color: booking.status === 'ongoing' ? 'rose' : 'blue',
          calendarId: 'cases',
          allDay: false,
          start,
          end: addHours(start, 1),
        };
      });

    const holidayDate = addDays(startOfDisplayWeek(new Date()), 4);
    const holidayEvent = {
      id: 'holiday-weekly',
      title: 'Court Holiday',
      clientName: 'System',
      caseType: 'Holiday',
      location: 'All Courts',
      notes: 'Public holiday, no hearings scheduled.',
      color: 'amber',
      calendarId: 'holidays',
      allDay: true,
      start: holidayDate,
      end: holidayDate,
    };

    return [...bookingEvents, holidayEvent];
  });

  const visibleEvents = useMemo(() => {
    return events.filter((event) => calendarFilters[event.calendarId] ?? true);
  }, [events, calendarFilters]);

  const miniCalendarDays = useMemo(() => {
    const first = startOfMonth(currentDate);
    const start = startOfDisplayWeek(first);
    return Array.from({ length: 42 }, (_, idx) => addDays(start, idx));
  }, [currentDate]);

  const monthGridDays = useMemo(() => {
    const first = startOfMonth(currentDate);
    const start = startOfDisplayWeek(first);
    return Array.from({ length: 42 }, (_, idx) => addDays(start, idx));
  }, [currentDate]);

  const weekDays = useMemo(() => {
    const weekStart = startOfDisplayWeek(currentDate);
    return Array.from({ length: 7 }, (_, idx) => addDays(weekStart, idx));
  }, [currentDate]);

  const allDayEvents = useMemo(() => {
    return visibleEvents.filter((event) => event.allDay);
  }, [visibleEvents]);

  const agendaEvents = useMemo(() => {
    return [...visibleEvents].sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [visibleEvents]);

  const selectedDateEvents = useMemo(() => {
    return agendaEvents.filter((event) => isSameDay(event.start, selectedDate));
  }, [agendaEvents, selectedDate]);

  const headerLabel = useMemo(() => {
    if (viewMode === 'month') return format(currentDate, 'MMMM yyyy');
    if (viewMode === 'week') {
      const weekStart = startOfDisplayWeek(currentDate);
      return format(weekStart, 'MMMM yyyy');
    }
    if (viewMode === 'day') return format(currentDate, 'EEEE, MMMM d, yyyy');
    return 'Agenda';
  }, [currentDate, viewMode]);

  const moveDate = (direction) => {
    if (viewMode === 'month') {
      setCurrentDate((prev) => (direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1)));
      return;
    }
    if (viewMode === 'week') {
      setCurrentDate((prev) => (direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1)));
      return;
    }
    if (viewMode === 'day') {
      setCurrentDate((prev) => (direction === 'next' ? addDays(prev, 1) : subDays(prev, 1)));
    }
  };

  const openCreateModal = (date = new Date()) => {
    setEditingEventId(null);
    const start = addHours(date, 1);
    setEventForm({
      title: '',
      clientName: '',
      caseType: '',
      location: '',
      notes: '',
      color: 'blue',
      calendarId: 'cases',
      allDay: false,
      start: formatInputDateTime(start),
      end: formatInputDateTime(addHours(start, 1)),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEventId(event.id);
    setEventForm({
      title: event.title,
      clientName: event.clientName,
      caseType: event.caseType,
      location: event.location,
      notes: event.notes,
      color: event.color,
      calendarId: event.calendarId,
      allDay: event.allDay,
      start: formatInputDateTime(event.start),
      end: formatInputDateTime(event.end),
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (!eventForm.title.trim()) return;

    const start = new Date(eventForm.start);
    let end = new Date(eventForm.end);
    if (end <= start) {
      end = addHours(start, 1);
    }

    const eventData = {
      id: editingEventId || `event-${Date.now()}`,
      title: eventForm.title.trim(),
      clientName: eventForm.clientName.trim() || 'Client',
      caseType: eventForm.caseType.trim() || 'General Law',
      location: eventForm.location.trim() || 'Online',
      notes: eventForm.notes.trim(),
      color: eventForm.color,
      calendarId: eventForm.calendarId,
      allDay: eventForm.allDay,
      start,
      end,
    };

    setEvents((prev) => {
      if (editingEventId) {
        return prev.map((event) => (event.id === editingEventId ? eventData : event));
      }
      return [...prev, eventData];
    });
    setIsModalOpen(false);
  };

  const handleDeleteEvent = () => {
    if (!editingEventId) return;
    setEvents((prev) => prev.filter((event) => event.id !== editingEventId));
    setIsModalOpen(false);
  };

  const renderMonthView = () => {
    return (
      <div className="grid grid-cols-7 border-t border-l border-slate-200">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
          <div key={day} className="px-3 py-2 text-[11px] font-bold text-slate-500 border-r border-b border-slate-200 bg-slate-50">
            {day}
          </div>
        ))}
        {monthGridDays.map((day) => {
          const dayEvents = visibleEvents.filter((event) => isSameDay(event.start, day));
          return (
            <button
              key={day.toISOString()}
              onClick={() => {
                setSelectedDate(day);
                openCreateModal(day);
              }}
              className={`min-h-[112px] text-left p-2 border-r border-b border-slate-200 ${
                isSameMonth(day, currentDate) ? 'bg-white' : 'bg-slate-50 text-slate-400'
              }`}
            >
              <p className={`text-xs ${isToday(day) ? 'font-bold text-blue-700' : 'text-slate-700'}`}>{format(day, 'd')}</p>
              <div className="space-y-1 mt-2">
                {dayEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className={`px-2 py-1 text-[11px] rounded border truncate ${EVENT_COLORS[event.color] || EVENT_COLORS.blue}`}>
                    {event.title}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderWeekDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = viewMode === 'day' ? [currentDate] : weekDays;

    return (
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className={`grid ${viewMode === 'day' ? 'grid-cols-[72px_1fr]' : 'grid-cols-[72px_repeat(7,minmax(0,1fr))]'} border-b border-slate-200 bg-white`}>
          <div className="p-2 text-[11px] text-slate-500 font-semibold">GMT+05:30</div>
          {days.map((day) => (
            <div key={day.toISOString()} className="px-2 py-2 border-l border-slate-200 text-center">
              <p className="text-[11px] font-bold text-slate-500 tracking-wide">{format(day, 'EEE').toUpperCase()}</p>
              <div className="mt-1 flex justify-center">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center text-xl ${isToday(day) ? 'bg-blue-600 text-white' : 'text-slate-900'}`}>
                  {format(day, 'd')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={`grid ${viewMode === 'day' ? 'grid-cols-[72px_1fr]' : 'grid-cols-[72px_repeat(7,minmax(0,1fr))]'} border-b border-slate-200 bg-slate-50`}>
          <div className="p-2 text-[11px] text-slate-500">All-day</div>
          {days.map((day) => (
            <div key={`all-${day.toISOString()}`} className="border-l border-slate-200 p-1 min-h-[34px]">
              {allDayEvents
                .filter((event) => isSameDay(event.start, day))
                .map((event) => (
                  <button
                    key={event.id}
                    onClick={() => openEditModal(event)}
                    className={`w-full text-left text-[11px] px-2 py-1 rounded border ${EVENT_COLORS[event.color] || EVENT_COLORS.blue}`}
                  >
                    {event.title}
                  </button>
                ))}
            </div>
          ))}
        </div>

        <div className="max-h-[540px] overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className={`grid ${viewMode === 'day' ? 'grid-cols-[72px_1fr]' : 'grid-cols-[72px_repeat(7,minmax(0,1fr))]'} min-h-[44px] border-b border-slate-100`}>
              <div className="px-2 py-1 text-[11px] text-slate-500">{format(new Date(2026, 0, 1, hour), 'h a')}</div>
              {days.map((day) => (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className="border-l border-slate-100 p-1"
                  onDoubleClick={() => openCreateModal(new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour))}
                >
                  {visibleEvents
                    .filter((event) => !event.allDay && isSameDay(event.start, day) && event.start.getHours() === hour)
                    .map((event) => (
                      <button
                        key={event.id}
                        onClick={() => openEditModal(event)}
                        className={`w-full text-left text-[11px] px-2 py-1 rounded border ${EVENT_COLORS[event.color] || EVENT_COLORS.blue}`}
                      >
                        <p className="font-semibold truncate">{event.title}</p>
                      </button>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAgendaView = () => {
    return (
      <div className="space-y-2">
        {agendaEvents.length === 0 && (
          <Card>
            <div className="text-center py-8 text-slate-500">No events in agenda.</div>
          </Card>
        )}
        {agendaEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => openEditModal(event)}
            className="w-full text-left border border-slate-200 rounded-xl bg-white p-3"
          >
            <p className="font-semibold text-slate-900">{event.title}</p>
            <p className="text-xs text-slate-500 mt-1">{format(event.start, 'EEE, MMM d · h:mm a')} · {event.clientName}</p>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => setCurrentDate(new Date())}>Today</Button>
            <Button size="icon" variant="ghost" onClick={() => moveDate('prev')}><ChevronLeft size={16} /></Button>
            <Button size="icon" variant="ghost" onClick={() => moveDate('next')}><ChevronRight size={16} /></Button>
            <p className="text-2xl font-semibold text-slate-900 ml-2">{headerLabel}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => openCreateModal(currentDate)}><Plus size={14} className="mr-1" />Create</Button>
            <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
              {VIEW_OPTIONS.map((view) => (
                <button
                  key={view}
                  onClick={() => setViewMode(view)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                    viewMode === view ? 'bg-[#071b33] text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr] min-h-[720px]">
          <aside className="border-r border-slate-200 bg-white">
            <div className="p-4">
              <button
                onClick={() => openCreateModal(selectedDate)}
                className="w-full rounded-2xl border border-slate-200 shadow-sm px-4 py-3 font-semibold text-left flex items-center gap-2"
              >
                <Plus size={18} /> Create
              </button>
            </div>

            <div className="px-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-800">{format(currentDate, 'MMMM yyyy')}</p>
                <div className="flex gap-1">
                  <button onClick={() => setCurrentDate((prev) => subMonths(prev, 1))} className="w-7 h-7 rounded-md hover:bg-slate-100">
                    <ChevronLeft size={14} className="mx-auto" />
                  </button>
                  <button onClick={() => setCurrentDate((prev) => addMonths(prev, 1))} className="w-7 h-7 rounded-md hover:bg-slate-100">
                    <ChevronRight size={14} className="mx-auto" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-[10px] text-slate-500 text-center mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
                  <p key={`${d}-${idx}`} className="py-1">{d}</p>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {miniCalendarDays.map((day) => (
                  <button
                    key={day.toISOString()}
                    onClick={() => {
                      setSelectedDate(day);
                      setCurrentDate(day);
                    }}
                    className={`h-7 rounded-full text-[11px] ${
                      isSameDay(day, selectedDate)
                        ? 'bg-blue-600 text-white'
                        : isToday(day)
                        ? 'bg-blue-100 text-blue-700'
                        : isSameMonth(day, currentDate)
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300'
                    }`}
                  >
                    {format(day, 'd')}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pb-4">
              <p className="text-sm font-bold text-slate-800 mb-2">My calendars</p>
              <div className="space-y-2">
                {CALENDAR_OPTIONS.map((calendar) => (
                  <label key={calendar.id} className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={calendarFilters[calendar.id]}
                      onChange={(e) =>
                        setCalendarFilters((prev) => ({
                          ...prev,
                          [calendar.id]: e.target.checked,
                        }))
                      }
                    />
                    <span className={`w-2.5 h-2.5 rounded-full ${calendar.dot}`} />
                    {calendar.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="px-4 pb-4 border-t border-slate-200 pt-3">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-2">Agenda · {format(selectedDate, 'MMM d')}</p>
              <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                {selectedDateEvents.length === 0 && <p className="text-xs text-slate-500">No events</p>}
                {selectedDateEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => openEditModal(event)}
                    className="w-full text-left border border-slate-200 rounded-lg p-2 bg-white"
                  >
                    <p className="text-xs font-semibold text-slate-900 truncate">{event.title}</p>
                    <p className="text-[11px] text-slate-500">{event.allDay ? 'All-day' : format(event.start, 'h:mm a')}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="p-3 sm:p-4 bg-white">
            {(viewMode === 'week' || viewMode === 'day') && renderWeekDayView()}
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'agenda' && renderAgendaView()}
          </section>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEventId ? 'Edit Event' : 'Create Event'}>
        <div className="space-y-3">
          <Input label="Title" value={eventForm.title} onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Case strategy call" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Client" value={eventForm.clientName} onChange={(e) => setEventForm((prev) => ({ ...prev, clientName: e.target.value }))} placeholder="Priya Patel" />
            <Input label="Case Type" value={eventForm.caseType} onChange={(e) => setEventForm((prev) => ({ ...prev, caseType: e.target.value }))} placeholder="Corporate Law" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Start" type="datetime-local" value={eventForm.start} onChange={(e) => setEventForm((prev) => ({ ...prev, start: e.target.value }))} />
            <Input label="End" type="datetime-local" value={eventForm.end} onChange={(e) => setEventForm((prev) => ({ ...prev, end: e.target.value }))} />
          </div>

          <Input label="Location" value={eventForm.location} onChange={(e) => setEventForm((prev) => ({ ...prev, location: e.target.value }))} placeholder="Google Meet / Chamber" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-sm font-medium text-primary-900 mb-2">Calendar</p>
              <select
                value={eventForm.calendarId}
                onChange={(e) => setEventForm((prev) => ({ ...prev, calendarId: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary-200 bg-white"
              >
                {CALENDAR_OPTIONS.map((calendar) => (
                  <option key={calendar.id} value={calendar.id}>{calendar.label}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-sm font-medium text-primary-900 mb-2">Color</p>
              <div className="flex gap-2">
                {Object.keys(EVENT_COLORS).map((color) => (
                  <button
                    key={color}
                    onClick={() => setEventForm((prev) => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === 'blue' ? 'bg-blue-500' : color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                    } ${eventForm.color === color ? 'ring-2 ring-offset-2 ring-slate-700' : 'border-transparent'}`}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={eventForm.allDay}
              onChange={(e) => setEventForm((prev) => ({ ...prev, allDay: e.target.checked }))}
            />
            All-day event
          </label>

          <Textarea label="Notes" value={eventForm.notes} onChange={(e) => setEventForm((prev) => ({ ...prev, notes: e.target.value }))} rows={3} placeholder="Agenda and hearing points" />

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Clock3 size={14} />
              <MapPin size={14} />
              <CalendarDays size={14} />
            </div>
            <div className="flex gap-2">
              {editingEventId && (
                <Button variant="danger" size="sm" onClick={handleDeleteEvent}>
                  <Trash2 size={14} className="mr-1" /> Delete
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={handleSaveEvent}>{editingEventId ? 'Update' : 'Save'}</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
