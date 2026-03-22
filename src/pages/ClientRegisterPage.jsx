import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Lock, Mail, MapPin, Phone, User } from 'lucide-react';

export const ClientRegisterPage = ({ onBackToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pincode: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSuccess();
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
            <h1 className="text-5xl font-black leading-none tracking-tight">FindMyLawyer</h1>
            <p className="text-slate-300 text-xl mt-4">Join FindMyLawyer as a client</p>
          </div>

          <div>
            <p className="text-xl font-bold mb-2">Know Your Legal Rights</p>
            <p className="text-slate-300 text-base">You have the right to remain silent.</p>
          </div>
        </section>

        <section className="flex items-start justify-center p-4 pt-6 sm:p-8 sm:pt-10">
          <div className="w-full max-w-[620px] p-1 sm:p-2">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={onBackToLogin}
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 font-semibold"
              >
                <ArrowLeft size={14} /> Back to Login
              </button>
            </div>

            <h2 className="text-5xl font-black text-slate-900 leading-none">Create Account</h2>
            <p className="text-slate-500 mt-2">Join FindMyLawyer as a lawyer</p>

            <button
              type="button"
              className="w-full mt-5 mb-4 h-12 rounded-2xl border border-slate-300 bg-white text-slate-700 text-[17px] font-semibold shadow-[0_2px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 flex items-center justify-center gap-3"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><User size={16} /></span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full h-12 pl-10 pr-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-10 pr-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Phone size={16} /></span>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98XXXXXX10"
                      className="w-full h-12 pl-10 pr-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                    />
                  </div>
                  <button type="button" className="h-12 px-4 rounded-xl bg-black text-white text-sm font-semibold">Send OTP</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Pincode</label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="560001"
                    className="w-full h-12 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">City</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><MapPin size={16} /></span>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Bangalore"
                      className="w-full h-12 pl-10 pr-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    className="w-full h-12 pl-10 pr-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Confirm Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className="w-full h-12 pl-10 pr-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-black text-white text-[17px] font-semibold flex items-center justify-center gap-2"
              >
                Create Account <ArrowRight size={16} />
              </button>
            </form>

            <p className="text-center text-sm text-slate-600 mt-5">
              Already have an account?{' '}
              <button type="button" onClick={onBackToLogin} className="font-bold text-black">Login</button>
            </p>
          </div>
        </section>
      </div>

      <footer className="bg-[#041325] text-center py-2 px-4 border-t border-[#0a2a49]">
        <p className="text-[9px] tracking-[0.2em] uppercase text-slate-300">Know Your Legal Rights</p>
        <p className="text-[11px] font-semibold mt-0.5 text-white">"You have the right to remain silent."</p>
        <p className="text-[9px] text-slate-400 mt-0.5">© 2026 FindMyLawyer · All rights reserved</p>
      </footer>
    </div>
  );
};
