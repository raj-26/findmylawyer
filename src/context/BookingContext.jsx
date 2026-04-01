import React, { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_BOOKINGS } from '../constants';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('all');

  const getFilteredBookings = useCallback(
    (status) => {
      if (status === 'all') return bookings;
      return bookings.filter((b) => b.status === status);
    },
    [bookings]
  );

  const updateBookingStatus = useCallback((bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  }, []);

  const rejectBooking = useCallback((bookingId) => {
    updateBookingStatus(bookingId, 'rejected');
  }, [updateBookingStatus]);

  const acceptBooking = useCallback((bookingId) => {
    updateBookingStatus(bookingId, 'accepted');
  }, [updateBookingStatus]);

  const startConsultation = useCallback((bookingId) => {
    updateBookingStatus(bookingId, 'ongoing');
  }, [updateBookingStatus]);

  const completeConsultation = useCallback((bookingId) => {
    updateBookingStatus(bookingId, 'completed');
  }, [updateBookingStatus]);

  const value = {
    bookings,
    selectedBooking,
    setSelectedBooking,
    filter,
    setFilter,
    getFilteredBookings,
    updateBookingStatus,
    rejectBooking,
    acceptBooking,
    startConsultation,
    completeConsultation,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within BookingProvider');
  }
  return context;
};
