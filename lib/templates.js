export const RESUME_TEMPLATES = [
  {
    id: "software-engineer",
    name: "Software Engineer (Jake's Clean)",
    badge: "Most Popular",
    description: "Industry-standard tech resume format optimized for ATS scan and technical roles.",
    code: `\\documentclass[letterpaper,11pt]{article}
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
    {\\Huge \\textbf{Alex Chen}} \\\\ \\vspace{2pt}
    {\\small \\href{mailto:alex.chen@example.com}{alex.chen@example.com} ~|~ +1 (555) 234-5678 ~|~ \\href{https://linkedin.com/in/alexchen}{linkedin.com/in/alexchen} ~|~ \\href{https://github.com/alexchen}{github.com/alexchen}}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
    \\textbf{University of California, Berkeley} \\hfill Berkeley, CA \\\\
    \\textit{Bachelor of Science in Computer Science; GPA: 3.89} \\hfill Aug 2019 -- May 2023 \\\\
    \\small{\\textbf{Relevant Coursework:} Data Structures, Algorithms, Distributed Systems, Database Systems, Computer Security}
\\end{itemize}

%-----------EXPERIENCE-----------
\\section{Experience}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
    \\textbf{Senior Full Stack Engineer} -- \\textit{CloudScale Inc.} \\hfill San Francisco, CA \\\\
    \\textit{Full-Time} \\hfill June 2023 -- Present
    \\begin{itemize}
        \\item Designed and deployed resilient microservices architecture processing \\textbf{15M+ daily API requests} with 99.99\\% uptime.
        \\item Reduced server latency by \\textbf{35\\%} by implementing Redis distributed caching and query indexing on PostgreSQL.
        \\item Spearheaded real-time collaboration feature using WebSockets and Next.js, increasing daily active user engagement by 28\\%.
        \\item Mentored 4 junior engineers and established CI/CD pipeline automation cutting release cycle times by 40\\%.
    \\end{itemize}

    \\item
    \\textbf{Software Engineering Intern} -- \\textit{NextGen Fintech} \\hfill Seattle, WA \\\\
    \\textit{Internship} \\hfill June 2022 -- Aug 2022
    \\begin{itemize}
        \\item Developed automated fraud detection service in Python and FastAPI that flagged anomalous transactions with 94\\% precision.
        \\item Integrated Stripe billing and webhook synchronization reducing payment processing drop-offs by 18\\%.
        \\item Authored 80+ unit and integration tests achieving 92\\% test coverage across core payment modules.
    \\end{itemize}
\\end{itemize}

%-----------PROJECTS-----------
\\section{Projects}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
    \\textbf{Distributed Key-Value Store} $|$ \\emph{Go, Raft Consensus, gRPC, Docker} \\hfill \\href{https://github.com/alexchen/raft-kv}{GitHub Repo}
    \\begin{itemize}
        \\item Implemented distributed consensus algorithm (Raft) supporting leader election, log replication, and partition tolerance.
        \\item Benchmarked throughput reaching 45,000 writes/sec across 5-node cluster with linearizable consistency.
    \\end{itemize}

    \\item
    \\textbf{AI Resume Scanner & Optimizer} $|$ \\emph{React, Next.js, OpenAI API, Tailwind CSS} \\hfill \\href{https://github.com/alexchen/ai-resume}{Live Demo}
    \\begin{itemize}
        \\item Built intelligent resume parser that matches candidate qualifications with job descriptions, scoring keywords in real-time.
        \\item Grew product to 25,000+ monthly active users organically within first 3 months of launch.
    \\end{itemize}
\\end{itemize}

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
    \\textbf{Languages:} JavaScript, TypeScript, Python, Go, SQL (PostgreSQL, MySQL), HTML/CSS, C++ \\\\
    \\textbf{Frameworks & Libraries:} React, Next.js, Node.js, Express, FastAPI, Django, Redux, Tailwind CSS \\\\
    \\textbf{Developer Tools & Cloud:} Docker, Kubernetes, AWS (S3, EC2, Lambda), Git, GitHub Actions, Terraform, Linux \\\\
    \\textbf{Concepts:} Microservices, RESTful APIs, GraphQL, System Design, CI/CD, Test-Driven Development (TDD)
\\end{itemize}

\\end{document}`
  },
  {
    id: "executive-modern",
    name: "Executive & Modern Professional",
    badge: "Executive",
    description: "Sleek, high-impact design emphasizing leadership achievements, metrics, and strategy.",
    code: `\\documentclass[letterpaper,10pt]{article}
\\usepackage{geometry}
\\geometry{margin=0.6in}
\\usepackage{hyperref}
\\usepackage{xcolor}

\\begin{document}

%----------HEADER----------
\\begin{center}
    {\\Huge \\textbf{\\textcolor{#1e293b}{SARAH JENNINGS, PMP}}} \\\\[4pt]
    {\\large \\textbf{\\textcolor{#2563eb}{Director of Engineering | Cloud & Digital Transformation}}} \\\\[4pt]
    {\\small New York, NY ~•~ +1 (555) 987-6543 ~•~ \\href{mailto:sarah.jennings@executive.io}{sarah.jennings@executive.io} ~•~ \\href{https://linkedin.com/in/sarahjennings}{linkedin.com/in/sarahjennings}}
\\end{center}

%-----------EXECUTIVE SUMMARY-----------
\\section{Executive Summary}
Strategic, results-driven engineering leader with 12+ years of experience scaling high-performing global engineering organizations (50+ engineers), modernizing enterprise architecture, and managing \\$15M+ annual engineering budgets. Proven track record in driving digital transformation, SaaS profitability, and mission-critical cloud platform migrations.

%-----------CORE COMPETENCIES-----------
\\section{Core Leadership Competencies}
\\begin{itemize}
    \\item \\textbf{Strategic Leadership:} Organizational Design, Engineering Culture, Multi-Site Team Management (50+ FTEs)
    \\item \\textbf{Technology & Execution:} Enterprise Cloud Architecture (AWS/GCP), Microservices, Agile at Scale, FinOps
    \\item \\textbf{Business Alignment:} \\$15M+ P\\&L Management, M\\&A Technical Due Diligence, Executive Stakeholder Management
\\end{itemize}

%-----------PROFESSIONAL EXPERIENCE-----------
\\section{Professional Experience}
\\begin{itemize}
    \\item
    \\textbf{Vice President of Engineering} -- \\textit{Enterprise Cloud Technologies} \\hfill 2021 -- Present \\\\
    \\textit{Leading 65 engineers across platform, data, security, and product engineering teams.}
    \\begin{itemize}
        \\item Orchestrated enterprise cloud modernization migrating legacy monolith to AWS serverless, reducing infra costs by \\textbf{42\\% (\\$2.4M saved annually)}.
        \\item Accelerated product velocity by \\textbf{3x} through DevOps continuous delivery transformation and automated compliance.
        \\item Maintained 99.995\\% SLA reliability while scaling annual revenue from \\$40M to \\$110M ARR.
    \\end{itemize}

    \\item
    \\textbf{Director of Software Engineering} -- \\textit{Global FinTech Solutions} \\hfill 2017 -- 2021 \\\\
    \\textit{Promoted from Principal Architect to Director; managed 4 engineering managers and 32 engineers.}
    \\begin{itemize}
        \\item Spearheaded real-time transactional payment gateway processing \\textbf{\\$8B+ in annual transaction volume}.
        \\item Achieved zero-downtime SOC2 Type II, PCI-DSS, and ISO27001 certifications across all core payment infrastructures.
        \\item Reduced developer turnover from 24\\% to 6\\% by establishing transparent career ladders and mentorship programs.
    \\end{itemize}
\\end{itemize}

%-----------EDUCATION & CERTIFICATIONS-----------
\\section{Education \\& Certifications}
\\begin{itemize}
    \\item \\textbf{Master of Business Administration (MBA)} -- Columbia Business School \\hfill 2017
    \\item \\textbf{B.S. in Computer Science \\& Applied Mathematics} -- Cornell University \\hfill 2012
    \\item \\textbf{Certifications:} AWS Certified Solutions Architect -- Professional, Certified Scrum Master (CSM)
\\end{itemize}

\\end{document}`
  },
  {
    id: "academic-research",
    name: "Academic & Research CV",
    badge: "Academic",
    description: "Classic serif typography designed for researchers, professors, publications, and grants.",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{hyperref}
\\usepackage{titlesec}

\\begin{document}

%----------HEADER----------
\\begin{center}
    {\\Huge \\textsc{Dr. Marcus Vance}} \\\\[4pt]
    {\\large Postdoctoral Research Fellow in Artificial Intelligence} \\\\[4pt]
    {\\small Stanford University ~|~ Department of Computer Science ~|~ \\href{mailto:mvance@stanford.edu}{mvance@stanford.edu}}
\\end{center}

%-----------RESEARCH INTERESTS-----------
\\section{Research Interests}
Deep Learning Theory, Large Language Models Alignment, Neural Architecture Search, Reinforcement Learning with Human Feedback (RLHF), Mathematical Optimization.

%-----------EDUCATION-----------
\\section{Education}
\\begin{itemize}
    \\item \\textbf{Ph.D. in Computer Science}, Stanford University \\hfill 2020 -- 2024 \\\\
    \\textit{Dissertation: Robust Optimization and Generalization Bounds in Deep Transformer Architectures} \\\\
    \\textit{Advisor: Prof. Elena Rostova}
    \\item \\textbf{M.S. in Mathematical Sciences}, MIT \\hfill 2018 -- 2020
    \\item \\textbf{B.S. in Mathematics \\& Computer Science (Summa Cum Laude)}, Harvard University \\hfill 2014 -- 2018
\\end{itemize}

%-----------SELECTED PUBLICATIONS-----------
\\section{Selected Peer-Reviewed Publications}
\\begin{itemize}
    \\item \\textbf{M. Vance}, E. Rostova, K. Tanaka. \\textit{"Sample Efficiency and Convergence Rates in Policy Gradient Alignment"}. \\textbf{NeurIPS 2023} (Oral Presentation, Top 1\\%).
    \\item \\textbf{M. Vance}, S. Miller, D. Patel. \\textit{"Scalable Multi-Agent Representation Learning with Graph Neural Networks"}. \\textbf{ICLR 2023}.
    \\item J. Zhao, \\textbf{M. Vance}, E. Rostova. \\textit{"Generalization Guarantees for Attention Mechanisms via Spectral Bounds"}. \\textbf{ICML 2022}.
\\end{itemize}

%-----------AWARDS & HONORS-----------
\\section{Honors \\& Awards}
\\begin{itemize}
    \\item \\textbf{National Science Foundation (NSF) Graduate Research Fellowship} \\hfill 2020 -- 2023
    \\item \\textbf{Stanford Graduate Fellowship in Science \\& Engineering} \\hfill 2020
    \\item \\textbf{Harvard Thomas Temple Hoopes Prize for Outstanding Senior Thesis} \\hfill 2018
\\end{itemize}

%-----------TEACHING EXPERIENCE-----------
\\section{Teaching Experience}
\\begin{itemize}
    \\item \\textbf{Head Teaching Assistant} -- CS 229: Machine Learning (Stanford University) \\hfill Fall 2022, Fall 2023
    \\item \\textbf{Instructor} -- CS 109: Probability for Computer Scientists (Stanford University) \\hfill Summer 2021
\\end{itemize}

\\end{document}`
  },
  {
    id: "minimalist-ats",
    name: "Minimalist ATS-First",
    badge: "ATS Direct",
    description: "Ultra clean, single-column design structured specifically for maximum ATS parsing rate.",
    code: `\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{hyperref}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{DAVID K. MILLER}} \\\\[3pt]
    Austin, TX • (512) 555-0199 • \\href{mailto:david.miller@email.com}{david.miller@email.com} • \\href{https://linkedin.com/in/davidkmiller}{linkedin.com/in/davidkmiller} • \\href{https://github.com/davidkmiller}{github.com/davidkmiller}
\\end{center}

\\section{Summary}
Full Stack Software Developer with 6 years of experience building secure, scalable web applications and enterprise REST APIs. Proficient in React, Node.js, Python, PostgreSQL, and AWS cloud deployments. Strong focus on test coverage, clean code architecture, and high performance.

\\section{Skills}
\\begin{itemize}
    \\item \\textbf{Programming Languages:} Python, JavaScript (ES6+), TypeScript, SQL, Bash, Go
    \\item \\textbf{Frontend Development:} React, Next.js, Redux Toolkit, Tailwind CSS, HTML5/CSS3, Webpack
    \\item \\textbf{Backend Development:} Node.js, Express, Django, FastAPI, REST APIs, GraphQL, Microservices
    \\item \\textbf{Databases \\& Caching:} PostgreSQL, MongoDB, Redis, MySQL, DynamoDB
    \\item \\textbf{DevOps \\& Tools:} Docker, AWS (EC2, S3, RDS, Lambda), Git, GitHub Actions, Linux, Jest, Cypress
\\end{itemize}

\\section{Professional Experience}
\\begin{itemize}
    \\item \\textbf{Senior Web Developer} — TechVista Solutions, Austin, TX \\hfill 2021 — Present
    \\begin{itemize}
        \\item Led frontend and backend development of SaaS analytics dashboard utilized by 120,000+ business customers.
        \\item Decreased initial page load time from 4.2s to 1.1s by implementing server-side rendering and asset bundle optimization.
        \\item Migrated monolithic API into 8 isolated microservices with Docker and AWS ECS, boosting fault tolerance.
    \\end{itemize}
    \\item \\textbf{Software Developer} — Apex Digital Systems, Dallas, TX \\hfill 2018 — 2021
    \\begin{itemize}
        \\item Built and maintained 15+ customer-facing web apps with React, TypeScript, and Express.js.
        \\item Integrated Stripe and PayPal payment gateways handling \\$2M+ in recurring monthly subscriptions.
        \\item Created automated testing pipeline with Jest and GitHub Actions that prevented 99\\% of critical regression bugs.
    \\end{itemize}
\\end{itemize}

\\section{Education}
\\begin{itemize}
    \\item \\textbf{Bachelor of Science in Information Technology} — University of Texas at Austin \\hfill 2014 — 2018
\\end{itemize}

\\end{document}`
  }
];
