import './product.css'

/**
 * /privacy and /terms — required by the Google OAuth consent screen and
 * Stripe. Deliberately short: Thothcraft is self-hosted, so the policy is
 * simple and honest. Update when data handling actually changes.
 */
export default function Legal() {
  return (
    <div className="product-page">
      <section className="included" id="privacy">
        <p className="eyebrow">LEGAL</p>
        <h1>Privacy policy</h1>
        <p className="lede">Last updated November 2026.</p>

        <h3>What runs where</h3>
        <p>
          Thothcraft is a self-hosted system. Your Room1 node, wearables, and
          the phone/desktop/Hub clients keep raw audio, sensor and room data on
          your own hardware. Our Brain service stores your account, billing
          state, device registry, usage counters and — only when you opt in per
          data class — derived content for cloud processing.
        </p>

        <h3>What we collect</h3>
        <ul>
          <li>Account data: email, sign-in identifiers (Firebase Auth).</li>
          <li>Billing data: plan, subscription status. Card details are handled
            by Stripe — we never see or store them.</li>
          <li>Usage counters: transcription seconds, chat questions, device
            online state — counts, not content.</li>
          <li>Optional integrations: Google Drive/Calendar access tokens and
            files only if you connect them (OAuth scopes: per-file Drive
            access, calendar events).</li>
        </ul>

        <h3>What we never collect</h3>
        <ul>
          <li>Raw audio, transcripts, radar/CSI/IMU samples — they stay on your
            devices unless you explicitly opt in per data class.</li>
          <li>Third-party analytics or advertising trackers.</li>
        </ul>

        <h3>Your controls</h3>
        <p>
          Consent per data class, full export, and deletion are available in
          the app (Privacy section) and via the API. Deleting your account
          removes all stored data from Brain within 30 days; local data on
          your devices is under your control at all times.
        </p>

        <h3>Contact</h3>
        <p>privacy@thothcraft.com</p>
      </section>

      <section className="included" id="terms">
        <p className="eyebrow">LEGAL</p>
        <h1>Terms of service</h1>
        <p className="lede">Last updated November 2026.</p>
        <p>
          Thothcraft hardware and software are provided as-is for personal and
          research use. Subscriptions renew until cancelled via the Stripe
          customer portal; refunds follow Stripe's standard dispute process.
          You are responsible for the security of your own network, devices and
          API keys. Do not use the system to monitor people without their
          knowledge or consent.
        </p>
        <p>Contact: hello@thothcraft.com</p>
      </section>
    </div>
  )
}
