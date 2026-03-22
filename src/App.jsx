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
import { AIHelpPage } from './pages/AIHelpPage';
import { AICaseIntelligencePage } from './pages/AICaseIntelligencePage';
import { DemandDraftPage } from './pages/DemandDraftPage';
import { SettingsPage } from './pages/SettingsPage';
import { SubscriptionPage } from './pages/SubscriptionPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [navigationState, setNavigationState] = useState(null);

  const handleNavigate = (page, state = null) => {
    setCurrentPage(page);
    setNavigationState(state);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const renderPage = () => {
    const props = {
      onNavigate: handleNavigate,
      onLogout: handleLogout,
      navState: navigationState,
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
      case 'ai-help':
        return <AIHelpPage {...props} />;
      case 'ai-case-intelligence':
        return <AICaseIntelligencePage {...props} />;
      case 'demand-draft':
        return <DemandDraftPage {...props} />;
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
        <MainLayout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        >
          {renderPage()}
        </MainLayout>
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
