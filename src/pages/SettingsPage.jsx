import React, { useRef, useState } from 'react';
import { Card, Button, Input, Avatar, AvatarFallback, AvatarImage, Switch } from '../ui';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

export const SettingsPage = ({ onNavigate, onLogout }) => {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(user.profilePhoto || '');
  const [practiceAreas, setPracticeAreas] = useState(
    user.practiceAreas || ['Family Law', 'Property Law', 'Corporate Law', 'Criminal Law']
  );
  const [newPracticeArea, setNewPracticeArea] = useState('');
  const [isAddingPracticeArea, setIsAddingPracticeArea] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    specialization: user.specialization,
    experience: user.experience,
    location: user.location,
    age: user.age || '',
    college: user.college || '',
    panCard: user.panCard || '',
    workplace: user.workplace || '',
    barCouncilNo: user.barCouncilNo || '',
    address: user.address || '',
    workAddress: user.workAddress || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateProfile({
        ...formData,
        profilePhoto: profileImage,
        practiceAreas,
      });
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleChangePassword = () => {
    if (!password || !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePhotoPick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(String(reader.result || ''));
    };
    reader.readAsDataURL(file);
  };

  const handleAddPracticeArea = () => {
    const cleaned = newPracticeArea.trim();
    if (!cleaned) return;

    const alreadyExists = practiceAreas.some(
      (area) => area.toLowerCase() === cleaned.toLowerCase()
    );
    if (alreadyExists) {
      alert('Practice area already exists.');
      return;
    }

    setPracticeAreas((prev) => [...prev, cleaned]);
    setNewPracticeArea('');
    setIsAddingPracticeArea(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
        showBack={false}
      />

      {/* Sub-sections under Settings */}
      <div className="mb-6 rounded-xl bg-[#071b33] px-3 py-2 shadow-[0_10px_24px_rgba(2,6,23,0.18)]">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#071b33]'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Card className="p-0">
          <div className="p-6">
            <h3 className="text-3xl font-bold mb-6">Profile Information</h3>
            <div className="flex items-center gap-4 mb-6">
              <button
                type="button"
                onClick={handlePhotoPick}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                aria-label="Change profile photo"
                title="Click profile photo to change"
              >
                <Avatar className="w-16 h-16 min-w-[4rem] min-h-[4rem] cursor-pointer">
                  <AvatarImage src={profileImage} alt={formData.name} />
                  {!profileImage && <AvatarFallback className="text-2xl">{formData.name?.[0] || 'A'}</AvatarFallback>}
                </Avatar>
              </button>
              <div>
                <p className="text-3xl font-bold">{user.name}</p>
                <p className="text-slate-500">lawyer_001 · Verified</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-bold mb-3">Practice Areas</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {practiceAreas.map((area) => (
                  <span key={area} className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold">{area}</span>
                ))}
                <button
                  type="button"
                  onClick={() => setIsAddingPracticeArea((prev) => !prev)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-500"
                >
                  + Add
                </button>
              </div>

              {isAddingPracticeArea && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter practice area"
                    value={newPracticeArea}
                    onChange={(e) => setNewPracticeArea(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddPracticeArea}
                    className="px-4 py-2 rounded-xl bg-[#071b33] text-white font-semibold"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
              <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
              <Input label="Age" name="age" value={formData.age} onChange={handleInputChange} />
              <Input label="College/Institution" name="college" value={formData.college} onChange={handleInputChange} />
              <Input label="Speciality" name="specialization" value={formData.specialization} onChange={handleInputChange} />
              <Input label="Workplace" name="workplace" value={formData.workplace} onChange={handleInputChange} />
              <Input label="Bar Council No." name="barCouncilNo" value={formData.barCouncilNo} onChange={handleInputChange} />
              <Input label="PAN Card" name="panCard" value={formData.panCard} onChange={handleInputChange} />
              <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} />
              <Input label="Work Address" name="workAddress" value={formData.workAddress} onChange={handleInputChange} />
              <Button onClick={handleSaveProfile} loading={isSaving}>Save Changes</Button>
            </div>
          </div>
        </Card>
      )}

      {/* General Tab */}
      {activeTab === 'general' && (
        <Card className="p-0">
          <div className="p-6">
            <h3 className="text-3xl font-bold mb-6">Notifications</h3>
            <div className="space-y-4">
              {['New booking requests', 'Payment updates', 'AI case insights', 'Consultation reminders'].map((n, idx) => (
                <div key={n} className="flex items-center justify-between py-3 border-b border-slate-100">
                  <p className="font-medium text-slate-800">{n}</p>
                  <Switch defaultChecked={idx < 3} />
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-xl font-bold mb-4">Professional Plan</h4>
              <Card className="p-0 bg-[#071b33] text-white">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Professional Plan</h3>
                  <p className="text-slate-300 mt-1">Active · Renews Apr 5, 2026</p>
                  <div className="mt-4">
                    <button className="px-4 py-2 text-sm rounded-lg bg-white text-[#071b33] font-semibold">Manage</button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Card className="p-0">
          <div className="p-6">
            <h3 className="text-3xl font-bold mb-6">Security Settings</h3>

            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lock size={20} />
                Change Password
              </h4>
              <div className="space-y-3 max-w-md">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Current Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <Button onClick={handleChangePassword} className="text-sm">Update Password</Button>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h4 className="text-xl font-bold mb-4">Account Actions</h4>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm rounded-lg bg-[#071b33] text-white font-semibold hover:bg-slate-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
