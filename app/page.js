"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import EditorPane from "../components/EditorPane";
import VisualFormPane from "../components/VisualFormPane";
import ResumePreview from "../components/ResumePreview";
import CheatSheetModal from "../components/CheatSheetModal";
import { RESUME_TEMPLATES } from "../lib/templates";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Sparkles, Terminal, BookOpen, Layers, CheckCircle } from "lucide-react";

export default function HomePage() {
  const [activeTemplateId, setActiveTemplateId] = useState("software-engineer");
  const [latexCode, setLatexCode] = useState(RESUME_TEMPLATES[0].code);
  const [activeMode, setActiveMode] = useState("editor"); // "editor" | "form"
  const [paperSize, setPaperSize] = useState("letter"); // "letter" | "a4"
  const [zoom, setZoom] = useState(1.0);
  const [openCheatSheet, setOpenCheatSheet] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const previewRef = useRef(null);

  // Load from localStorage on initial mount
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem("latex_resume_code");
      const savedTemplate = localStorage.getItem("latex_resume_template");
      const savedSize = localStorage.getItem("latex_resume_size");

      if (savedCode) setLatexCode(savedCode);
      if (savedTemplate) setActiveTemplateId(savedTemplate);
      if (savedSize) setPaperSize(savedSize);
    } catch (e) {
      console.warn("Could not read localStorage", e);
    }
  }, []);

  // Autosave to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("latex_resume_code", latexCode);
      localStorage.setItem("latex_resume_template", activeTemplateId);
      localStorage.setItem("latex_resume_size", paperSize);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setLastSavedTime(timeStr);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [latexCode, activeTemplateId, paperSize]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle template selection
  const handleSelectTemplate = (id) => {
    const tmpl = RESUME_TEMPLATES.find((t) => t.id === id);
    if (tmpl) {
      setActiveTemplateId(id);
      setLatexCode(tmpl.code);
      showToast(`Switched to template: ${tmpl.name}`);
    }
  };

  // Reset to original template
  const handleResetToTemplate = () => {
    const tmpl = RESUME_TEMPLATES.find((t) => t.id === activeTemplateId) || RESUME_TEMPLATES[0];
    if (confirm("Reset current code back to default template? Unsaved custom edits will be replaced.")) {
      setLatexCode(tmpl.code);
      showToast("Reset to template defaults");
    }
  };

  // Form sync handler
  const handleApplyFormToLatex = (newLatex) => {
    setLatexCode(newLatex);
    showToast("Visual form synced to LaTeX!");
  };

  // Insert command from cheat sheet
  const handleInsertCommand = (syntax) => {
    setLatexCode((prev) => prev + "\n" + syntax + "\n");
    showToast("LaTeX snippet inserted!");
  };

  // Export .tex file
  const handleExportTex = () => {
    const blob = new Blob([latexCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume-${activeTemplateId}.tex`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Downloaded .tex source file");
  };

  // Export PDF file
  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setIsExportingPdf(true);

    try {
      const element = previewRef.current;
      
      // High-resolution canvas capture
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: paperSize === "a4" ? "mm" : "in",
        format: paperSize === "a4" ? "a4" : "letter",
      });

      const pdfWidth = paperSize === "a4" ? 210 : 8.5;
      const pdfHeight = paperSize === "a4" ? 297 : 11;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      pdf.save(`resume-${activeTemplateId}.pdf`);
      showToast("PDF successfully downloaded!");
    } catch (err) {
      console.error("PDF generation error:", err);
      // Fallback to native print
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      {/* Top Header */}
      <Header
        activeTemplateId={activeTemplateId}
        onSelectTemplate={handleSelectTemplate}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        paperSize={paperSize}
        setPaperSize={setPaperSize}
        zoom={zoom}
        setZoom={setZoom}
        onExportTex={handleExportTex}
        onExportPdf={handleExportPdf}
        onPrint={handlePrint}
        onReset={handleResetToTemplate}
        isExportingPdf={isExportingPdf}
        openCheatSheet={openCheatSheet}
        setOpenCheatSheet={setOpenCheatSheet}
        lastSavedTime={lastSavedTime}
      />

      {/* Main Split Screen Area */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Pane (Code Editor OR Visual Form Builder) */}
        <section className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden flex flex-col no-print border-b lg:border-b-0 lg:border-r border-slate-800">
          {activeMode === "editor" ? (
            <EditorPane
              latexCode={latexCode}
              setLatexCode={setLatexCode}
              onResetToTemplate={handleResetToTemplate}
            />
          ) : (
            <VisualFormPane onApplyFormToLatex={handleApplyFormToLatex} />
          )}
        </section>

        {/* Right Pane (Live Real-Time LaTeX Resume Preview) */}
        <section className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden flex flex-col bg-slate-950">
          <ResumePreview
            ref={previewRef}
            latexCode={latexCode}
            paperSize={paperSize}
            zoom={zoom}
            templateId={activeTemplateId}
          />
        </section>
      </main>

      {/* LaTeX Cheat Sheet Modal */}
      <CheatSheetModal
        isOpen={openCheatSheet}
        onClose={() => setOpenCheatSheet(false)}
        onInsertCommand={handleInsertCommand}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-indigo-400/40 animate-fade-in no-print">
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
