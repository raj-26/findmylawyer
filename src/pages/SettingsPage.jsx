import React, { useState } from 'react';
import { User, Bell, Shield, LifeBuoy, LogOut, Camera, Check, Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Button, Input, Avatar, AvatarFallback, AvatarImage, Switch } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

const SettingsTab = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors w-full text-left ${
      active ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100 text-primary-700'
    }`}
  >
    {icon}
    {label}
  </button>
);

export const SettingsPage = ({ onNavigate, onLogout }) => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    specialization: user.specialization,
    experience: user.experience,
    location: user.location,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateProfile(formData);
      setIsSaving(false);
      // In a real app, show a toast notification
      alert('Profile updated successfully!');
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
    { id: 'support', label: 'Help & Support', icon: <LifeBuoy size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <div className="p-6 flex items-center gap-6">
                <Avatar className="w-20 h-20 min-w-[5rem] min-h-[5rem] aspect-square">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
                </Avatar>
                <Button variant="secondary"><Camera size={16} className="mr-2" /> Upload Photo</Button>
              </div>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
                <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
                <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} />
                <Input label="Specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} />
                <Input label="Years of Experience" name="experience" type="number" value={formData.experience} onChange={handleInputChange} />
              </div>
              <div className="p-6 border-t flex justify-end">
                <Button onClick={handleSaveProfile} loading={isSaving}><Check size={16} className="mr-2" /> Save Changes</Button>
              </div>
            </Card>
          </div>
        );
      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive alerts.</CardDescription>
            </CardHeader>
            <div className="p-6 space-y-4">
              {([
                { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email.' },
                { id: 'sms', label: 'SMS Notifications', desc: 'Get alerts on your phone.' },
                { id: 'booking', label: 'New Booking Alerts', desc: 'Instant alert for new bookings.' },
                { id: 'payment', label: 'Payment Confirmations', desc: 'Alerts for successful payments.' },
              ]).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-primary-900">{item.label}</p>
                    <p className="text-sm text-primary-600">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              ))}
            </div>
          </Card>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <div className="p-6 space-y-4">
                <Input label="Current Password" type="password" />
                <div className="relative">
                  <Input label="New Password" type={showPassword ? 'text' : 'password'} />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-7" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
              <div className="p-6 border-t flex justify-end">
                <Button>Update Password</Button>
              </div>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                <CardDescription>Add an extra layer of security to your account.</CardDescription>
              </CardHeader>
              <div className="p-6 flex items-center justify-between">
                <p className="text-sm text-primary-700">Status: <span className="font-bold text-red-600">Disabled</span></p>
                <Button variant="secondary">Enable 2FA</Button>
              </div>
            </Card>
          </div>
        );
      case 'support':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Find answers or get in touch.</CardDescription>
              </CardHeader>
              <div className="p-6 space-y-3">
                <Button variant="outline" className="w-full justify-start">Visit FAQ</Button>
                <Button variant="outline" className="w-full justify-start">Contact Support</Button>
              </div>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Logout</CardTitle>
                <CardDescription>You can logout from your account here.</CardDescription>
              </CardHeader>
              <div className="p-6">
                <Button variant="danger" onClick={onLogout}><LogOut size={16} className="mr-2" /> Logout</Button>
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <div className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <SettingsTab
                    key={tab.id}
                    icon={tab.icon}
                    label={tab.label}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
            </Card>
          </div>
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};
