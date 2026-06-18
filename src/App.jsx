import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import profileImg from './assets/profile.jpg'
import ssmsImg from './assets/ssms.png'
import dbtImg from './assets/dbt.svg'
import mockitoImg from './assets/mockito.svg'

/* ── Icons ─────────────────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="0"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
)

/* ── useFadeUp hook ─────────────────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ── Nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => { setSolid(window.scrollY > 40); setMenuOpen(false) }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  return (
    <nav className={`nav${solid || menuOpen ? ' nav--solid' : ''}`}>
      <ul className="nav__links">
        {['about', 'experience', 'projects', 'technologies', 'contact'].map(s => (
          <li key={s}>
            <button onClick={() => scrollTo(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <button className="nav__hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
      </button>

      {menuOpen && (
        <div className="nav__mobile">
          {['about', 'experience', 'projects', 'technologies', 'contact'].map(s => (
            <button key={s} onClick={() => scrollTo(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ── Hero + About (merged) ───────────────────────────────────────────── */
function HeroAbout() {
  const bioRef = useFadeUp()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero-about" id="about">
      <div className="hero-about__inner">

        {/* Left column */}
        <div className="hero-about__left">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-line" />
            <span className="hero__eyebrow-text">Hello, I am</span>
          </div>

          <h1 className="hero__name">
            Zaheer<br />Quraishi
          </h1>

          <div className="hero__divider" />

          <div className="hero__role-row">
            <span className="hero__role">Software & Data Engineer</span>
          </div>

          <div className="hero-about__bio fade-up" ref={bioRef}>
            <p className="about__bio">
              Software Engineering grad from Concordia, currently at MHI RJ Aviation building production systems in C#, .NET, and React that real teams depend on. I find the most value sitting between the business problem and the technical solution, understanding what's actually needed before deciding what to build.
            </p>
            <p className="about__bio about__bio--second">
              Beyond that, I build data pipelines and ML systems end-to-end: a Kafka-driven platform ingesting 9M+ NYC taxi records through DuckDB, a self-retraining Premier League predictor, and a live CNN emotion recognizer deployed to production. Outside of work I play video games, follow football, and have a soft spot for Liverpool.
            </p>
          </div>

          <div className="hero__actions">
            <a href="/zaheer-cv.pdf" download className="btn btn--earth">Download CV</a>
            <button onClick={() => scrollTo('contact')} className="btn btn--outline">Contact Info</button>
          </div>

          <div className="hero__social">
            <a href="https://linkedin.com/in/zaheer-quraishi-399390186" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/zaheerqur" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="hero-about__right">
          <div className="hero__photo">
            <img src={profileImg} alt="Zaheer Quraishi" />
          </div>
          <div className="hero-about__stats">
            <div className="about__stat">
              <span className="about__stat-value">2</span>
              <span className="about__stat-label">Years Experience</span>
              <span className="about__stat-sub">Software Development</span>
            </div>
            <div className="about__stat-divider" />
            <div className="about__stat">
              <span className="about__stat-value">B.Eng.</span>
              <span className="about__stat-label">Software Engineering</span>
              <span className="about__stat-sub">Concordia University</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Experience ──────────────────────────────────────────────────────── */
const ChevronDown = ({ flipped }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: flipped ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const EXPERIENCES = [
  {
    company: 'MHI RJ Aviation',
    role: 'IT Developer',
    period: 'May 2025 - Present',
    lead: 'Building and maintaining production systems used daily across the org - from requirements through to release.',
    body: 'I built a React 19 / TypeScript dashboard for engineering leadership across 20+ Azure DevOps repos, secured via Azure AD / MSAL. I own a Transport Canada-compliant C# / .NET compliance module for 100+ quality inspectors across 500+ global aerospace suppliers. I also diagnosed and resolved a non-deterministic indexing failure in a 1.7 million-record Azure Cognitive Search service.',
    tags: ['React 19', 'TypeScript', 'C#', '.NET', 'ASP.NET MVC', 'ADO.NET', 'Azure', 'MSAL', 'SQL', 'Windows Forms'],
    bullets: [
      'Eliminated manual repository monitoring for engineering leadership by building a centralized React 19 / TypeScript dashboard aggregating commit activity and team membership context across 20+ Azure DevOps repositories, with automated tech stack inference per repo, secured via Azure AD / MSAL with role-based access control.',
      'Replaced a manual, untracked supplier assessment process with a Transport Canada-compliant C# / .NET compliance module covering 9 request type workflows, automated document generation, status lifecycle tracking, and role-based access control, giving 100+ quality inspectors an auditable approval system for 500+ global aerospace suppliers.',
      'Restored data accessibility for newly onboarded client organizations by diagnosing and resolving a non-deterministic indexing failure in an Azure Cognitive Search and SQL indexing service managing 1.7 million records.',
    ],
  },
  {
    company: 'BG Communications',
    role: 'Full-Stack Developer',
    period: 'Sep 2024 - Apr 2025',
    lead: 'Continued development on a full-stack ERP, owning the Resources module end-to-end.',
    body: 'I took ownership of the Resources module end-to-end in a Java / Spring Boot and Next.js ERP, covering API design through frontend. I built data migration scripts and consistency checkers to move historical payroll records to a normalized schema, covered business logic with Selenium and Mockito, and led weekly stakeholder meetings.',
    tags: ['Java', 'Spring Boot', 'Next.js', 'Docker', 'Python', 'Selenium', 'Mockito', 'SQL'],
    bullets: [
      'Continued development of a full-stack ERP web application in Java / Spring Boot and Next.js replacing a legacy desktop platform, taking ownership of the Resources module end-to-end across backend API design and frontend implementation.',
      'Designed and implemented data migration scripts and automated consistency checkers to transfer historical payroll and financial records from the legacy database to a normalized relational schema, verifying integrity through programmatic row count and field-level comparisons.',
      'Covered critical business logic with Selenium end-to-end test suites and Mockito unit tests, contributing to a CI/CD pipeline that ran automated checks on every pull request across a 10-person team.',
      'Led weekly stakeholder meetings to showcase progress and gather requirements, serving as the communication bridge between the development team and project supervisor throughout the engagement.',
    ],
  },
]

function ExperienceCard({ data }) {
  const ref = useFadeUp()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="experience__card fade-up" ref={ref}>
      <div className="experience__top">
        <div>
          <h3 className="experience__company">{data.company}</h3>
          <p className="experience__role">{data.role}</p>
        </div>
        <span className="experience__year">{data.period}</span>
      </div>

      <div className="experience__narrative">
        <p className="experience__lead">{data.lead}</p>
        <p className="experience__body">{data.body}</p>
      </div>

      <div className="skill-tags">
        {data.tags.map(s => <span key={s} className="skill-tag">{s}</span>)}
      </div>

      <div className={`experience__expand${expanded ? ' experience__expand--open' : ''}`}>
        <ul className="experience__bullets">
          {data.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>

      <button className="experience__toggle" onClick={() => setExpanded(e => !e)}>
        {expanded ? 'Show less' : 'Show more'}
        <ChevronDown flipped={expanded} />
      </button>
    </div>
  )
}

function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="section__inner">

        <div className="section__header">
          <div className="section__eyebrow">
            <span className="section__eyebrow-num">01</span>
            <span className="section__eyebrow-rule" style={{ background: 'rgba(252,248,240,0.12)' }} />
            <span className="section__eyebrow-label">Explore My</span>
          </div>
          <h2 className="section__title">Experience</h2>
        </div>

        <div className="experience__cards">
          {EXPERIENCES.map(exp => <ExperienceCard key={exp.company} data={exp} />)}
        </div>

      </div>
    </section>
  )
}

