import { Link } from 'react-router-dom'
import { HardwareViewer } from '../components/hardware/HardwareViewer'
import './product.css'

const INCLUDED = [
  { title: 'Radar + camera hardware', text: 'A 60 GHz mmWave radar and camera are included in the $500 device.' },
  { title: 'Multi-data collection', text: 'Collect synchronized sensor streams directly on your local network.' },
  { title: 'Presence detection', text: 'Detect room occupancy passively without relying on remote services.' },
  { title: 'XY localization', text: 'Locate presence across a calibrated room in two dimensions.' },
  { title: 'Smart-home integration', text: 'Connect local room state to Home Assistant and your automations.' },
]

const HARDWARE = ['Raspberry Pi 5', 'MMW-HAT 60 GHz radar (Infineon BGT60TR13C)', '3D-printed enclosure', '2× ESP32-C6 CSI boards', 'USB camera']

const BUNDLES = [
  {
    name: '1 Thoth Device',
    for: 'FOR INDIVIDUALS & RESEARCHERS',
    price: '$500',
    items: HARDWARE,
    href: 'mailto:hello@thothcraft.com?subject=Order: 1 Thoth Device',
    featured: false,
  },
  {
    name: '5 Thoth Devices',
    for: 'FOR LABS & ORGANIZATIONS',
    price: '$2,500',
    items: HARDWARE.map((item) => `5× ${item}`),
    href: 'mailto:hello@thothcraft.com?subject=Order: 5 Thoth Devices',
    featured: true,
  },
]

export default function Product() {
  return (
    <div className="product-page">
      <section className="product-hero">
        <div className="product-copy">
          <p className="eyebrow">THOTH ONE</p>
          <h1>Presence,<br />not surveillance.</h1>
          <p className="lede">
            A Raspberry Pi–based indoor intelligence device for private homes, smart spaces, and research.
          </p>
          <div className="product-ctas">
            <a
              className="buy"
              href="https://portal-three-rho.vercel.app/buy"
              target="_blank"
              rel="noopener"
            >
              <span className="buy-icon" aria-hidden="true">▣</span> Buy Thoth · $500 <span>↗</span>
            </a>
            <Link className="buy buy-secondary" to="/download">
              Install on Raspberry Pi <span>→</span>
            </Link>
          </div>
        </div>
        <div className="model-wrap">
          <HardwareViewer device="thoth-one" showSpecs={false} compact />
          <Link to="/hardware">All hardware + specs →</Link>
        </div>
      </section>

      <section className="included">
        <p className="eyebrow">OUT OF THE BOX</p>
        <h2>Works locally.<br />On your network.</h2>
        <p className="local-intro">
          The device does not require Portal access for everyday use on the same local network.
        </p>
        <div className="included-grid">
          {INCLUDED.map((item, i) => (
            <article key={item.title}>
              <span>0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="included" id="hardware">
        <p className="eyebrow">INSIDE THE FLEET</p>
        <h2>Radar node, CSI boards,<br />and a wrist sensor.</h2>
        <HardwareViewer />
      </section>

      <section className="purchase" id="buy">
        <div className="purchase-heading">
          <p className="eyebrow">BUY THOTH</p>
          <h2>Ready to use.<br />Right out of the box.</h2>
          <p>
            Every device ships pre-flashed and pre-configured. Plug it in, connect it to
            Wi-Fi, and begin collecting data.
          </p>
        </div>
        <div className="purchase-options">
          {BUNDLES.map((bundle) => (
            <article key={bundle.name} className={bundle.featured ? 'featured' : ''}>
              <p className="bundle-for">{bundle.for}</p>
              <h3>{bundle.name}</h3>
              <p className="bundle-price"><strong>{bundle.price}</strong> CAD</p>
              <p>One-time purchase · ships pre-configured</p>
              <ul>
                {bundle.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={bundle.href}>Order now ↗</a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
