import React, { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Import pages
import { DashboardPage } from './pages/DashboardPage';
import { BookingManagementPage } from './pages/BookingManagementPage';
import { MeetingSchedulePage } from './pages/MeetingSchedulePage';
import { CaseFilesPage } from './pages/CaseFilesPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ChatPage } from './pages/ChatPage';
import { AIHelpPage } from './pages/AIHelpPage';
import { DemandDraftPage } from './pages/DemandDraftPage';
import { SettingsPage } from './pages/SettingsPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { LawyerLoginPage } from './pages/LawyerLoginPage';
import { ClientRegisterPage } from './pages/ClientRegisterPage';
import { LawyerProfileSetupPage } from './pages/LawyerProfileSetupPage';

const AppContent = () => {
  const { updateProfile } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');
  const [navigationState, setNavigationState] = useState(null);

  const handleNavigate = (page, state = null) => {
    setCurrentPage(page);
    setNavigationState(state);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const handleRegisterSuccess = (data) => {
    // Map LawyerProfileSetupPage field names to AuthContext field names
    const mappedData = {
      name: data.fullName,
      phone: data.contact,
      specialization: data.speciality,
      age: data.age,
      college: data.college,
      workplace: data.workplace,
      barCouncilNo: data.barCouncilNo,
      panCard: data.panCard,
      profilePhoto: data.profilePhoto,
      address: data.address,
      workAddress: data.workAddress,
      lawyerLicence: data.lawyerLicence,
    };
    updateProfile(mappedData);
    handleNavigate('dashboard');
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

  if (currentPage === 'login') {
    return (
      <LawyerLoginPage
        onLogin={() => handleNavigate('dashboard')}
        onOpenRegister={() => handleNavigate('register-lawyer')}
      />
    );
  }

  if (currentPage === 'register-lawyer') {
    return (
      <ClientRegisterPage
        onBackToLogin={() => handleNavigate('login')}
        onRegisterSuccess={() => handleNavigate('lawyer-profile-setup')}
      />
    );
  }

  if (currentPage === 'lawyer-profile-setup') {
    return (
      <LawyerProfileSetupPage
        onBackToLogin={() => handleNavigate('login')}
        onRegisterSuccess={handleRegisterSuccess}
      />
    );
  }

  if (currentPage === 'register-client') {
    return (
      <ClientRegisterPage
        onBackToLogin={() => handleNavigate('login')}
        onRegisterSuccess={() => handleNavigate('dashboard')}
      />
    );
  }

  return (
    <MainLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderPage()}
    </MainLayout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
