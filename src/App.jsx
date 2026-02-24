import React, { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Import pages
import { DashboardPage } from './pages/DashboardPage';
import { BookingManagementPage } from './pages/BookingManagementPage';
import { MeetingSchedulePage } from './pages/MeetingSchedulePage';
import { CaseFilesPage } from './pages/CaseFilesPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ChatPage } from './pages/ChatPage';
import { SettingsPage } from './pages/SettingsPage';
import { SubscriptionPage } from './pages/SubscriptionPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const renderPage = () => {
    const props = {
      onNavigate: handleNavigate,
      onLogout: handleLogout,
    };

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage {...props} />;
      case 'bookings':
        return <BookingManagementPage {...props} />;
      case 'schedule':
        return <MeetingSchedulePage {...props} />;
      case 'cases':
        return <CaseFilesPage {...props} />;
      case 'payments':
        return <PaymentsPage {...props} />;
      case 'chat':
        return <ChatPage {...props} />;
      case 'settings':
        return <SettingsPage {...props} />;
      case 'subscription':
        return <SubscriptionPage {...props} />;
      default:
        return <DashboardPage {...props} />;
    }
  };

  return (
    <AuthProvider>
      <BookingProvider>
        <MainLayout currentPage={currentPage} onNavigate={handleNavigate}>
          {renderPage()}
        </MainLayout>
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
