import React from "react";
import katex from "katex";

// Helper to escape HTML if needed
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Convert LaTeX inline commands to React nodes or safe styled HTML
export function renderLatexInline(text) {
  if (!text) return null;

  // Replace common LaTeX escapes and symbols first
  let processed = text
    .replace(/\\\\/g, "<br />")
    .replace(/\\&/g, "&amp;")
    .replace(/\\\$/g, "$")
    .replace(/\\%/g, "%")
    .replace(/\\_/g, "_")
    .replace(/\\#/g, "#")
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/~/g, " ");

  // Handle KaTeX math $...$
  processed = processed.replace(/\$(.+?)\$/g, (match, mathContent) => {
    try {
      return katex.renderToString(mathContent, { throwOnError: false });
    } catch {
      return `<span class="font-mono text-sm">${mathContent}</span>`;
    }
  });

  // Handle \href{url}{text}
  processed = processed.replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, (match, url, label) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800 transition-colors">${label}</a>`;
  });

  // Handle \textcolor{color}{text}
  processed = processed.replace(/\\textcolor\{([^}]+)\}\{([^}]+)\}/g, (match, color, inner) => {
    const validColor = color.startsWith("#") ? color : color;
    return `<span style="color: ${validColor}">${inner}</span>`;
  });

  // Handle font weights & styles
  processed = processed.replace(/\\textbf\{([^}]*)\}/g, "<strong>$1</strong>");
  processed = processed.replace(/\\textit\{([^}]*)\}/g, "<em>$1</em>");
  processed = processed.replace(/\\emph\{([^}]*)\}/g, "<em>$1</em>");
  processed = processed.replace(/\\underline\{([^}]*)\}/g, "<u>$1</u>");
  processed = processed.replace(/\\textsc\{([^}]*)\}/g, "<span class='uppercase tracking-wider text-[0.88em]'>$1</span>");
  processed = processed.replace(/\\texttt\{([^}]*)\}/g, "<code class='bg-slate-100 px-1 py-0.5 rounded text-[0.9em] font-mono text-slate-800'>$1</code>");
  processed = processed.replace(/\\textsf\{([^}]*)\}/g, "<span class='font-sans'>$1</span>");

  // Handle size tags inside braces e.g., {\Huge Alex} or {\small text}
  processed = processed.replace(/\{\\Huge\s+([^}]*)\}/g, "<span class='text-2xl font-bold tracking-tight'>$1</span>");
  processed = processed.replace(/\{\\huge\s+([^}]*)\}/g, "<span class='text-xl font-bold'>$1</span>");
  processed = processed.replace(/\{\\Large\s+([^}]*)\}/g, "<span class='text-lg font-semibold'>$1</span>");
  processed = processed.replace(/\{\\large\s+([^}]*)\}/g, "<span class='text-base font-semibold'>$1</span>");
  processed = processed.replace(/\{\\small\s+([^}]*)\}/g, "<span class='text-xs text-slate-600'>$1</span>");
  processed = processed.replace(/\{\\footnotesize\s+([^}]*)\}/g, "<span class='text-[11px] text-slate-500'>$1</span>");
  processed = processed.replace(/\{\\tiny\s+([^}]*)\}/g, "<span class='text-[9px] text-slate-400'>$1</span>");

  // Handle standalone size modifiers that prefix lines
  processed = processed.replace(/\\Huge\s+/g, "<span class='text-2xl font-bold'>");
  processed = processed.replace(/\\huge\s+/g, "<span class='text-xl font-bold'>");
  processed = processed.replace(/\\Large\s+/g, "<span class='text-lg font-semibold'>");
  processed = processed.replace(/\\large\s+/g, "<span class='text-base font-semibold'>");
  processed = processed.replace(/\\small\s+/g, "<span class='text-xs text-slate-600'>");
  processed = processed.replace(/\\footnotesize\s+/g, "<span class='text-[11px] text-slate-500'>");

  // Handle \hfill (push right) by converting text with \hfill into flex row
  if (processed.includes("\\hfill")) {
    const parts = processed.split("\\hfill");
    if (parts.length === 2) {
      return (
        <div className="flex justify-between items-baseline w-full gap-2">
          <span dangerouslySetInnerHTML={{ __html: parts[0].trim() }} />
          <span className="text-right text-slate-600 text-sm whitespace-nowrap font-medium" dangerouslySetInnerHTML={{ __html: parts[1].trim() }} />
        </div>
      );
    }
  }

  return <span dangerouslySetInnerHTML={{ __html: processed }} />;
}

