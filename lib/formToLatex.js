export const INITIAL_FORM_DATA = {
  fullName: "Alex Chen",
  title: "Senior Full Stack Engineer",
  email: "alex.chen@example.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  website: "https://alexchen.dev",
  linkedin: "https://linkedin.com/in/alexchen",
  github: "https://github.com/alexchen",
  summary: "Results-driven Senior Software Engineer with 6+ years of experience specializing in scalable distributed microservices, React, Next.js, Node.js, and cloud systems. Track record of improving platform performance and driving digital innovation.",
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      dates: "Aug 2019 -- May 2023",
      details: "GPA: 3.89 | Relevant Coursework: Distributed Systems, Database Architecture, Machine Learning",
    },
  ],
  experience: [
    {
      company: "CloudScale Inc.",
      role: "Senior Full Stack Engineer",
      location: "San Francisco, CA",
      dates: "June 2023 -- Present",
      bullets: [
        "Architected and deployed resilient microservices architecture serving 15M+ daily API requests.",
        "Reduced server latency by 35% by implementing Redis distributed caching and query indexing on PostgreSQL.",
        "Spearheaded real-time collaboration feature using WebSockets and Next.js, elevating DAU engagement by 28%.",
        "Mentored 4 junior engineers and established CI/CD pipeline automation cutting release cycle times by 40%.",
      ],
    },
    {
      company: "NextGen Fintech",
      role: "Software Engineering Intern",
      location: "Seattle, WA",
      dates: "June 2022 -- Aug 2022",
      bullets: [
        "Developed automated fraud detection service in Python & FastAPI that flagged anomalous transactions with 94% precision.",
        "Integrated Stripe billing and webhook synchronization reducing payment processing drop-offs by 18%.",
        "Authored 80+ unit and integration tests achieving 92% test coverage across core payment modules.",
      ],
    },
  ],
  projects: [
    {
      name: "Distributed Key-Value Store",
      tech: "Go, Raft Consensus, gRPC, Docker",
      link: "https://github.com/alexchen/raft-kv",
      bullets: [
        "Implemented distributed consensus algorithm (Raft) supporting leader election, log replication, and partition tolerance.",
        "Benchmarked throughput reaching 45,000 writes/sec across 5-node cluster with linearizable consistency.",
      ],
    },
    {
      name: "AI Resume Scanner & Optimizer",
      tech: "React, Next.js, OpenAI API, Tailwind CSS",
      link: "https://github.com/alexchen/ai-resume",
      bullets: [
        "Built intelligent resume parser that matches candidate qualifications with job descriptions in real-time.",
        "Scaled product to 25,000+ monthly active users organically within first 3 months of launch.",
      ],
    },
  ],
  skills: {
    languages: "JavaScript, TypeScript, Python, Go, SQL (PostgreSQL, MySQL), HTML/CSS, C++",
    frameworks: "React, Next.js, Node.js, Express, FastAPI, Django, Redux, Tailwind CSS",
    tools: "Docker, Kubernetes, AWS (S3, EC2, Lambda), Git, GitHub Actions, Terraform, Linux",
    concepts: "Microservices, RESTful APIs, GraphQL, System Design, CI/CD, Test-Driven Development (TDD)",
  },
};

