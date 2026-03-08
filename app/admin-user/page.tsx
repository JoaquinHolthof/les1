"use client";

import React, { useState } from "react";
import {
  User,
  Check,
  X,
  Pencil,
  Download,
  Trash,
  Instagram,
  Twitter,
  Linkedin,
  ExternalLink,
  Edit3,
} from "lucide-react";

interface SocialLinks {
  instagram: string;
  twitter: string;
  linkedin: string;
}

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  consent: boolean;
  socials: SocialLinks;
}

interface UserErrors {
  username?: string;
  firstName?: string;
  lastName?: string;
  consent?: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export default function UserLandingPage() {
  const [user, setUser] = useState<UserData>({
    username: "jdoe92",
    firstName: "John",
    lastName: "Doe",
    consent: true,
    socials: { instagram: "", twitter: "", linkedin: "" },
  });

  const [formData, setFormData] = useState<UserData>(user);
  const [errors, setErrors] = useState<UserErrors>({});
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const newErrors: UserErrors = {};
    if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters.";
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.consent)
      newErrors.consent = "You must accept data processing to continue.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setUser(formData);
    setIsEditing(false);
    setStatusMessage("Profile updated successfully!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData(user);
    setErrors({});
    setIsEditing(false);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(user, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user-data.json";
    a.click();
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      setUser({
        username: "",
        firstName: "",
        lastName: "",
        consent: false,
        socials: { instagram: "", twitter: "", linkedin: "" },
      });
      setStatusMessage("Account deleted.");
    }
  };

  const isFormValid =
    formData.username.length >= 3 &&
    !!formData.firstName &&
    !!formData.lastName &&
    formData.consent;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 space-y-6">
      
      {/* 1. Google Form Knop - Animate From Top */}
      <div className="max-w-4xl w-full animate-in fade-in slide-in-from-top duration-1000">
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSc1R1B5Vp4erze6S75_fZVpnOr7TZ75fsqQF6cxaIekUlHAuA/viewform?usp=publish-editor" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between bg-purple-600 text-white p-5 rounded-3xl shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="bg-purple-500 p-2 rounded-xl">
              <Edit3 size={20} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest opacity-80">Feedback & Support</p>
              <h3 className="font-bold text-lg">Vragen of suggesties? Vul het formulier in</h3>
            </div>
          </div>
          <ExternalLink size={24} className="mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>

      {/* 2. Profiel Kaart - Animate Fade In */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border border-gray-100 animate-in fade-in duration-700">
        
        {/* Form Column - Animate From Left */}
        <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <User className="text-blue-600" size={28} />
              </div>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">
                User Profile
              </h1>
            </div>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Pencil size={20} className="text-gray-500 hover:text-blue-600" />
              </button>
            )}
          </div>

          {statusMessage && (
            <div className="p-3 bg-green-50 text-green-700 rounded-xl text-sm font-bold text-center animate-pulse border border-green-100">
              {statusMessage}
            </div>
          )}

          <div className="space-y-4">
            <FieldWrapper label="Username" error={errors.username}>
                {isEditing ? (
                <input
                    className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all"
                    value={formData.username}
                    onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                    }
                />
                ) : (
                <p className="py-2 font-bold text-gray-700 text-lg">@{user.username}</p>
                )}
            </FieldWrapper>

            <FieldWrapper label="First Name" error={errors.firstName}>
                {isEditing ? (
                <input
                    className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all"
                    value={formData.firstName}
                    onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                    }
                />
                ) : (
                <p className="py-2 font-medium text-gray-700">{user.firstName}</p>
                )}
            </FieldWrapper>

            <FieldWrapper label="Last Name" error={errors.lastName}>
                {isEditing ? (
                <input
                    className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all"
                    value={formData.lastName}
                    onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                    }
                />
                ) : (
                <p className="py-2 font-medium text-gray-700">{user.lastName}</p>
                )}
            </FieldWrapper>
          </div>

          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
            Social Links
          </h2>
          <div className="space-y-3">
            <SocialField icon={<Instagram size={16} />} value={formData.socials.instagram} isEditing={isEditing} placeholder="Instagram URL" onChange={(val) => setFormData({ ...formData, socials: { ...formData.socials, instagram: val }, })} />
            <SocialField icon={<Twitter size={16} />} value={formData.socials.twitter} isEditing={isEditing} placeholder="Twitter URL" onChange={(val) => setFormData({ ...formData, socials: { ...formData.socials, twitter: val }, })} />
            <SocialField icon={<Linkedin size={16} />} value={formData.socials.linkedin} isEditing={isEditing} placeholder="LinkedIn URL" onChange={(val) => setFormData({ ...formData, socials: { ...formData.socials, linkedin: val }, })} />
          </div>

          {isEditing && (
            <div className="pt-2 animate-in zoom-in duration-300">
              <label className="flex items-center space-x-3 text-sm font-medium text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-gray-200 text-blue-600 focus:ring-0 transition-all" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} />
                <span>I consent to data processing.</span>
              </label>
              {errors.consent && ( <p className="text-red-500 text-xs mt-2 font-bold">{errors.consent}</p> )}
            </div>
          )}

          {isEditing && (
            <div className="mt-6 flex gap-3 animate-in fade-in slide-in-from-bottom duration-500">
              <button onClick={handleSave} disabled={!isFormValid} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 disabled:bg-blue-200 hover:bg-blue-700 text-white font-black py-3 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-100">
                <Check size={18} /> Save
              </button>
              <button onClick={handleCancel} className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-100 hover:bg-gray-50 text-gray-600 font-black py-3 rounded-2xl transition-all">
                <X size={18} /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* GDPR Column - Animate From Bottom/Right */}
        {!isEditing && (
          <div className="space-y-4 flex flex-col justify-center border-l border-gray-50 pl-8 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="text-xs font-bold text-gray-400 bg-gray-50 p-4 rounded-2xl border border-gray-100 leading-relaxed">
              SECURITY NOTE: You can export your data or permanently delete your account at any time.
            </div>

            <button onClick={handleExport} className="w-full flex items-center justify-center space-x-3 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-black transition-all active:scale-95 shadow-xl shadow-gray-200">
              <Download size={18} />
              <span>Download My Data</span>
            </button>

            <button onClick={handleDelete} className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 py-4 rounded-2xl font-black transition-all active:scale-95">
              <Trash size={18} />
              <span>Delete Account</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FieldWrapper({ label, children, error, }: { label: string; children: React.ReactNode; error?: string; }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest"> {label} </label>
      {children}
      {error && <p className="text-red-500 text-xs font-bold mt-1">{error}</p>}
    </div>
  );
}

function SocialField({ icon, value, placeholder, isEditing, onChange, }: { icon: React.ReactNode; value: string; placeholder: string; isEditing: boolean; onChange: (value: string) => void; }) {
  if (!isEditing && !value) return null;
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-xl">
      <div className="text-gray-400 ml-3">{icon}</div>
      {isEditing ? (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="flex-1 p-2 bg-transparent outline-none text-sm font-medium" />
      ) : (
        <a href={value} target="_blank" className="text-blue-600 text-sm truncate hover:underline font-bold py-2"> {value} </a>
      )}
    </div>
  );
}