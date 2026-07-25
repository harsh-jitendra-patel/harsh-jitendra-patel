export const personalInfo = {
  name: "HARSH PATEL",
  title: "Lead Software Engineer & Full-Stack Architect",
  tagline:
    "Building scalable enterprise applications, high-performance microservices, and AI-driven workflows across .NET Core, Angular, and Microsoft Azure.",
  email: "harshp38@gmail.com",
  location: "Bengaluru / Ahmedabad, India",
  github: "https://github.com/harshjp722",
  linkedin: "https://linkedin.com/in/harsh-patel-gtu-2015",
  blog: "https://harshp38.wordpress.com",
  resumePdf: "/Harsh_Patel_ATS_Resume.pdf",
  summary:
    "Seasoned and results-oriented Lead Software Engineer with over 9+ years of hands-on experience in architecting, developing, and deploying scalable enterprise-grade web applications. Proven expertise across full-stack development, cloud computing (Microsoft Azure), microservices architecture, and technical team leadership. Demonstrates strong technical ownership in resolving complex production issues, optimizing high-latency database operations, and maintaining high software reliability. Skilled in driving AI tool integration (GitHub Copilot, Claude) to elevate development efficiency, alongside mentoring engineering cells, conducting rigorous code reviews, and enforcing ADA compliance and OIDC security standards.",
};

export const metrics = [
  { label: "Years Experience", value: 9, suffix: "+", prefix: "" },
  { label: "Revenue Growth", value: 70, suffix: "%", prefix: "Up to " },
  { label: "Vulnerability Compliance", value: 100, suffix: "%", prefix: "" },
  { label: "Products Shipped", value: 5, suffix: "+", prefix: "" },
];

export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      "Angular (Advanced)",
      "TypeScript",
      "JavaScript",
      "HTML5 / CSS3",
      "Material Design",
      "Konva.js",
      "React",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      "ASP.NET Core",
      "C#",
      "RESTful APIs",
      "Node.js",
      "Microservices Architecture",
      "ASP.NET MVC",
      "Python",
      "FastAPI"
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    skills: [
      "Microsoft Azure",
      "Azure Data Factory",
      "Azure Service Bus",
      "Docker",
      "Kubernetes",
      "Redis Cache",
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    skills: [
      "GitHub Copilot",
      "Claude Code",
      "Camunda BPM",
      "Jira Automation",
      "Snyk",
      "SonarQube",
    ],
  },
  {
    id: "data",
    label: "Databases",
    skills: [
      "Microsoft SQL Server",
      "MongoDB",
      "Redis",
      "Azure Data Factory",
    ],
  },
  {
    id: "practices",
    label: "Practices",
    skills: [
      "Unit Testing",
      "SME Code Reviews",
      "ADA Compliance",
      "OIDC Authentication",
      "Agile / Scrum",
    ],
  },
];

export const experience = [
  {
    company: "Ansira (formerly BrandMuscle India Pvt. Ltd.)",
    location: "Bengaluru, India",
    period: "Oct 2021 – Present",
    role: "Lead Software Engineer (Promoted May 2025)",
    formerRole: "Principal Software Engineer",
    highlights: [
      {
        title: "Product Feature Innovation",
        description:
          "Engineered interactive frontend modules including Text Linking, Flexi Fit, Logo Locker, and Menu Maker in Palette Workspace using Angular and Konva.js, expanding design flexibility and UI responsiveness.",
      },
      {
        title: "System Architecture & Performance Optimization",
        description:
          "Architected and deployed a standalone Image Processor utility featuring independent background jobs/triggers, successfully resolving critical memory failure issues and high search page load latency in Digital Asset Management (DAM).",
      },
      {
        title: "Workflow & Integration Automation",
        description:
          "Streamlined client onboarding and campaign operations by building Azure Data Factory (ADF) pipelines, single-thread Azure Service Bus background service workers, and automated Jira ticket workflows.",
      },
      {
        title: "Security & Compliance Governance",
        description:
          "Audited codebases via Snyk and SonarQube to eliminate critical security vulnerabilities, upgraded enterprise services to .NET 6.0, and enforced OIDC authentication and ADA web compliance standards.",
      },
      {
        title: "Technical Leadership & AI Driving",
        description:
          "Acted as Subject Matter Expert (SME) for database integrations and code review governance. Introduced corporate utilization of AI assistant tools (GitHub Copilot and Claude) and mentored junior engineers on coding best practices.",
      },
    ],
  },
  {
    company: "Mialo Technologies Pvt. Ltd.",
    location: "Bengaluru, India",
    period: "Dec 2020 – Sep 2021",
    role: "Senior Software Engineer",
    highlights: [
      {
        title: "Full-Stack Enterprise Development",
        description:
          "Developed and delivered robust full-stack enterprise software components utilizing ASP.NET Core and modern Angular frontend frameworks with MS SQL Server databases.",
      },
      {
        title: "Cross-Functional Collaboration",
        description:
          "Collaborated with cross-functional product cells to translate business requirements into clean RESTful web services on schedule.",
      },
    ],
  },
  {
    company: "Gateway Group of Companies (NINtec Systems Ltd.)",
    location: "Ahmedabad, India",
    period: "Jul 2018 – Dec 2020",
    role: "Senior Software Engineer",
    highlights: [
      {
        title: "Digital Transformation Leadership",
        description:
          "Executed an on-site technical discovery workshop in Mexico to modernize legacy workflows, directly driving a 30% to 70% increase in active client revenue.",
      },
      {
        title: "Patient 360 Healthcare Portal",
        description:
          "Unified multi-source claims records (EHR, DPC, BCDA) into a single-page view doctor portal to aid clinical decision-making.",
      },
      {
        title: "Automotive SaaS Platforms",
        description:
          "Architected a multi-tenant cloud-based Vehicle Insurance Comparator SaaS on Azure, integrated third-party calculation engines (VIN/License API), and built mobile/web endpoints for Automotive Leasing Suite.",
      },
    ],
  },
  {
    company: "Samarpan Infotech",
    location: "Ahmedabad, India",
    period: "Oct 2016 – Jul 2018",
    role: "Software Developer",
    highlights: [
      {
        title: "API & Frontend Development",
        description:
          "Engineered RESTful web API endpoints in C# / .NET for mobile and web clients; modeled interactive client UI screens in Angular, JavaScript, HTML, and CSS.",
      },
      {
        title: "Mentorship",
        description:
          "Mentored engineering interns on tech stack adoption, project debugging, and coding standard adherence.",
      },
    ],
  },
  {
    company: "CK-IICT Pvt. Ltd.",
    location: "Ahmedabad, India",
    period: "Jun 2015 – Oct 2016",
    role: "Developer",
    highlights: [
      {
        title: "Database & Backend Architecture",
        description:
          "Constructed relational business logic architectures by designing MS SQL Server database schemas, tables, and stored procedures under ASP.NET MVC architecture.",
      },
    ],
  },
];

