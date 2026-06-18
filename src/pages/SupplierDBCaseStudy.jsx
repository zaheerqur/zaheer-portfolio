import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 5 5 12 12 19" />
  </svg>
)

export default function SupplierDBCaseStudy() {
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

          <p className="case-study__eyebrow">MHI RJ Aviation Group — Transport Canada Compliant</p>
          <h1 className="case-study__title">Supplier Quality Management System</h1>
          <div className="case-study__tags">
            {['C#', '.NET', 'Windows Forms', 'ADO.NET', 'SQL Server', 'Azure Blob Storage', 'COM Interop', 'GDI+'].map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>

          <section className="case-study__section">
            <h2 className="case-study__h2">Background</h2>
            <p className="case-study__p">
              MHIRJ manages a global supply chain of 500+ aerospace suppliers, each subject to periodic quality assessments mandated by Transport Canada. Before this system, the process was largely manual: quality inspectors tracked reassessments in spreadsheets, approval workflows had no enforcement, and there was no reliable audit trail.
            </p>
            <p className="case-study__p">
              My work was focused on building and improving the core modules of the internal supplier quality management platform used by 100+ quality inspectors across the organization.
            </p>
          </section>

          <section className="case-study__section">
            <h2 className="case-study__h2">What I Built</h2>

            <h3 className="case-study__h3">Risk Scoring Engine</h3>
            <p className="case-study__p">
              The most technically complex piece was the vendor risk assessment engine. Every supplier in the system receives a numerical risk score that determines the scope of their next audit.
            </p>
            <p className="case-study__p">
              The score is computed differently depending on whether a supplier is CRJ Direct (has active purchase orders with MHIRJ) or CRJ Indirect. For Direct suppliers, five weighted factors are combined: PO volume, controlled document count, master plan signature rate, part criticality tier (A1 through C3), and corrective action history. Indirect suppliers use a simplified formula weighted more heavily toward document compliance and corrective action history, since PO and criticality data are not available for them.
            </p>
            <p className="case-study__p">
              The engine reads live Excel workbooks via COM automation, queries SQL Server for CAR history and document counts, and produces a 0–100 score that is persisted to the database. The score drives downstream behaviour: it determines how many audit questions are sampled from the specification bank when generating checklist documents for the quality team.
            </p>
            <p className="case-study__p">
              To avoid re-scanning large datasets on repeated assessments, the PO normalization baseline is statically cached across instances. COM objects are released in finally blocks on every code path to prevent Excel ghost processes.
            </p>

            <h3 className="case-study__h3">Vendor List Export Performance</h3>
            <p className="case-study__p">
              The vendor list could be exported to Excel for reporting purposes, but generation time was several minutes for a 400+ vendor dataset. The root cause was an N+1 query pattern: the export was opening a separate database connection for each vendor record, resulting in hundreds of connection open/close cycles plus cell-by-cell interleaving with the database.
            </p>
            <p className="case-study__p">
              The fix batched all queries into a single connection using a multi-query executor, pre-joined vendor class data in memory using a dictionary keyed by vendor code for O(1) lookup, and disabled Excel screen updating during the write loop. Generation time dropped by 90%.
            </p>

            <h3 className="case-study__h3">Vendor Tab</h3>
            <p className="case-study__p">
              The vendor management interface handles the full lifecycle of a supplier record. On selecting a vendor, seven SQL queries are enqueued and executed in a single database connection: vendor info, contacts, classifications, specifications, reassessments, RFSAs, and activity log.
            </p>
            <p className="case-study__p">
              Access to the interface is role-gated at construction time across three tiers (admin, privileged, regular) plus a separate inspector role with its own restriction set, controlling approximately 25 individual UI elements. Every save operation diffs the current UI state against the stored database values and writes activity log records only for fields that actually changed, producing a clean and accurate audit trail. The activity log itself uses a virtual-mode ListView, meaning records are stored in a cache and served on demand rather than loaded into the control's item collection, keeping the UI responsive regardless of history length.
            </p>

            <h3 className="case-study__h3">Onsite Audit Calendar</h3>
            <p className="case-study__p">
              The audit calendar gives the quality team visibility into past and upcoming onsite supplier audits across monthly and annual views. Both views are built entirely from label grid arrays with no third-party calendar control.
            </p>
            <p className="case-study__p">
              Each calendar cell owns a data structure tracking audit status and supplier information. Status is colour-coded: confirmed audits render in green, proposed in yellow, rescheduled in salmon, and cancelled in coral. When multiple audits fall on the same day, a custom GDI+ paint event handler divides the cell height into equal horizontal stripes, one per audit, and renders the day number on top. This makes scheduling conflicts immediately visible without requiring the user to click into each day.
            </p>

            <h3 className="case-study__h3">RFSA Module — Request for Supplier Approval</h3>
            <p className="case-study__p">
              The RFSA module manages the full approval lifecycle for new and existing suppliers across nine distinct request types, each with its own audit requirements, document set, and email workflow.
            </p>

            <h4 className="case-study__h4">Approval Lifecycle</h4>
            <p className="case-study__p">
              Every RFSA is assigned a sequentially generated A-code in the format A{'{'}YYYY{'}'}{'{'}####{'}'}, computed by querying the most recent code and incrementing, giving year-prefixed, zero-padded identifiers. The record moves through four named states: Assigned, WIP, and Closed, plus an admin-only Reopen that nulls the outcome fields and resets status to WIP.
            </p>
            <p className="case-study__p">
              On creation, the vendor code is immediately locked read-only and the assigned quality representative receives an automated email notification. When the QAR is ready to engage the supplier, clicking Send Survey validates vendor classification, resolves the correct document template for the request type, generates the relevant Excel or Word documents, and opens a pre-composed Outlook draft with the package attached. On success, the database is stamped with the sent date and status advances to WIP.
            </p>
            <p className="case-study__p">
              Closing an RFSA requires a recommendation to be present and an outcome decision from an Approved Auditor. On save, a second SQL statement fires atomically against the vendor table, writing the approval date and pushing the next reassessment due date forward, directly driving the reassessment cycle.
            </p>

            <h4 className="case-study__h4">The Nine Request Types</h4>
            <p className="case-study__p">
              The request type selected at creation locks downstream behaviour: audit type, email template, document package, and vendor eligibility. New Supplier and Classification Update requests generate MF002 self-assessment surveys and MF007 onsite checklists. Address, Name, and Ownership Changes send email-only notifications with no attachments. New Control Process and Control Process Deviation requests generate MF007 checklists scoped to the vendor's existing controlled specifications. Manufacturing Process Change and System Code Update leave document preparation to the QAR.
            </p>
            <p className="case-study__p">
              Vendor eligibility is enforced at the UI level: types requiring A&amp;F classification render greyed-out for ineligible vendors and are blocked at save. For Control Process Deviation, a pre-flight check queries the vendor's specification count and blocks the survey send if none exist, since a deviation requires controlled specs on file.
            </p>

            <h4 className="case-study__h4">Document Generation</h4>
            <p className="case-study__p">
              MF002 surveys are generated via Excel COM interop, writing directly into named cells of a template file: survey type, company name, address, vendor code, date, RFSE number, vendor classifications, and QAR contact details. MF007 onsite checklists are generated one per selected specification, pulling checklist items from the paragraph bank via the same risk assessment infrastructure. When multiple files are produced they are zipped before being attached to the email draft. Approval letters are generated via Word COM interop using Find and Replace substitution across three templates: approval notice, disapproval notice, and temporary approval. COM objects are released in finally blocks on every code path to prevent Excel and Word process leaks.
            </p>

            <h4 className="case-study__h4">Role-Based Access Control</h4>
            <p className="case-study__p">
              The module enforces a five-tier access model with an orthogonal Approved Auditor flag that controls outcome authority independently of access level. Only admins can create new RFSAs. The assigned QAR fills the 14 RMS questions, writes the recommendation, tracks corrective action requests, and sends the survey. The Approved Auditor sets the outcome decision and justification. Other users see a read-only view.
            </p>
            <p className="case-study__p">
              The assigned rep flag is computed at load time by comparing the logged-in employee ID against the record's assigned rep field, meaning two QARs at the same access level see completely different edit surfaces on the same record. Rep reassignment triggers automated email notifications to both the previous and new assignees.
            </p>
            <p className="case-study__p">
              Saves that touch both the RFSA record and the vendor table are executed as a queue of parameterized statements in a single database connection, ensuring both updates succeed or both roll back.
            </p>
          </section>

          <section className="case-study__section">
            <h2 className="case-study__h2">Regulatory Context</h2>
            <p className="case-study__p">
              The system operates under Transport Canada's quality assurance requirements for aerospace manufacturing. Supplier approvals, reassessments, and audit outcomes all feed into compliance documentation that inspectors rely on for airworthiness decisions. I participated in working sessions with the quality team to define the risk scoring criteria, including the factor weights and the nine-tier criticality classification (A1 through C3), and to validate that the engine's output aligned with how inspectors were manually assessing risk before the system existed.
            </p>
          </section>

        </div>
      </div>
    </>
  )
}
