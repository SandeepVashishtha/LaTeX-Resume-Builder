"use client";

import React, { useState } from "react";
import {
  FileCode2,
  FileDown,
  Printer,
  FileText,
  SlidersHorizontal,
  BookOpen,
  Sparkles,
  RefreshCw,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Copy,
  ChevronDown
} from "lucide-react";
import { RESUME_TEMPLATES } from "../lib/templates";

export default function Header({
  activeTemplateId,
  onSelectTemplate,
  activeMode,
  setActiveMode,
  paperSize,
  setPaperSize,
  zoom,
  setZoom,
  onExportTex,
  onExportPdf,
  onPrint,
  onReset,
  isExportingPdf,
  openCheatSheet,
  setOpenCheatSheet,
  lastSavedTime,
}) {
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeTemplate = RESUME_TEMPLATES.find((t) => t.id === activeTemplateId) || RESUME_TEMPLATES[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 shadow-lg no-print">
      <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold text-lg">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                LaTeX Resume Builder
              </h1>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Next.js v2.0
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {lastSavedTime ? `Autosaved at ${lastSavedTime}` : "Autosaved locally"}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Mode Selectors & Templates */}
        <div className="flex items-center gap-2">
          {/* Template Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition shadow-sm"
              title="Select Resume Template"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Template:</span>
              <span className="font-semibold text-white truncate max-w-[120px] md:max-w-[160px]">
                {activeTemplate.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {templateDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 animate-fade-in">
                <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Available Templates
                </div>
                {RESUME_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      onSelectTemplate(tmpl.id);
                      setTemplateDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex flex-col gap-0.5 ${
                      tmpl.id === activeTemplateId
                        ? "bg-indigo-600 text-white font-medium shadow-sm"
                        : "text-slate-300 hover:bg-slate-700/70"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold">{tmpl.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${tmpl.id === activeTemplateId ? "bg-indigo-700 text-indigo-100" : "bg-slate-700 text-slate-300"}`}>
                        {tmpl.badge}
                      </span>
                    </div>
                    <span className={`text-[11px] line-clamp-1 ${tmpl.id === activeTemplateId ? "text-indigo-100" : "text-slate-400"}`}>
                      {tmpl.description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveMode("editor")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                activeMode === "editor"
                  ? "bg-indigo-600 text-white font-semibold shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>LaTeX Code</span>
            </button>
            <button
              onClick={() => setActiveMode("form")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                activeMode === "form"
                  ? "bg-indigo-600 text-white font-semibold shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Visual Form</span>
            </button>
          </div>

          {/* Cheat Sheet Button */}
          <button
            onClick={() => setOpenCheatSheet(true)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            title="LaTeX Cheat Sheet"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Cheat Sheet</span>
          </button>
        </div>

        {/* Right: Zoom & Export Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden lg:flex items-center bg-slate-800/80 border border-slate-700 rounded-lg p-0.5 text-xs text-slate-300">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(1)))}
              className="p-1.5 hover:bg-slate-700 rounded transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono font-medium">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, +(z + 0.1).toFixed(1)))}
              className="p-1.5 hover:bg-slate-700 rounded transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1.0)}
              className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200 transition"
              title="Reset Zoom (100%)"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Paper Size selector */}
          <button
            onClick={() => setPaperSize(paperSize === "letter" ? "a4" : "letter")}
            className="hidden sm:flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            title="Toggle Paper Size (US Letter / A4)"
          >
            <span className="uppercase text-[11px] font-bold text-slate-400">Size:</span>
            <span className="font-semibold text-white uppercase">{paperSize}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            title="Print or Save via Browser"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Export .tex */}
          <button
            onClick={onExportTex}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            title="Download .tex Source Code"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">.tex</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={onExportPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md shadow-indigo-600/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExportingPdf ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileDown className="w-3.5 h-3.5" />
            )}
            <span>{isExportingPdf ? "Generating..." : "Download PDF"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