/* ── Technologies ────────────────────────────────────────────────────── */
const DI = p => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${p}.svg`
const SI = s => `https://cdn.simpleicons.org/${s}`

const TECH_STACK = [
  {
    category: 'Languages',
    items: [
      { name: 'C#',         src: DI('csharp/csharp-original') },
      { name: 'TypeScript', src: DI('typescript/typescript-original') },
      { name: 'JavaScript', src: DI('javascript/javascript-original') },
      { name: 'Python',     src: DI('python/python-original') },
      { name: 'Java',       src: DI('java/java-original') },
      { name: 'SQL',        src: DI('microsoftsqlserver/microsoftsqlserver-plain') },
      { name: 'HTML / CSS', src: DI('html5/html5-original') },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'React',        src: DI('react/react-original') },
      { name: '.NET',         src: DI('dotnetcore/dotnetcore-original') },
      { name: 'Spring Boot',  src: DI('spring/spring-original') },
      { name: 'Vue.js',       src: DI('vuejs/vuejs-original') },
      { name: 'Next.js',      src: DI('nextjs/nextjs-original') },
      { name: 'Tailwind CSS', src: DI('tailwindcss/tailwindcss-original') },
      { name: 'PyTorch',      src: DI('pytorch/pytorch-original') },
      { name: 'Scikit-learn', src: SI('scikitlearn') },
      { name: 'pandas',       src: SI('pandas') },
      { name: 'FastAPI',      src: SI('fastapi') },
      { name: 'Flask',        src: DI('flask/flask-original') },
      { name: 'Selenium',     src: DI('selenium/selenium-original') },
    ],
  },
  {
    category: 'Cloud & Platforms',
    items: [
      { name: 'Azure',    src: DI('azure/azure-original') },
      { name: 'Docker',   src: DI('docker/docker-original') },
      { name: 'Kafka',    src: SI('apachekafka') },
      { name: 'DuckDB',   src: SI('duckdb') },
      { name: 'dbt',      src: dbtImg },
      { name: 'Airflow',  src: SI('apacheairflow') },
      { name: 'Firebase', src: DI('firebase/firebase-original') },
      { name: 'Netlify',  src: SI('netlify') },
      { name: 'Render',   src: SI('render') },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git',           src: DI('git/git-original') },
      { name: 'GitHub',         src: DI('github/github-original') },
      { name: 'GitHub Actions', src: SI('githubactions') },
      { name: 'VS Code',       src: DI('vscode/vscode-original') },
      { name: 'Visual Studio', src: DI('visualstudio/visualstudio-plain') },
      { name: 'IntelliJ IDEA', src: DI('intellij/intellij-original') },
      { name: 'JIRA',          src: DI('jira/jira-original') },
      { name: 'Confluence',    src: DI('confluence/confluence-original') },
      { name: 'SSMS',          src: ssmsImg },
    ],
  },
  {
    category: 'Testing',
    items: [
      { name: 'Jest',                  src: DI('jest/jest-plain') },
      { name: 'Mockito',               src: mockitoImg },
      { name: 'React Testing Library', src: SI('testinglibrary') },
    ],
  },
]

