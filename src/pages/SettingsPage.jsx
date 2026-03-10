import React, { useState } from 'react';
import { Card, Button, Input, Avatar, AvatarFallback, AvatarImage, Switch } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

export const SettingsPage = ({ onNavigate, onLogout }) => {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

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

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
        showBack={false}
      />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <Card className="xl:col-span-6 p-0">
          <div className="p-6">
            <h3 className="text-3xl font-bold mb-6">Profile</h3>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16 min-w-[4rem] min-h-[4rem]">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-3xl font-bold">{user.name}</p>
                <p className="text-slate-500">lawyer_001 · Verified</p>
              </div>
            </div>
            <div className="space-y-4">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
              <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
              <Input label="Bar Council No." name="location" value="MH/1234/2015" onChange={handleInputChange} />
              <Button onClick={handleSaveProfile} loading={isSaving}>Save Changes</Button>
            </div>
          </div>
        </Card>

        <div className="xl:col-span-6 space-y-6">
          <Card className="p-0">
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-4">Practice Areas</h3>
              <div className="flex flex-wrap gap-2">
                {['Family Law', 'Property Law', 'Corporate Law', 'Criminal Law'].map((area) => (
                  <span key={area} className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold">{area}</span>
                ))}
                <button className="px-4 py-2 rounded-full border border-slate-300 text-slate-500">+ Add</button>
              </div>
            </div>
          </Card>

          <Card className="p-0">
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-4">Notifications</h3>
              <div className="space-y-4">
                {['New booking requests', 'Payment updates', 'AI case insights', 'Consultation reminders'].map((n, idx) => (
                  <div key={n} className="flex items-center justify-between py-2 border-b border-slate-100">
                    <p className="font-medium text-slate-800">{n}</p>
                    <Switch defaultChecked={idx < 3} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-0 bg-[#071b33] text-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold">Professional Plan</h3>
              <p className="text-slate-300 mt-1">Active · Renews Apr 5, 2026</p>
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white text-[#071b33]">Manage</button>
                <button onClick={onLogout} className="px-4 py-2 rounded-lg border border-white/20">Logout</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
