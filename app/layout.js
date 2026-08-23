import "./globals.css";

export const metadata = {
  title: "LaTeX Resume Builder - High-Performance Online Resume & CV Creator",
  description: "Modern, real-time LaTeX resume builder. Write clean LaTeX or use visual form builder to generate ATS-friendly resumes and high-resolution PDFs instantly.",
  keywords: ["LaTeX Resume Builder", "CV Maker", "LaTeX Editor", "PDF Resume", "ATS Resume", "Next.js"],
  authors: [{ name: "Sandeep Vashishtha" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>" />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
