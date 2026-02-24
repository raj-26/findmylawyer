import React, { useState } from 'react';
import {
  Menu,
  X,
  Home,
  Calendar,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../ui';

export const Navbar = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'cases', label: 'Case Files', icon: FileText },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white px-6 py-4 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <div className="text-2xl">⚖️</div>
          <div>
            <h1 className="font-bold text-xl">FindMyLawyer</h1>
            <p className="text-xs text-primary-200">Lawyer Portal</p>
          </div>
        </div>

        {/* Nav items for desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-white text-primary-900 font-medium'
                    : 'hover:bg-primary-700'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button className="relative p-2 hover:bg-primary-700 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-primary-700 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white text-primary-900 font-bold flex items-center justify-center text-sm">
                {user.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-primary-200">{user.specialization}</p>
              </div>
              <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-primary-900 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-primary-100">
                  <p className="font-bold text-sm">{user.name}</p>
                  <p className="text-xs text-primary-500">{user.email}</p>
                </div>
                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full text-left px-4 py-2 hover:bg-primary-50 text-sm"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('login');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MainLayout = ({ currentPage, children, onNavigate }) => {
  return (
    <div className="min-h-screen bg-primary-100">
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
};