export function formToLatex(form) {
  const sanitize = (str) => {
    if (!str) return "";
    return str
      .replace(/&/g, "\\&")
      .replace(/%/g, "\\%")
      .replace(/\$/g, "\\$")
      .replace(/#/g, "\\#")
      .replace(/_/g, "\\_");
  };

  const links = [];
  if (form.email) links.push(`\\href{mailto:${form.email}}{${sanitize(form.email)}}`);
  if (form.phone) links.push(sanitize(form.phone));
  if (form.location) links.push(sanitize(form.location));
  if (form.linkedin) links.push(`\\href{${form.linkedin}}{LinkedIn}`);
  if (form.github) links.push(`\\href{${form.github}}{GitHub}`);
  if (form.website) links.push(`\\href{${form.website}}{Portfolio}`);

  const headerLine = links.join(" ~|~ ");

  let latex = `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Huge \\textbf{${sanitize(form.fullName || "Your Name")}}} \\\\ \\vspace{2pt}
    ${form.title ? `{\\large \\textbf{${sanitize(form.title)}}} \\\\ \\vspace{2pt}` : ""}
    {\\small ${headerLine}}
\\end{center}
`;

  // Summary
  if (form.summary && form.summary.trim()) {
    latex += `
%-----------SUMMARY-----------
\\section{Professional Summary}
${sanitize(form.summary.trim())}
`;
  }

  // Education
  if (form.education && form.education.length > 0) {
    latex += `
%-----------EDUCATION-----------
\\section{Education}
\\begin{itemize}[leftmargin=0.15in, label={}]
`;
    form.education.forEach((edu) => {
      latex += `    \\item
    \\textbf{${sanitize(edu.institution)}} \\hfill ${sanitize(edu.location)} \\\\
    \\textit{${sanitize(edu.degree)}} \\hfill ${sanitize(edu.dates)} \\\\
    ${edu.details ? `\\small{${sanitize(edu.details)}}` : ""}
`;
    });
    latex += `\\end{itemize}\n`;
  }

  // Experience
  if (form.experience && form.experience.length > 0) {
    latex += `
%-----------EXPERIENCE-----------
\\section{Experience}
\\begin{itemize}[leftmargin=0.15in, label={}]
`;
    form.experience.forEach((exp) => {
      latex += `    \\item
    \\textbf{${sanitize(exp.role)}} -- \\textit{${sanitize(exp.company)}} \\hfill ${sanitize(exp.location)} \\\\
    \\textit{Full-Time} \\hfill ${sanitize(exp.dates)}
`;
      if (exp.bullets && exp.bullets.length > 0) {
        latex += `    \\begin{itemize}\n`;
        exp.bullets.forEach((bullet) => {
          if (bullet.trim()) {
            latex += `        \\item ${sanitize(bullet.trim())}\n`;
          }
        });
        latex += `    \\end{itemize}\n`;
      }
    });
    latex += `\\end{itemize}\n`;
  }

  // Projects
  if (form.projects && form.projects.length > 0) {
    latex += `
%-----------PROJECTS-----------
\\section{Projects}
\\begin{itemize}[leftmargin=0.15in, label={}]
`;
    form.projects.forEach((proj) => {
      const linkLatex = proj.link ? `\\hfill \\href{${proj.link}}{Live / Code}` : "";
      latex += `    \\item
    \\textbf{${sanitize(proj.name)}} $|$ \\emph{${sanitize(proj.tech)}} ${linkLatex}
`;
      if (proj.bullets && proj.bullets.length > 0) {
        latex += `    \\begin{itemize}\n`;
        proj.bullets.forEach((bullet) => {
          if (bullet.trim()) {
            latex += `        \\item ${sanitize(bullet.trim())}\n`;
          }
        });
        latex += `    \\end{itemize}\n`;
      }
    });
    latex += `\\end{itemize}\n`;
  }

  // Skills
  if (form.skills) {
    latex += `
%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
    ${form.skills.languages ? `\\textbf{Languages:} ${sanitize(form.skills.languages)} \\\\` : ""}
    ${form.skills.frameworks ? `\\textbf{Frameworks & Libraries:} ${sanitize(form.skills.frameworks)} \\\\` : ""}
    ${form.skills.tools ? `\\textbf{Developer Tools & Cloud:} ${sanitize(form.skills.tools)} \\\\` : ""}
    ${form.skills.concepts ? `\\textbf{Core Competencies:} ${sanitize(form.skills.concepts)}` : ""}
\\end{itemize}
`;
  }

  latex += `\n\\end{document}\n`;
  return latex;
}
