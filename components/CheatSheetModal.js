"use client";

import React, { useState } from "react";
import {
  X,
  Search,
  BookOpen,
  Copy,
  Check,
  PlusCircle,
  Sparkles,
  Code
} from "lucide-react";
import { LATEX_COMMAND_CATEGORIES } from "../lib/latexCommands";

export default function CheatSheetModal({ isOpen, onClose, onInsertCommand }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (syntax, id) => {
    navigator.clipboard.writeText(syntax);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const filteredCategories = LATEX_COMMAND_CATEGORIES.map((cat) => {
    const filteredCommands = cat.commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.syntax.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, commands: filteredCommands };
  }).filter((cat) => cat.commands.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">LaTeX Resume Cheat Sheet</h2>
              <p className="text-xs text-slate-400">Quick syntax reference, snippets, and 1-click insertions.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-800 bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search commands, syntax, or descriptions (e.g. bold, bullet, href, math)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Commands List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Code className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No matching LaTeX commands found for "{searchQuery}"</p>
            </div>
          ) : (
            filteredCategories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-2.5">
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  {cat.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {cat.commands.map((cmd, cmdIdx) => {
                    const uniqueKey = `${catIdx}-${cmdIdx}`;
                    return (
                      <div
                        key={cmdIdx}
                        className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3 flex flex-col justify-between gap-2 hover:border-slate-600 transition"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-white">{cmd.name}</span>
                            <span className="text-[10px] text-slate-400">{cmd.desc}</span>
                          </div>
                          <pre className="bg-slate-950 text-indigo-300 font-mono text-[11px] p-2 rounded-lg border border-slate-800/80 overflow-x-auto whitespace-pre-wrap">
                            {cmd.syntax}
                          </pre>
                        </div>
                        <div className="flex items-center justify-end gap-1.5 pt-1">
                          <button
                            onClick={() => handleCopy(cmd.syntax, uniqueKey)}
                            className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] px-2.5 py-1 rounded-lg transition"
                          >
                            {copiedIndex === uniqueKey ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              onInsertCommand(cmd.syntax);
                              onClose();
                            }}
                            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] px-2.5 py-1 rounded-lg transition font-medium"
                          >
                            <PlusCircle className="w-3 h-3" />
                            <span>Insert</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
