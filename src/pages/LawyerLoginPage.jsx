import React, { useState } from 'react';
import { ArrowRight, Briefcase, Eye, Lock, Mail, Phone, Scale, Shield } from 'lucide-react';

export const LawyerLoginPage = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    remember: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credential = authMode === 'email' ? formData.email.trim() : formData.phone.trim();
    if (!credential || !formData.password.trim()) return;

    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#f1f4f9] flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_0.98fr]">
        <section
          className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden"
          style={{
            backgroundColor: '#000000',
            backgroundImage:
              'radial-gradient(circle at 14% 18%, rgba(29,78,216,0.18), transparent 34%), radial-gradient(circle at 82% 72%, rgba(14,165,233,0.13), transparent 40%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: 'auto, auto, 28px 28px, 28px 28px',
          }}
        >
          <div>
            <div className="w-14 h-14 rounded-2xl border border-slate-600 bg-white/5 backdrop-blur flex items-center justify-center mb-6">
              <Scale size={30} />
            </div>
            <h1 className="text-5xl font-black leading-none tracking-tight">FindMyLawyer</h1>
            <p className="text-slate-300 text-2xl mt-4">Lawyer Workspace, Reimagined</p>

            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-5">For Lawyers</h2>
              <div className="space-y-4 text-lg">
                <p className="flex items-center gap-3"><Briefcase size={18} className="text-blue-300" /> Unified client, case, and schedule dashboard</p>
                <p className="flex items-center gap-3"><Shield size={18} className="text-emerald-300" /> Secure document and communication workflows</p>
                <p className="flex items-center gap-3"><Scale size={18} className="text-amber-300" /> AI-assisted legal preparation and drafting</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold mb-2">Did You Know?</p>
            <p className="text-slate-300 text-lg">You are entitled to legal aid if you cannot afford a lawyer.</p>
          </div>
        </section>

        <section className="flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-[520px] rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(2,6,23,0.08)]">
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Briefcase size={14} /> Lawyer
            </div>

            <h2 className="text-5xl font-black text-slate-900 leading-none">Welcome</h2>
            <p className="text-slate-500 mt-2">Sign in to your lawyer account</p>

            <button
              type="button"
              className="w-full mt-5 mb-4 h-11 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Continue with Google
            </button>

            <div className="rounded-xl bg-slate-100 p-1 grid grid-cols-2 gap-1 mb-4">
              <button
                type="button"
                onClick={() => setAuthMode('email')}
                className={`h-8 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 ${
                  authMode === 'email' ? 'bg-white text-slate-900' : 'text-slate-500'
                }`}
              >
                <Mail size={14} /> Email
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('phone')}
                className={`h-8 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 ${
                  authMode === 'phone' ? 'bg-white text-slate-900' : 'text-slate-500'
                }`}
              >
                <Phone size={14} /> Phone OTP
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {authMode === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {authMode === 'email' ? <Mail size={16} /> : <Phone size={16} />}
                  </span>
                  <input
                    name={authMode === 'email' ? 'email' : 'phone'}
                    value={authMode === 'email' ? formData.email : formData.phone}
                    onChange={handleInputChange}
                    placeholder={authMode === 'email' ? 'you@example.com' : '+91 98XXXXXX10'}
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Eye size={16} /></span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="text-slate-600 flex items-center gap-2">
                  <input type="checkbox" name="remember" checked={formData.remember} onChange={handleInputChange} />
                  Remember me
                </label>
                <button type="button" className="text-slate-700 font-semibold">Forgot password?</button>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-black text-white font-semibold flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight size={16} />
              </button>
            </form>

            <div className="my-4 flex items-center gap-3 text-xs text-slate-400">
              <div className="h-px bg-slate-200 flex-1" />
              or
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center">
              <p className="text-slate-600">Don&apos;t have an account yet?</p>
              <button type="button" className="mt-1 text-black font-bold">Register as Lawyer →</button>
            </div>

            <p className="text-center text-xs text-slate-400 mt-5">Reimagining legal access for India</p>
          </div>
        </section>
      </div>

      <footer className="bg-[#0b1a34] text-white text-center py-2.5 px-4">
        <p className="text-[10px] tracking-[0.18em] uppercase text-slate-300">Know Your Legal Rights</p>
        <p className="text-xs font-semibold mt-1">"You are entitled to legal aid if you cannot afford a lawyer."</p>
        <p className="text-[10px] text-slate-400 mt-1">© 2026 FindMyLawyer · All rights reserved</p>
      </footer>
    </div>
  );
};
