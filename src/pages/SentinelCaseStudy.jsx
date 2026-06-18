import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 5 5 12 12 19" />
  </svg>
)

export default function SentinelCaseStudy() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <CaseStudyNav />
      <div className="case-study">
        <div className="case-study__inner">

          <button className="case-study__back" onClick={() => navigate(-1)}>
            <BackArrow /> Back
          </button>

          <p className="case-study__eyebrow">MHI RJ Aviation Group — Internal Tooling</p>
          <h1 className="case-study__title">Sentinel</h1>
          <div className="case-study__tags">
            {['React 19', 'TypeScript', 'Azure AD', 'MSAL', 'Azure DevOps API', 'Microsoft Graph API', 'Vite', 'Azure Pipelines', 'IIS'].map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>

          <section className="case-study__section">
            <h2 className="case-study__h2">Background</h2>
            <p className="case-study__p">
              Engineering leadership at MHIRJ had no consolidated view of development activity across the organization's Azure DevOps repositories. Staying across commit history, team membership, and project health meant manually navigating each repository individually. With 20+ active repos across multiple projects, this was not sustainable.
            </p>
            <p className="case-study__p">
              Sentinel was built to solve that: a single internal dashboard giving leadership a live, org-wide view of engineering activity without requiring a backend service.
            </p>
          </section>

          <section className="case-study__section">
            <h2 className="case-study__h2">Architecture</h2>
            <p className="case-study__p">
              Sentinel is a frontend-only SPA. It authenticates directly against Azure AD using MSAL and then queries the Azure DevOps REST API and Microsoft Graph API from the client, eliminating the need to build and maintain a backend service.
            </p>
            <p className="case-study__p">
              This put authentication correctness front and centre. MSAL is configured with session storage rather than local storage, PII filtering is enabled in the logger, and API scopes are kept minimal: User.Read and GroupMember.Read.All for Microsoft Graph, and user_impersonation for Azure DevOps. Secrets are never stored in the repository; they flow in through Azure Pipelines variable groups at build time.
            </p>
            <p className="case-study__p">
              The service layer is cleanly separated from the UI. Auth token acquisition uses a silent request with a popup fallback, and the Graph API, DevOps API, and auth logic each have their own typed service modules with fully typed response shapes across the board using TypeScript strict mode.
            </p>
          </section>

          <section className="case-study__section">
            <h2 className="case-study__h2">Handling Partial Failures</h2>
            <p className="case-study__p">
              One real consideration for a multi-project DevOps organisation is that individual repositories or projects can be unavailable or return errors at any given time. Sentinel handles this by processing repository and project data through <code>Promise.all</code> with per-item error handling, so a single unresponsive repository is skipped and logged without taking down the rest of the dashboard. Leadership sees a complete view of what is available rather than a blank screen.
            </p>
          </section>

          <section className="case-study__section">
            <h2 className="case-study__h2">CI/CD</h2>
            <p className="case-study__p">
              The pipeline runs lint, typecheck, and build on every push to main via Azure Pipelines, with environment variables injected from a secret store. The build artifact is published as a zip for IIS deployment, with a <code>web.config</code> SPA rewrite rule included so client-side routing works correctly on the server.
            </p>
          </section>

          <section className="case-study__section">
            <h2 className="case-study__h2">Stack</h2>
            <table className="case-study__table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Choice</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Framework</td><td>React 19 + React Router 7</td></tr>
                <tr><td>Build</td><td>Vite 6</td></tr>
                <tr><td>Auth</td><td>Azure MSAL (browser + React)</td></tr>
                <tr><td>UI</td><td>Custom @mhirj/wingman-ui (shadcn/ui fork) + Tailwind CSS v4</td></tr>
                <tr><td>Typing</td><td>TypeScript 5.8, strict mode</td></tr>
                <tr><td>CI/CD</td><td>Azure Pipelines</td></tr>
                <tr><td>Deployment</td><td>IIS</td></tr>
              </tbody>
            </table>
          </section>

        </div>
      </div>
    </>
  )
}
