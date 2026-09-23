import { Link } from 'react-router-dom'
import './plans.css'

const PORTAL_AUTH = 'https://portal-three-rho.vercel.app/auth'

interface Plan {
  id: 'free' | 'home' | 'research'
  title: string
  price: string
  devices: string
  note: string
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'free',
    title: 'Free',
    price: '$0',
    devices: '01 device',
    note: 'A complete sensing device.',
    features: [
      'Occupancy detection and predictions',
      'Live sensor visualization',
      'Home Assistant integration',
      'View captured data (400-minute history)',
    ],
  },
  {
    id: 'home',
    title: 'Home',
    price: '$5',
    devices: '05 devices',
    featured: true,
    note: 'A connected set of smart rooms.',
    features: [
      'Everything in Free',
      'Up to 5 devices',
      '10 GB cloud storage with auto sync',
      'Download and export raw data',
    ],
  },
  {
    id: 'research',
    title: 'Research',
    price: '$15',
    devices: '10 devices',
    note: 'The full research workflow.',
    features: [
      'Everything in Home',
      'Up to 10 devices, 100 GB cloud storage',
      'Research datasets and Python SDK',
      'Research Labs with notebook grading',
    ],
  },
]

type CellValue = string | boolean

interface CompareRow {
  feature: string
  free: CellValue
  home: CellValue
  research: CellValue
}

const COMPARE_ROWS: CompareRow[] = [
  { feature: 'Devices online', free: '1', home: '5', research: '10' },
  { feature: 'Occupancy, predictions and live view', free: true, home: true, research: true },
  { feature: 'Home Assistant', free: true, home: true, research: true },
  { feature: 'Cloud storage', free: '400 min', home: '10 GB', research: '100 GB' },
  { feature: 'Download / export raw data', free: false, home: true, research: true },
  { feature: 'Python SDK', free: 'read/control', home: true, research: true },
  { feature: 'Research datasets and Labs', free: false, home: false, research: true },
  { feature: 'Price (USD / month)', free: 'Free', home: '$5', research: '$15' },
]

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <span className="check">✓</span>
  if (value === false) return <span className="dash">—</span>
  return <span className="value">{value}</span>
}

const FAQS = [
  { q: 'Can I switch plans anytime?', a: 'Yes. Upgrades take effect immediately; downgrades apply at the start of the next billing cycle.' },
  { q: 'What happens to my data if I downgrade?', a: 'Your data stays safe. Features above your new tier become read-only. You have 30 days to export anything before restrictions apply.' },
  { q: 'Is pricing in US dollars?', a: 'Yes. Stripe calculates applicable taxes during checkout.' },
  { q: 'Does live presence require a camera?', a: 'No. The live view is generated locally from radio reflections and reports presence and location without images.' },
  { q: 'Do I need to install anything for the free plan?', a: 'Yes. Download the client for your platform from the download page and run it.' },
]

export default function Plans() {
  return (
    <div className="plans-page">
      <section className="plans-hero">
        <div>
          <p className="eyebrow">PORTAL ACCESS / 2026</p>
          <h1>One room.<br />Then many.</h1>
        </div>
        <div className="hero-copy">
          <p>
            Start with full local occupancy and XY location. Upgrade when multiple rooms,
            private models, or research workflows need Portal.
          </p>
          <p className="note">
            The $500 Thoth device is purchased separately. Taxes and shipping are handled at checkout.
          </p>
        </div>
      </section>

      <section className="billing-strip">
        <span className="eyebrow">BILLING CADENCE</span>
        <div className="billing-pill">Monthly billing</div>
      </section>

      <section className="plan-grid">
        {PLANS.map((plan, index) => (
          <article key={plan.id} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
            <div className="plan-meta">
              <span>0{index + 1}</span>
              <span>{plan.devices}</span>
            </div>
            <h2>{plan.title}</h2>
            <div className="plan-price">{plan.price}</div>
            <p className="plan-note">{plan.note}</p>
            <ul>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href={PORTAL_AUTH} target="_blank" rel="noopener">
              {plan.id === 'free' ? 'Get started' : 'Choose plan'}
            </a>
          </article>
        ))}
      </section>

      <section className="device-band">
        <div>
          <span className="eyebrow">HARDWARE</span>
          <h2>Radar + camera.<br />$500 once.</h2>
        </div>
        <div className="device-copy">
          <p>
            Every plan begins with the same local-first sensing device. A subscription
            changes scale and remote access, not core sensing.
          </p>
          <Link to="/product">See the Thoth device</Link>
        </div>
      </section>

      <section className="compare-wrap">
        <h2>Compare Plans</h2>
        <div className="compare-card">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="feature-col">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.id} className={p.featured ? 'highlighted' : ''}>{p.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.feature}>
                  <td className="feature-name">{row.feature}</td>
                  {PLANS.map((p) => (
                    <td key={p.id} className={p.featured ? 'highlighted' : ''}>
                      <Cell value={row[p.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="faq-wrap">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((faq) => (
            <article key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
