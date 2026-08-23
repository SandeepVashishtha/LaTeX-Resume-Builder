"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Link,
  Sigma,
  Palette,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileCode
} from "lucide-react";

export default function EditorPane({ latexCode, setLatexCode, onResetToTemplate }) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Sync scroll between line numbers and textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lines = latexCode.split("\n");
  const lineCount = lines.length;

  const insertSnippet = (before, after = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = latexCode.substring(start, end);
    const replacement = before + (selectedText || "text") + after;

    const newCode = latexCode.substring(0, start) + replacement + latexCode.substring(end);
    setLatexCode(newCode);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selectedText ? selectedText.length : 4));
    }, 10);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    // Handle tab key indent inside editor
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = latexCode.substring(0, start) + "    " + latexCode.substring(end);
      setLatexCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 10);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center flex-wrap gap-1">
          <button
            type="button"
            onClick={() => insertSnippet("\\textbf{", "}")}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition"
            title="Bold Text (\textbf{})"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("\\textit{", "}")}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition"
            title="Italic Text (\textit{})"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("\\section{", "}")}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition flex items-center gap-0.5"
            title="Section Heading (\section{})"
          >
            <Heading1 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-semibold">Sec</span>
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("\\subsection{", "}")}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition flex items-center gap-0.5"
            title="Sub-Section Heading (\subsection{})"
          >
            <Heading2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-semibold">Sub</span>
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("\\begin{itemize}\n    \\item ", "\n\\end{itemize}")}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition"
            title="Bullet List (\begin{itemize})"
          >
            <List className="w-3.5 h-3.5 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("\\item ")}
            className="px-2 py-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition text-[11px] font-mono"
            title="Add \item bullet"
          >
            +\item
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("\\href{https://", "}{Link Title}")}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition"
            title="Hyperlink (\href{})"
          >
            <Link className="w-3.5 h-3.5 text-blue-400" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("$", "$")}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition"
            title="KaTeX Math Formula ($...$)"
          >
            <Sigma className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("\\hfill ")}
            className="px-2 py-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-transparent hover:border-slate-700 transition text-[11px] font-mono"
            title="Horizontal Fill / Right Align (\hfill)"
          >
            \hfill
          </button>
        </div>

        {/* Right side utility buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 transition text-[11px]"
            title="Copy LaTeX Code"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            type="button"
            onClick={onResetToTemplate}
            className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-rose-200 rounded border border-slate-700 transition text-[11px]"
            title="Reset code to original template"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area with Line Numbers */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-[13px] leading-relaxed bg-[#0b101b]">
        {/* Line Numbers column */}
        <div
          ref={lineNumbersRef}
          className="select-none py-3 px-2 bg-[#090d16] text-slate-600 text-right font-mono text-xs border-r border-slate-800/80 overflow-hidden w-12 shrink-0"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-[1.625rem]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea Code Editor */}
        <textarea
          ref={textareaRef}
          value={latexCode}
          onChange={(e) => setLatexCode(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="w-full h-full py-3 px-4 bg-transparent text-slate-200 resize-none outline-none overflow-y-auto leading-[1.625rem] selection:bg-indigo-600/40 selection:text-white placeholder:text-slate-600"
          placeholder="Type or paste your LaTeX resume code here..."
        />
      </div>

      {/* Editor Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-mono">
            <FileCode className="w-3 h-3 text-indigo-400" />
            {lineCount} lines
          </span>
          <span className="font-mono">{latexCode.length} characters</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono">UTF-8</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Sync Active
          </span>
        </div>
      </div>
    </div>
  );
}
