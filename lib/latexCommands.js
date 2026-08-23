export const LATEX_COMMAND_CATEGORIES = [
  {
    category: "Text Formatting",
    commands: [
      { name: "Bold Text", syntax: "\\textbf{Bold Text}", desc: "Renders text in bold weight", example: "\\textbf{Strong leadership}" },
      { name: "Italic Text", syntax: "\\textit{Italic Text}", desc: "Renders text in italic/slanted style", example: "\\textit{Summa Cum Laude}" },
      { name: "Underline Text", syntax: "\\underline{Underlined Text}", desc: "Underlines given text", example: "\\underline{Dean's List}" },
      { name: "Small Caps", syntax: "\\textsc{Small Caps}", desc: "Converts text to small capital letters", example: "\\textsc{Google}" },
      { name: "Monospace / Typewriter", syntax: "\\texttt{code_or_url}", desc: "Monospace font for code or tech stack", example: "\\texttt{React, Node.js}" },
      { name: "Sans-Serif Font", syntax: "\\textsf{Clean Modern Text}", desc: "Renders sans-serif font", example: "\\textsf{Modern Resume}" },
      { name: "Text Color", syntax: "\\textcolor{blue}{Colored Text}", desc: "Applies specified color to text", example: "\\textcolor{#2563eb}{Full Stack}" },
    ],
  },
  {
    category: "Structure & Sections",
    commands: [
      { name: "Section Heading", syntax: "\\section{Experience}", desc: "Main resume section header with divider", example: "\\section{Technical Skills}" },
      { name: "Sub-Section Heading", syntax: "\\subsection{Senior Engineer}", desc: "Subordinate section header", example: "\\subsection{Projects}" },
      { name: "Horizontal Divider", syntax: "\\hrule", desc: "Draws a horizontal rule line", example: "\\hrule" },
      { name: "Vertical Space", syntax: "\\vspace{4pt}", desc: "Adds custom vertical spacing", example: "\\vspace{8pt}" },
      { name: "Horizontal Fill (Right Align)", syntax: "\\hfill May 2024", desc: "Pushes text to the far right side", example: "\\hfill San Francisco, CA" },
      { name: "Hyperlink", syntax: "\\href{https://github.com}{GitHub}", desc: "Clickable URL link", example: "\\href{https://linkedin.com}{LinkedIn Profile}" },
      { name: "Line Break", syntax: "\\\\", desc: "Forces a new line break", example: "Line 1 \\\\ Line 2" },
    ],
  },
  {
    category: "Lists & Bullet Points",
    commands: [
      { name: "Bulleted List", syntax: "\\begin{itemize}\n  \\item First bullet point\n  \\item Second bullet point\n\\end{itemize}", desc: "Bullet list container for achievements", example: "\\begin{itemize}\n  \\item Accelerated API throughput by 42%\n\\end{itemize}" },
      { name: "Numbered List", syntax: "\\begin{enumerate}\n  \\item First item\n  \\item Second item\n\\end{enumerate}", desc: "Ordered sequential list", example: "\\begin{enumerate}\n  \\item Step 1\n\\end{enumerate}" },
      { name: "Single Item", syntax: "\\item Led team of 8 engineers", desc: "Individual bullet point inside itemize", example: "\\item Led development of cloud microservices." },
    ],
  },
  {
    category: "Font Sizes",
    commands: [
      { name: "Huge Title", syntax: "{\\Huge John Doe}", desc: "For primary candidate name", example: "{\\Huge Alex Rivera}" },
      { name: "Large Heading", syntax: "{\\Large Software Engineer}", desc: "For candidate title or top subhead", example: "{\\Large Senior Cloud Architect}" },
      { name: "Large Normal", syntax: "{\\large Section Title}", desc: "For key roles or degrees", example: "{\\large Master of Science}" },
      { name: "Normal Size", syntax: "{\\normalsize Regular Text}", desc: "Standard body text size", example: "{\\normalsize Developed scalable APIs}" },
      { name: "Small Size", syntax: "{\\small Subtext / Dates}", desc: "Compact secondary metadata", example: "{\\small GPA: 3.9/4.0}" },
      { name: "Footnote / Tiny", syntax: "{\\footnotesize Jan 2022 -- Present}", desc: "Smallest legible footnote text", example: "{\\footnotesize Certified AWS Solutions Architect}" },
    ],
  },
  {
    category: "Mathematics & KaTeX",
    commands: [
      { name: "Inline Math", syntax: "$O(N \\log N)$", desc: "Renders mathematical expression inline", example: "$R^2 = 0.98$" },
      { name: "Fraction", syntax: "\\frac{a}{b}", desc: "Math fraction", example: "\\frac{\\partial L}{\\partial W}" },
      { name: "Summation", syntax: "\\sum_{i=1}^{n} x_i", desc: "Summation notation", example: "\\sum_{i=1}^k w_i x_i" },
      { name: "Square Root", syntax: "\\sqrt{x}", desc: "Square root symbol", example: "\\sqrt{MSE}" },
    ],
  },
];
