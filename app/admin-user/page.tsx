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

// Separate type for errors (all strings)
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
    if (
      confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Column */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="text-blue-600" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                User Profile
              </h1>
            </div>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)}>
                <Pencil size={20} className="text-gray-500 hover:text-blue-600" />
              </button>
            )}
          </div>

          {statusMessage && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center animate-pulse">
              {statusMessage}
            </div>
          )}

          <FieldWrapper label="Username" error={errors.username}>
            {isEditing ? (
              <input
                className="input"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            ) : (
              <p className="py-2">@{user.username}</p>
            )}
          </FieldWrapper>

          <FieldWrapper label="First Name" error={errors.firstName}>
            {isEditing ? (
              <input
                className="input"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            ) : (
              <p className="py-2">{user.firstName}</p>
            )}
          </FieldWrapper>

          <FieldWrapper label="Last Name" error={errors.lastName}>
            {isEditing ? (
              <input
                className="input"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            ) : (
              <p className="py-2">{user.lastName}</p>
            )}
          </FieldWrapper>

          {/* Social Links */}
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Social Links
          </h2>
          <div className="space-y-3">
            <SocialField
              icon={<Instagram size={16} />}
              value={formData.socials.instagram}
              isEditing={isEditing}
              placeholder="Instagram URL"
              onChange={(val) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, instagram: val },
                })
              }
            />
            <SocialField
              icon={<Twitter size={16} />}
              value={formData.socials.twitter}
              isEditing={isEditing}
              placeholder="Twitter URL"
              onChange={(val) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, twitter: val },
                })
              }
            />
            <SocialField
              icon={<Linkedin size={16} />}
              value={formData.socials.linkedin}
              isEditing={isEditing}
              placeholder="LinkedIn URL"
              onChange={(val) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, linkedin: val },
                })
              }
            />
          </div>

          {/* Consent */}
          {isEditing && (
            <div>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData({ ...formData, consent: e.target.checked })
                  }
                />
                <span>I consent to the processing of my personal data.</span>
              </label>
              {errors.consent && (
                <p className="text-red-500 text-xs mt-1">{errors.consent}</p>
              )}
            </div>
          )}

          {/* Actions */}
          {isEditing && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={!isFormValid}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
              >
                <Check size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 rounded-lg transition"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* GDPR Column */}
        {!isEditing && (
          <div className="space-y-4">
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border">
              You can export or delete your data at any time.
            </div>

            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg"
            >
              <Download size={16} />
              <span>Download My Data</span>
            </button>

            <button
              onClick={handleDelete}
              className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg"
            >
              <Trash size={16} />
              <span>Delete Account</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Field */
function FieldWrapper({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* Social Field */
function SocialField({
  icon,
  value,
  placeholder,
  isEditing,
  onChange,
}: {
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}) {
  if (!isEditing && !value) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      {isEditing ? (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="input flex-1"
        />
      ) : (
        <a
          href={value}
          target="_blank"
          className="text-blue-600 text-sm truncate hover:underline"
        >
          {value}
        </a>
      )}
    </div>
  );
}