// Parse document into structured blocks for live preview
export function parseLatexDocument(latexCode) {
  if (!latexCode) return [];

  // Remove lines before \begin{document}
  let code = latexCode;
  const docStart = code.indexOf("\\begin{document}");
  if (docStart !== -1) {
    code = code.substring(docStart + "\\begin{document}".length);
  }
  const docEnd = code.indexOf("\\end{document}");
  if (docEnd !== -1) {
    code = code.substring(0, docEnd);
  }

  const rawLines = code.split("\n");
  const blocks = [];
  let currentList = null;
  let currentCenter = null;

  for (let i = 0; i < rawLines.length; i++) {
    let line = rawLines[i].trim();

    // Skip empty lines & comment lines
    if (!line || line.startsWith("%")) {
      continue;
    }

    // Ignore comment part at end of line
    if (line.includes("%") && !line.includes("\\%")) {
      line = line.split("%")[0].trim();
    }

    // Center Environment Start
    if (line.startsWith("\\begin{center}")) {
      currentCenter = [];
      continue;
    }

    // Center Environment End
    if (line.startsWith("\\end{center}")) {
      if (currentCenter) {
        blocks.push({
          type: "center",
          content: currentCenter.join("<br />"),
        });
        currentCenter = null;
      }
      continue;
    }

    // Accumulate inside center block
    if (currentCenter !== null) {
      if (line) currentCenter.push(line);
      continue;
    }

    // Section header
    const sectionMatch = line.match(/\\section\*?\{([^}]+)\}/);
    if (sectionMatch) {
      // Close list if open
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({
        type: "section",
        title: sectionMatch[1],
      });
      continue;
    }

    // Subsection header
    const subSectionMatch = line.match(/\\subsection\*?\{([^}]+)\}/);
    if (subSectionMatch) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({
        type: "subsection",
        title: subSectionMatch[1],
      });
      continue;
    }

    // Itemize / Enumerate start
    if (line.startsWith("\\begin{itemize}") || line.startsWith("\\begin{enumerate}")) {
      const isOrdered = line.startsWith("\\begin{enumerate}");
      const isNested = currentList !== null;
      if (!isNested) {
        currentList = {
          type: isOrdered ? "enumerate" : "itemize",
          items: [],
        };
      }
      continue;
    }

    // Itemize / Enumerate end
    if (line.startsWith("\\end{itemize}") || line.startsWith("\\end{enumerate}")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      continue;
    }

    // List Item
    if (line.startsWith("\\item")) {
      const itemText = line.replace(/^\\item\s*/, "");
      if (currentList) {
        currentList.items.push(itemText);
      } else {
        // Standalone item
        blocks.push({
          type: "paragraph",
          content: "• " + itemText,
        });
      }
      continue;
    }

    // Regular line / spacing / paragraph
    if (currentList) {
      // Append to previous item if continuation
      if (currentList.items.length > 0) {
        currentList.items[currentList.items.length - 1] += " " + line;
      } else {
        currentList.items.push(line);
      }
    } else {
      if (line === "\\hrule") {
        blocks.push({ type: "divider" });
      } else if (line.startsWith("\\vspace")) {
        blocks.push({ type: "spacer" });
      } else {
        blocks.push({
          type: "paragraph",
          content: line,
        });
      }
    }
  }

  // Flush remaining list
  if (currentList) {
    blocks.push(currentList);
  }

  return blocks;
}
