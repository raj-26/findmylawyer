import React, { useState } from 'react';
import { LogOut, Camera, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Button, Input } from '../ui';
import { useAuth } from '../context/AuthContext';

export const SettingsPage = ({ onNavigate, onLogout }) => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    specialization: user.specialization,
    experience: user.experience,
    location: user.location,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
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
      alert('Profile updated successfully!');
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: '👤' },
    { id: 'availability', label: 'Availability', icon: '📅' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security & Privacy', icon: '🔒' },
    { id: 'support', label: 'Help & Support', icon: '❓' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Settings</h1>
        <p className="text-primary-600">Manage your profile and preferences</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-primary-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary-800 text-primary-900'
                : 'border-transparent text-primary-600 hover:text-primary-900'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Settings Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile photo</CardDescription>
            </CardHeader>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-900">
                {user.avatar}
              </div>
              <Button variant="secondary" className="flex items-center gap-2">
                <Camera size={18} />
                Upload Photo
              </Button>
            </div>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic information</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Your legal expertise details</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
              />
              <Input
                label="Years of Experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-2">
            <Button
              onClick={handleSaveProfile}
              variant="primary"
              loading={isSaving}
              className="flex items-center gap-2"
            >
              <Check size={18} />
              Save Changes
            </Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </div>
      )}

      {/* Availability Tab */}
      {activeTab === 'availability' && (
        <Card>
          <CardHeader>
            <CardTitle>Availability Schedule</CardTitle>
            <CardDescription>Set your consultation availability</CardDescription>
          </CardHeader>
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <div key={day} className="flex items-center justify-between p-3 bg-primary-50 rounded">
                  <span className="font-medium text-primary-900">{day}</span>
                  <div className="flex gap-2">
                    <Input
                      type="time"
                      defaultValue="09:00"
                      className="w-32"
                    />
                    <span className="flex items-center text-primary-600">to</span>
                    <Input
                      type="time"
                      defaultValue="17:00"
                      className="w-32"
                    />
                  </div>
                </div>
              )
            )}
            <Button variant="primary" className="mt-4">
              Save Availability
            </Button>
          </div>
        </Card>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control how you receive notifications</CardDescription>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded">
              <div>
                <p className="font-medium text-primary-900">Email Notifications</p>
                <p className="text-sm text-primary-600">Receive updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    emailNotifications: e.target.checked,
                  }))
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded">
              <div>
                <p className="font-medium text-primary-900">SMS Notifications</p>
                <p className="text-sm text-primary-600">Receive updates via SMS</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.smsNotifications}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    smsNotifications: e.target.checked,
                  }))
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded">
              <div>
                <p className="font-medium text-primary-900">Booking Alerts</p>
                <p className="text-sm text-primary-600">Get notified of new booking requests</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.bookingAlerts}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    bookingAlerts: e.target.checked,
                  }))
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <Button variant="primary" className="mt-4">
              Save Preferences
            </Button>
          </div>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password regularly</CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
              <Button variant="primary">Update Password</Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add extra security to your account</CardDescription>
            </CardHeader>
            <Button variant="secondary">Enable 2FA</Button>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Activity</CardTitle>
              <CardDescription>Recent logins to your account</CardDescription>
            </CardHeader>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded">
                <div>
                  <p className="font-medium text-primary-900">Chrome on Windows</p>
                  <p className="text-sm text-primary-600">Today at 2:30 PM</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Current</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>Get help with your account</CardDescription>
            </CardHeader>
            <div className="space-y-3">
              <Button variant="secondary" full className="justify-start">
                📚 Knowledge Base
              </Button>
              <Button variant="secondary" full className="justify-start">
                💬 Contact Support
              </Button>
              <Button variant="secondary" full className="justify-start">
                📧 Email Support
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>Permanently delete your account and data</CardDescription>
            </CardHeader>
            <p className="text-sm text-primary-600 mb-4">
              This action is irreversible. Please ensure you have downloaded all necessary data.
            </p>
            <Button variant="danger">Delete Account</Button>
          </Card>

          <div className="flex gap-2">
            <Button
              onClick={onLogout}
              variant="danger"
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
