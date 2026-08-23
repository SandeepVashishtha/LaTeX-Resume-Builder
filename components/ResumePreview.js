"use client";

import React, { forwardRef } from "react";
import { parseLatexDocument, renderLatexInline } from "../lib/latexParser";
import { Eye, Layers, FileText } from "lucide-react";

const ResumePreview = forwardRef(function ResumePreview(
  { latexCode, paperSize, zoom, templateId },
  ref
) {
  const blocks = parseLatexDocument(latexCode);
  const isSerif = templateId === "academic-research";

  return (
    <div className="flex-1 h-full overflow-auto bg-slate-950 p-4 md:p-8 flex flex-col items-center justify-start relative select-text">
      {/* Zoom scale container */}
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
          transition: "transform 0.15s ease-out",
        }}
        className="my-auto pb-16"
      >
        {/* Printable Paper Canvas */}
        <div
          ref={ref}
          id="resume-canvas"
          className={`resume-paper ${
            paperSize === "letter" ? "paper-letter" : "paper-a4"
          } ${isSerif ? "serif-mode" : ""} rounded-sm relative text-[#0f172a] text-[13px] leading-normal`}
        >
          {blocks.length === 0 ? (
            <div className="text-center py-20 text-slate-400 font-sans">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-40 text-slate-500" />
              <p className="font-semibold text-base">No content to preview</p>
              <p className="text-xs text-slate-400 mt-1">
                Enter LaTeX code in the editor or choose a template to begin.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {blocks.map((block, idx) => {
                // Section Header
                if (block.type === "section") {
                  return (
                    <div key={idx} className="mt-4 mb-1.5 first:mt-0">
                      <div className="flex items-center justify-between border-b-2 border-[#1e293b] pb-0.5 mb-1.5">
                        <h2 className="text-[14.5px] font-bold uppercase tracking-wider text-[#0f172a]">
                          {block.title}
                        </h2>
                      </div>
                    </div>
                  );
                }

                // Sub-Section Header
                if (block.type === "subsection") {
                  return (
                    <div key={idx} className="mt-2 mb-1">
                      <h3 className="text-[13.5px] font-semibold text-[#1e293b]">
                        {block.title}
                      </h3>
                    </div>
                  );
                }

                // Center block (Usually Header Name & Contact Info)
                if (block.type === "center") {
                  return (
                    <div
                      key={idx}
                      className="text-center mb-3 leading-relaxed"
                    >
                      {renderLatexInline(block.content)}
                    </div>
                  );
                }

                // Bulleted List (Itemize)
                if (block.type === "itemize") {
                  return (
                    <ul key={idx} className="list-disc ml-5 space-y-1 my-1 text-[12.5px] text-[#1e293b]">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-snug pl-0.5">
                          {renderLatexInline(item)}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Numbered List (Enumerate)
                if (block.type === "enumerate") {
                  return (
                    <ol key={idx} className="list-decimal ml-5 space-y-1 my-1 text-[12.5px] text-[#1e293b]">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-snug pl-0.5">
                          {renderLatexInline(item)}
                        </li>
                      ))}
                    </ol>
                  );
                }

                // Horizontal Divider
                if (block.type === "divider") {
                  return <hr key={idx} className="border-t border-slate-300 my-2" />;
                }

                // Spacer
                if (block.type === "spacer") {
                  return <div key={idx} className="h-1.5" />;
                }

                // Regular Paragraph / Content
                return (
                  <div key={idx} className="leading-snug text-[#1e293b]">
                    {renderLatexInline(block.content)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ResumePreview;
