import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, User, Scale } from 'lucide-react';

export const LawyerProfileSetupPage = ({ onBackToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    profilePhoto: '',
    fullName: '',
    age: '',
    contact: '',
    college: '',
    speciality: '',
    address: '',
    workAddress: '',
    panCard: '',
    lawyerLicence: '',
    workplace: '',
    barCouncilNo: '',
  });

  const inputStyle =
    "w-full h-12 px-4 rounded-xl bg-black border border-white/20 text-white font-semibold tracking-wide placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-[0_0_6px_rgba(255,255,255,0.2)]";

  const labelClass =
    "text-sm mb-1 block text-white font-bold tracking-wide";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSuccess(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white px-4"
      style={{
        backgroundColor: '#000000',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="w-full max-w-3xl">

        {/* BIG LOGO */}
        <div className="flex items-center justify-center gap-3 mb-10 mt-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Scale size={24} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-wider">Find My Lawyer</h1>
        </div>

        {/* BACK ARROW ONLY */}
        <button
          onClick={onBackToLogin}
          className="flex items-center text-white mb-6"
        >
          <ArrowLeft size={20} className="font-bold" />
        </button>

        {/* PROFILE PHOTO */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shadow-[0_0_12px_rgba(255,255,255,0.3)]">
              {formData.profilePhoto ? (
                <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={34} />
              )}
            </div>

            <label
              htmlFor="profilePhoto"
              className="absolute bottom-0 right-0 bg-white/10 border border-white/20 p-2 rounded-full cursor-pointer"
            >
              <Upload size={14} />
            </label>

            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <p className="mt-3 text-sm font-semibold tracking-wide">Upload Profile Photo</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className={labelClass}>Full Name</label>
              <input placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} className={inputStyle} />
            </div>

            <div>
              <label className={labelClass}>Age</label>
              <input placeholder="Age (99)" name="age" value={formData.age} onChange={handleInputChange} className={inputStyle} />
            </div>

            <div>
              <label className={labelClass}>Phone Number</label>
              <input placeholder="Phone (9999999999)" name="contact" value={formData.contact} onChange={handleInputChange} className={inputStyle} />
            </div>

            <div>
              <label className={labelClass}>College</label>
              <input placeholder="College Name" name="college" value={formData.college} onChange={handleInputChange} className={inputStyle} />
            </div>

            <div>
              <label className={labelClass}>Speciality</label>
              <input placeholder="Criminal / Corporate" name="speciality" value={formData.speciality} onChange={handleInputChange} className={inputStyle} />
            </div>

            <div>
              <label className={labelClass}>Workplace</label>
              <input placeholder="Court / Firm Name" name="workplace" value={formData.workplace} onChange={handleInputChange} className={inputStyle} />
            </div>

            <div>
              <label className={labelClass}>Bar Council No</label>
              <input placeholder="BAR123456" name="barCouncilNo" value={formData.barCouncilNo} onChange={handleInputChange} className={inputStyle} />
            </div>

          </div>

          {/* FILE UPLOADS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className={labelClass}>PAN Card</label>
              <input type="file" name="panCard" onChange={handleFileChange}
                className="w-full h-12 px-3 py-2 rounded-xl bg-black border border-white/20 text-white file:bg-white/10 file:text-white file:border-0" />
            </div>

            <div>
              <label className={labelClass}>Lawyer License</label>
              <input type="file" name="lawyerLicence" onChange={handleFileChange}
                className="w-full h-12 px-3 py-2 rounded-xl bg-black border border-white/20 text-white file:bg-white/10 file:text-white file:border-0" />
            </div>

          </div>

          {/* ADDRESS */}
          <div>
            <label className={labelClass}>Address</label>
            <input placeholder="Home Address" name="address" value={formData.address} onChange={handleInputChange} className={inputStyle} />
          </div>

          <div>
            <label className={labelClass}>Work Address</label>
            <input placeholder="Office Address" name="workAddress" value={formData.workAddress} onChange={handleInputChange} className={inputStyle} />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full h-14 rounded-xl bg-black border border-white/20 text-white font-extrabold tracking-widest text-lg flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(255,255,255,0.3)] hover:bg-white/5"
          >
            COMPLETE PROFILE <ArrowRight size={20} />
          </button>

        </form>
      </div>
    </div>
  );
};