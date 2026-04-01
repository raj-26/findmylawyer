import React from 'react';
import {
  Bell,
  BellRing,
  Bot,
  Briefcase,
  Calendar,
  Folder,
  IndianRupee,
  LayoutDashboard,
  MessageCircle,
  Newspaper,
  Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: Folder, badge: 2 },
  { id: 'cases', label: 'Cases', icon: Briefcase },
  { id: 'ai-help', label: 'LEX.ai', icon: Bot, badge: 'AI' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, badge: 3 },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'payments', label: 'Earnings', icon: IndianRupee },
  { id: 'demand-draft', label: 'News', icon: Newspaper },
  { id: 'subscription', label: 'Notification', icon: BellRing },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const labelMap = navItems.reduce((acc, item) => {
  acc[item.id] = item.label;
  return acc;
}, {});

export const MainLayout = ({ children, currentPage, onNavigate, onLogout }) => {
  const { user } = useAuth();
  const pageTitle =
    currentPage === 'dashboard'
      ? `Hello, ${user?.name ? user.name.replace('Adv. ', '') : 'Advocate'}`
      : labelMap[currentPage] || 'Dashboard';

  return (
    <div className="h-screen bg-[#f3f5f8] overflow-hidden">
      <div className="flex h-full">
        <aside 
          className="hidden lg:flex w-[226px] h-full overflow-y-auto text-white flex-col border-r border-white/10 shadow-[8px_0_24px_rgba(2,6,23,0.2)]"
          style={{
            backgroundColor: '#000000',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        >
          <div className="px-5 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-sm font-bold">FM</div>
              <div>
                <p className="text-lg font-bold leading-none">FindMyLawyer</p>
                <p className="text-xs text-slate-300 mt-1">Lawyer Portal</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-sm font-semibold">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{user?.name || 'Adv. Arjun Sharma'}</p>
                <p className="text-xs text-slate-400 truncate">lawyer_001 - Online</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-slate-700/60 text-white border border-white/10' : 'text-slate-300 hover:bg-slate-700/35'
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <Icon size={16} />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.badge === 'AI' ? 'bg-white/10 text-slate-300' : 'bg-blue-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="px-5 py-4 border-t border-white/10 text-xs text-slate-400">
            <p>Subscription: Active</p>
          </div>
        </aside>

        <div className="flex-1 min-w-0 min-h-0 flex flex-col">
          <header className="h-[66px] bg-white/90 backdrop-blur border-b border-slate-200 px-5 sm:px-8 flex items-center justify-between sticky top-0 z-20">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 truncate pt-1">{pageTitle}</h1>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl border border-slate-200 text-slate-700 relative bg-white">
                <Bell size={16} className="mx-auto" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  3
                </span>
              </button>
              {currentPage !== 'dashboard' && (
                <button onClick={onLogout} className="px-4 py-2 rounded-xl bg-[#071b33] text-white text-sm font-semibold">
                  Logout
                </button>
              )}
            </div>
          </header>

          <main key={currentPage} className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4">{children}</main>
        </div>
      </div>
    </div>
  );
};