export const projects = [
  {
    title: "Palette Workspace & Image Processor Utility",
    technologies: ["Angular", "ASP.NET Core", "Konva.js", "Azure Data Factory", "Redis", "Snyk"],
    problem:
      "The Digital Asset Management system suffered from critical memory failure crashes and high search page load latency, degrading user experience and operational效率.",
    solution:
      "Developed interactive design canvas tools (Text Linking, Flexi Fit, Menu Maker) and engineered a standalone background Image Processor service with independent jobs/triggers.",
    impact:
      "Eliminated memory failure crashes entirely and boosted DAM media retrieval speed by 40%, significantly improving platform reliability.",
  },
  {
    title: "Patient 360 Healthcare Diagnosis Portal",
    technologies: ["ASP.NET Core", "Angular", "MS SQL Server", "REST APIs", "EHR / DPC / BCDA"],
    problem:
      "Clinicians lacked a unified view of patient medical claims data scattered across multiple sources (EHR, DPC, BCDA), slowing clinical decision-making.",
    solution:
      "Built a unified healthcare intelligence platform consolidating multi-source medical claims data into a single-page doctor dashboard with rapid search and filtering.",
    impact:
      "Enabled rapid clinical history evaluation, reducing patient data retrieval time and improving diagnostic accuracy for healthcare providers.",
  },
  {
    title: "Vehicle Insurance SaaS & Automotive Suite",
    technologies: ["C#", ".NET", "Azure SaaS", "DocuSign API", "Twilio API"],
    problem:
      "Automotive dealers needed a scalable, multi-tenant platform to compare insurance quotes and manage leasing workflows across multiple stakeholders.",
    solution:
      "Engineered a cloud-based multi-tenant insurance comparator SaaS on Azure with automated third-party API integrations (DocuSign, Twilio, VIN Calculation).",
    impact:
      "Delivered a scalable SaaS platform serving dealers, customers, service providers, and drivers with automated document signing and communication workflows.",
  },
];

export const certifications = [
  {
    title: "Claude Certified Architect - Foundations",
    description: "Certified in AI architecture principles and prompt engineering workflows.",
    year: "2025",
  },
  {
    title: "Microsoft Student Partner",
    description: "Nominated for technical advocacy and community leadership during undergraduate studies.",
    year: "2014",
  },
];

export const awards = [
  {
    title: "Spark Award",
    description:
      "Awarded at NINtec Systems Ltd. for outstanding performance during client digital transformation delivery in Mexico.",
    year: "2018",
  },
  {
    title: "Employee of the Year",
    description:
      "Honored at Samarpan Infotech for technical reliability and exceptional contribution.",
    year: "2017",
  },
];

export const education = {
  degree: "Bachelor of Engineering (B.E.) in Information Technology",
  university: "Gujarat Technological University (HGCE)",
  period: "2011 – 2015",
  cgpa: "7.25",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Sandbox", href: "#architecture-sandbox" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
