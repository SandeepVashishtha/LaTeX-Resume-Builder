# 📄 LaTeX-Based Online Resume Builder (Next.js)

A modern, high-performance, and client-side **LaTeX Resume Builder** built with **Next.js** and **JavaScript**. Write professional resumes using real LaTeX code or use the intuitive Visual Form Builder with instant live preview and client-side PDF export.

---

## ✨ Features

- **⚡ Dual Builder Modes**:
  - **LaTeX Code Editor**: Integrated editor with line numbers, code snippets toolbar, and real-time validation.
  - **Visual Form Builder**: Interactive form fields (Personal Info, Summary, Experience, Education, Skills, Projects) that automatically synchronize with LaTeX code.
- **🎨 Curated Resume Templates**:
  - *Software Engineer (Jake's Clean)* - Industry standard for technical ATS optimization.
  - *Executive & Modern Professional* - Sleek leadership metrics format.
  - *Academic & Research CV* - Serif typography for publications, grants, and teaching.
  - *Minimalist ATS Direct* - Single-column maximum parse rate design.
- **👁️ Real-Time Live Preview**:
  - Instant visual rendering of LaTeX syntax, section rules, lists, and KaTeX math formulas.
  - Paper size switching (**US Letter** and **A4**).
  - Zoom controls (50% to 150%) with paper scale simulation.
- **📥 Multiple Export Formats**:
  - **High-DPI PDF Download**: 1-click client-side PDF generation.
  - **LaTeX Source (.tex)**: Download clean `.tex` source code.
  - **Direct Print**: Print-ready CSS styling for native browser printing.
- **📚 LaTeX Cheat Sheet**: Searchable interactive command reference modal with 1-click insertion.
- **💾 Local Persistence**: Autosaves your resume state to local storage so work is never lost.
- **🚀 100% Client-Side**: No backend server or database setup required.

---

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router, JavaScript)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), Vanilla CSS, Lucide Icons
- **Typography & Math**: [KaTeX](https://katex.org/), Google Fonts (Inter, Newsreader, JetBrains Mono)
- **PDF Engine**: [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SandeepVashishtha/LaTeX-Resume-Builder.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd LaTeX-Resume-Builder
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage Guide

1. **Select a Template**: Choose from the templates dropdown in the top header (e.g. Software Engineer, Executive, Academic, Minimalist).
2. **Edit Content**:
   - Switch between **LaTeX Code** mode and **Visual Form** mode using the header tabs.
   - Use the toolbar buttons for instant insertion of `\textbf{}`, `\section{}`, `\item`, math formulas, or hyperlinks.
3. **Reference Commands**: Click the **Cheat Sheet** button to search LaTeX syntax and insert snippets.
4. **Preview & Adjust**: Check the real-time preview on the right pane, toggle between US Letter / A4 paper sizes, and adjust zoom levels.
5. **Export Your Resume**:
   - Click **Download PDF** for a high-resolution PDF document.
   - Click **.tex** to download the raw LaTeX source file for Overleaf or local TeX distributions.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new templates or features:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