function TechBubble({ name, src }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="tech-bubble">
      <div className="tech-bubble__circle">
        {src && !failed
          ? <img
              src={src}
              alt={name}
              width="34"
              height="34"
              onError={() => setFailed(true)}
            />
          : <span className="tech-bubble__fallback">
              {name.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase()}
            </span>
        }
      </div>
      <span className="tech-bubble__name">{name}</span>
    </div>
  )
}

function Technologies() {
  const ref = useFadeUp()

  return (
    <section className="section technologies" id="technologies">
      <div className="section__inner">

        <div className="section__header">
          <div className="section__eyebrow">
            <span className="section__eyebrow-num">03</span>
            <span className="section__eyebrow-rule" />
            <span className="section__eyebrow-label">What I Work With</span>
          </div>
          <h2 className="section__title">Technologies</h2>
        </div>

        <div className="tech-categories fade-up" ref={ref}>
          {TECH_STACK.map(group => (
            <div key={group.category} className="tech-category">
              <p className="tech-category__label">{group.category}</p>
              <div className="tech-category__bubbles">
                {group.items.map(item => (
                  <TechBubble key={item.name} name={item.name} src={item.src} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ── Projects ────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    name: 'Supplier Quality Management System',
    description: 'Transport Canada-compliant C# / .NET platform serving 100+ quality inspectors across 500+ global aerospace suppliers. Covers a weighted risk scoring engine, a 9-workflow RFSA approval lifecycle with automated document generation, five-tier role-based access control, and a GDI+ onsite audit calendar.',
    tech: ['C#', '.NET', 'Windows Forms', 'SQL Server', 'Azure Blob Storage'],
    caseStudy: '/case-study/supplierdb',
    accent: '#9333EA',
  },
  {
    name: 'Sentinel',
    description: 'Internal engineering activity dashboard giving leadership a live, org-wide view of commit activity and team membership across 20+ Azure DevOps repositories. Frontend-only SPA authenticated against Azure AD via MSAL, with typed service modules, per-repo partial failure handling, and CI/CD through Azure Pipelines.',
    tech: ['React 19', 'TypeScript', 'Azure AD', 'MSAL', 'Azure DevOps API'],
    caseStudy: '/case-study/sentinel',
    accent: '#0284C7',
  },
  {
    name: 'NYC Taxi Platform',
    description: 'Airflow-orchestrated pipeline ingesting 9M+ NYC taxi records through Kafka into DuckDB, with dbt transformations and CI-enforced data quality tests on every push. A scikit-learn fare prediction model is served via FastAPI, with a React dashboard showing live trip volume, revenue trends, and a real-time fare predictor.',
    tech: ['Kafka', 'DuckDB', 'dbt', 'Airflow', 'FastAPI', 'scikit-learn', 'React', 'GitHub Actions'],
    github: 'https://github.com/zaheerqur/nyc-taxi-platform',
    demo: 'https://nyc-taxi-dashboard.netlify.app/',
    accent: '#CA8A04',
  },
  {
    name: 'EPL Predictor',
    description: 'Self-sustaining MLOps pipeline trained on 4,180 Premier League matches across 11 seasons, serving calibrated win/draw/loss probabilities via FastAPI. Achieves 45.3% accuracy on a held-out 2025-26 validation season and auto-retrains twice weekly via GitHub Actions.',
    tech: ['Python', 'scikit-learn', 'FastAPI', 'Docker', 'Vue.js', 'GitHub Actions', 'Render', 'Netlify'],
    github: 'https://github.com/zaheerqur/epl-predictor',
    demo: 'https://ml-epl-prediction.netlify.app',
    accent: '#6D28D9',
  },
  {
    name: 'Emotion Recognition App',
    description: '3-layer CNN trained from scratch on 35,000+ FER2013 images and exported to ONNX, cutting the production footprint by 90% for lightweight inference. Served via a Flask API with a live Netlify frontend featuring a sample grid and real-time classification.',
    tech: ['Python', 'PyTorch', 'ONNX', 'Flask', 'React'],
    github: 'https://github.com/zaheerqur/COMP472_Emotion_Recognition',
    demo: 'https://comp-472-cnn.netlify.app/',
    accent: '#F07840',
  },
  {
    name: 'CondoConnect',
    description: 'Full-stack condo management platform with multi-role RBAC, conflict-aware facility reservations, and financial reporting across the full Firebase data layer. Backed by a 52-file Jest / React Testing Library suite covering 68 backend functions.',
    tech: ['React 18', 'Firebase', 'Jest', 'EmailJS', 'Google Maps API'],
    github: 'https://github.com/zaheerqur/Mini-Capstone',
    demo: null,
    accent: '#1C8C6E',
  },
  {
    name: 'Truly',
    description: 'Full-stack career services platform with role-based access control for employers, candidates, and admins. Features resume upload via Cloudinary, session-based authentication, and independent CI/CD pipelines for frontend and backend through GitHub Actions.',
    tech: ['Vue.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Jest', 'GitHub Actions'],
    github: 'https://github.com/zaheerqur/Truly',
    demo: null,
    accent: '#2563EB',
  },
]

function ProjectCard({ project, index, delay }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="project-card fade-up" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="project-card__accent" style={{ background: project.accent }} />
      <div className="project-card__body">
        <span className="project-card__num">0{index + 1}</span>
        <h3 className="project-card__name">{project.name}</h3>
        <div className="project-card__rule" />
        <p className="project-card__desc">{project.description}</p>
        <div className="tech-tags">
          {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
        </div>
      </div>
      <div className="project-card__actions">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn--sm btn--sm-outline-dark">
            GitHub <ArrowUpRight />
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn--sm btn--sm-coral-light">
            Live Demo <ArrowUpRight />
          </a>
        )}
        {project.caseStudy && (
          <Link to={project.caseStudy} className="btn--sm btn--sm-coral-light">
            Case Study <ArrowUpRight />
          </Link>
        )}
        {!project.github && !project.demo && !project.caseStudy && (
          <span className="project-card__internal">Internal / In Progress</span>
        )}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="section__inner">

        <div className="section__header">
          <div className="section__eyebrow">
            <span className="section__eyebrow-num">02</span>
            <span className="section__eyebrow-rule" />
            <span className="section__eyebrow-label">Browse My Recent</span>
          </div>
          <h2 className="section__title">Projects</h2>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} delay={i * 70} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ── Contact ─────────────────────────────────────────────────────────── */
function Contact() {
  const ref = useFadeUp()

  return (
    <section className="section contact" id="contact">
      <div className="section__inner">

        <div className="section__header">
          <div className="section__eyebrow">
            <span className="section__eyebrow-num">04</span>
            <span className="section__eyebrow-rule" />
            <span className="section__eyebrow-label">Get in Touch</span>
          </div>
          <h2 className="section__title">Contact Me</h2>
        </div>

        <div className="fade-up" ref={ref}>
          <div className="contact__grid">
            <a href="tel:+15149537474" className="contact__item">
              <span className="contact__item-label">Phone</span>
              <span className="contact__item-value">
                <PhoneIcon />
                (+1) 514-953-7474
              </span>
            </a>
            <a href="mailto:zaheerqur1811@gmail.com" className="contact__item">
              <span className="contact__item-label">Email</span>
              <span className="contact__item-value">
                <EmailIcon />
                zaheerqur1811@gmail.com
              </span>
            </a>
            <a href="https://linkedin.com/in/zaheer-quraishi-399390186" target="_blank" rel="noopener noreferrer" className="contact__item">
              <span className="contact__item-label">LinkedIn</span>
              <span className="contact__item-value">
                <LinkedInIcon />
                Zaheer Quraishi
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Zaheer Quraishi</p>
      <span className="footer__right">Made with intention ♥</span>
    </footer>
  )
}

/* ── App ─────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <HeroAbout />
      <Experience />
      <Projects />
      <Technologies />
      <Contact />
      <Footer />
    </>
  )
}
