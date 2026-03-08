"use client";

import { useState } from "react";
// ExternalLink toegevoegd aan de imports
import { Plus, Trash2, Save, X, Edit3, Globe, ExternalLink } from "lucide-react";

interface AdminData {
  title: string;
  description: string;
  features: string[];
}

export default function AdminPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [formData, setFormData] = useState<AdminData>({
    title: "About Us",
    description: "We are a company dedicated to providing the best solutions for your needs. Our team is passionate about creating modern, scalable, and user-friendly applications.",
    features: ["Innovative technology", "Professional team", "Customer satisfaction"]
  });

  const validate = () => {
    let newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (formData.description.length < 20) newErrors.description = "Description too short (min 20).";
    
    const featureErrors = formData.features.map(f => !f.trim() ? "Empty" : "");
    if (featureErrors.some(e => e !== "")) newErrors.features = featureErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => setFormData({ ...formData, features: [...formData.features, ""] });
  
  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsEditing(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      {/* Toast Notification */}
      {isSaved && (
        <div className="fixed bottom-10 right-10 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce z-50">
          <Save size={20} className="text-green-400" />
          <span className="font-medium">Content Published Successfully!</span>
        </div>
      )}

      {/* NIEUWE SECTIE: Google Form Knop bovenaan */}
      <div className="animate-in fade-in slide-in-from-top duration-1000">
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSc1R1B5Vp4erze6S75_fZVpnOr7TZ75fsqQF6cxaIekUlHAuA/viewform?usp=publish-editor" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between bg-purple-600 text-white p-5 rounded-3xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all active:scale-[0.98]"
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

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b pb-8 gap-6">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-2 font-medium">Configure your landing page content below.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => { setIsEditing(!isEditing); setErrors({}); }}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${
              isEditing ? "bg-red-50 text-red-600 border border-red-200" : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
            }`}
          >
            {isEditing ? <><X size={18}/> Cancel</> : <><Edit3 size={18}/> Edit Content</>}
          </button>
        </div>
      </div>

      {/* Main Form/Display Area */}
      <main className={`transition-all duration-500 bg-white rounded-3xl border border-gray-100 p-8 ${isEditing ? "shadow-2xl ring-1 ring-blue-100" : "shadow-sm"}`}>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Title Field */}
          <div className="animate-in fade-in slide-in-from-bottom duration-300">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest mb-2 block">Header Title</label>
            {isEditing ? (
              <input
                className={`w-full text-2xl font-bold p-4 rounded-xl border-2 transition-all outline-none ${
                  errors.title ? "border-red-400 animate-pulse bg-red-50" : "border-gray-100 focus:border-blue-500"
                }`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            ) : (
              <h2 className="text-3xl font-extrabold text-gray-800">{formData.title}</h2>
            )}
          </div>

          {/* Description Field */}
          <div className="animate-in fade-in slide-in-from-bottom delay-100 duration-500">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest mb-2 block">Main Description</label>
            {isEditing ? (
              <textarea
                rows={4}
                className={`w-full p-4 rounded-xl border-2 transition-all outline-none leading-relaxed ${
                  errors.description ? "border-red-400 animate-pulse bg-red-50" : "border-gray-100 focus:border-blue-500"
                }`}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            ) : (
              <p className="text-gray-600 text-lg leading-relaxed">{formData.description}</p>
            )}
          </div>

          {/* Features Field */}
          <div className="animate-in fade-in slide-in-from-bottom delay-200 duration-500">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-black uppercase text-gray-400 tracking-widest block">Key Features</label>
              {isEditing && (
                <button type="button" onClick={addFeature} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                  <Plus size={14} /> Add Feature
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.features.map((feature, idx) => (
                <div key={idx} className={`group relative transition-all duration-300 ${isEditing ? "animate-in zoom-in-95" : ""}`}>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input
                        className={`flex-1 p-3 rounded-xl border-2 outline-none ${
                          errors.features?.[idx] ? "border-red-400 bg-red-50" : "border-gray-100 focus:border-blue-500"
                        }`}
                        value={feature}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      />
                      <button type="button" onClick={() => removeFeature(idx)} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      {feature}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          {isEditing && (
            <div className="pt-6 animate-in fade-in zoom-in duration-300">
              <button 
                type="submit" 
                className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2"
              >
                <Globe size={18} /> Confirm and Sync to Live Site
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}