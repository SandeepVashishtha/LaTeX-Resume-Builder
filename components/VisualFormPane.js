"use client";

import React, { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Plus,
  Trash2,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { formToLatex, INITIAL_FORM_DATA } from "../lib/formToLatex";

export default function VisualFormPane({ onApplyFormToLatex }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [synced, setSynced] = useState(false);
  const [openSection, setOpenSection] = useState("personal");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleApply = () => {
    const generatedLatex = formToLatex(formData);
    onApplyFormToLatex(generatedLatex);
    setSynced(true);
    setTimeout(() => setSynced(false), 2000);
  };

  // Education handlers
  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", location: "", dates: "", details: "" },
      ],
    });
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const handleRemoveEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
  };

  // Experience handlers
  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { company: "", role: "", location: "", dates: "", bullets: [""] },
      ],
    });
  };

  const handleUpdateExperience = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const handleRemoveExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    });
  };

  const handleAddBullet = (expIndex) => {
    const updated = [...formData.experience];
    updated[expIndex].bullets.push("");
    setFormData({ ...formData, experience: updated });
  };

  const handleUpdateBullet = (expIndex, bulletIndex, value) => {
    const updated = [...formData.experience];
    updated[expIndex].bullets[bulletIndex] = value;
    setFormData({ ...formData, experience: updated });
  };

  const handleRemoveBullet = (expIndex, bulletIndex) => {
    const updated = [...formData.experience];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setFormData({ ...formData, experience: updated });
  };

  // Project handlers
  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { name: "", tech: "", link: "", bullets: [""] },
      ],
    });
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index][field] = value;
    setFormData({ ...formData, projects: updated });
  };

  const handleRemoveProject = (index) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200 overflow-hidden">
      {/* Top Banner with Quick Apply */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Visual Form Builder
          </h2>
          <p className="text-[11px] text-slate-400">Fill your details and sync into clean LaTeX instantly.</p>
        </div>
        <button
          onClick={handleApply}
          className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition"
        >
          {synced ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <RefreshCw className="w-3.5 h-3.5" />}
          <span>{synced ? "Synced to LaTeX!" : "Generate LaTeX"}</span>
        </button>
      </div>

      {/* Accordion Form Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 1. Personal Details */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection("personal")}
            className="w-full flex items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-800 text-left text-xs font-semibold text-white transition"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              Personal & Contact Information
            </span>
            {openSection === "personal" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {openSection === "personal" && (
            <div className="p-4 space-y-3 border-t border-slate-700/60 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Alex Chen"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="alex@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">GitHub Profile</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Portfolio Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Professional Summary</label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none resize-y"
                  placeholder="Summarize your professional profile and core strengths..."
                />
              </div>
            </div>
          )}
        </div>

        {/* 2. Experience */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection("experience")}
            className="w-full flex items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-800 text-left text-xs font-semibold text-white transition"
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              Work Experience ({formData.experience.length})
            </span>
            {openSection === "experience" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {openSection === "experience" && (
            <div className="p-4 space-y-4 border-t border-slate-700/60 text-xs">
              {formData.experience.map((exp, idx) => (
                <div key={idx} className="p-3 bg-slate-900/80 border border-slate-700/60 rounded-lg space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-300">Position #{idx + 1}</span>
                    <button
                      onClick={() => handleRemoveExperience(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1 transition"
                      title="Remove Position"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Role Title (e.g. Senior Engineer)"
                      value={exp.role}
                      onChange={(e) => handleUpdateExperience(idx, "role", e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(idx, "company", e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Location (e.g. San Francisco, CA)"
                      value={exp.location}
                      onChange={(e) => handleUpdateExperience(idx, "location", e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Dates (e.g. June 2023 -- Present)"
                      value={exp.dates}
                      onChange={(e) => handleUpdateExperience(idx, "dates", e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] text-slate-400 block font-medium">Accomplishment Bullets</label>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5">
                        <span className="text-slate-500 font-mono">•</span>
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => handleUpdateBullet(idx, bIdx, e.target.value)}
                          placeholder="Describe measurable achievement or impact..."
                          className="flex-1 bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                        />
                        <button
                          onClick={() => handleRemoveBullet(idx, bIdx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddBullet(idx)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 mt-1"
                    >
                      <Plus className="w-3 h-3" /> Add bullet
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddExperience}
                className="w-full py-2 border border-dashed border-slate-700 hover:border-slate-500 rounded-lg text-slate-300 hover:text-white text-xs flex items-center justify-center gap-1.5 transition bg-slate-900/50"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another Experience
              </button>
            </div>
          )}
        </div>

        {/* 3. Education */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection("education")}
            className="w-full flex items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-800 text-left text-xs font-semibold text-white transition"
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Education ({formData.education.length})
            </span>
            {openSection === "education" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {openSection === "education" && (
            <div className="p-4 space-y-3 border-t border-slate-700/60 text-xs">
              {formData.education.map((edu, idx) => (
                <div key={idx} className="p-3 bg-slate-900/80 border border-slate-700/60 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-cyan-300">Degree #{idx + 1}</span>
                    <button
                      onClick={() => handleRemoveEducation(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="University / College"
                      value={edu.institution}
                      onChange={(e) => handleUpdateEducation(idx, "institution", e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Degree & Major"
                      value={edu.degree}
                      onChange={(e) => handleUpdateEducation(idx, "degree", e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={edu.location}
                      onChange={(e) => handleUpdateEducation(idx, "location", e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Graduation Dates"
                      value={edu.dates}
                      onChange={(e) => handleUpdateEducation(idx, "dates", e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="GPA, Honors, Relevant Coursework..."
                    value={edu.details}
                    onChange={(e) => handleUpdateEducation(idx, "details", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              ))}
              <button
                onClick={handleAddEducation}
                className="w-full py-2 border border-dashed border-slate-700 hover:border-slate-500 rounded-lg text-slate-300 hover:text-white text-xs flex items-center justify-center gap-1.5 transition bg-slate-900/50"
              >
                <Plus className="w-3.5 h-3.5" /> Add Degree
              </button>
            </div>
          )}
        </div>

        {/* 4. Technical Skills */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection("skills")}
            className="w-full flex items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-800 text-left text-xs font-semibold text-white transition"
          >
            <span className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              Technical Skills
            </span>
            {openSection === "skills" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {openSection === "skills" && (
            <div className="p-4 space-y-3 border-t border-slate-700/60 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Languages</label>
                <input
                  type="text"
                  value={formData.skills.languages}
                  onChange={(e) => setFormData({ ...formData, skills: { ...formData.skills, languages: e.target.value } })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  placeholder="JavaScript, Python, Go, C++, SQL..."
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Frameworks & Libraries</label>
                <input
                  type="text"
                  value={formData.skills.frameworks}
                  onChange={(e) => setFormData({ ...formData, skills: { ...formData.skills, frameworks: e.target.value } })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  placeholder="React, Next.js, Node.js, FastAPI..."
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Developer Tools & Cloud</label>
                <input
                  type="text"
                  value={formData.skills.tools}
                  onChange={(e) => setFormData({ ...formData, skills: { ...formData.skills, tools: e.target.value } })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  placeholder="Docker, Kubernetes, AWS, Git, CI/CD..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
