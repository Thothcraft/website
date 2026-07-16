<template>
  <div class="product-page">
    <section class="product-hero">
      <div class="product-copy">
        <p class="eyebrow">
          THOTH ONE
        </p>
        <h1>Presence,<br>not surveillance.</h1>
        <p class="lede">
          A Raspberry Pi–based indoor intelligence device for private homes, smart spaces, and research.
        </p>
        <a
          class="buy"
          href="https://portal-three-rho.vercel.app/buy"
          target="_blank"
          rel="noopener"
        ><span class="buy-icon" aria-hidden="true">▣</span> Buy Thoth · $500 <span>↗</span></a>
      </div>
      <div class="model-wrap">
        <iframe
          title="Interactive 3D model of the Thoth device"
          src="https://poly.cam/capture/d88e03b4-4645-4a66-bf69-af3e4752090d?"
          loading="lazy"
          allow="fullscreen; xr-spatial-tracking"
          allowfullscreen
        />
        <a
          href="https://poly.cam/capture/d88e03b4-4645-4a66-bf69-af3e4752090d?"
          target="_blank"
          rel="noopener"
        >Open 3D view ↗</a>
      </div>
    </section>

    <section class="included">
      <p class="eyebrow">
        OUT OF THE BOX
      </p>
      <h2>Works locally.<br>On your network.</h2>
      <p class="local-intro">The device does not require Portal access for everyday use on the same local network.</p>
      <div class="included-grid">
        <article
          v-for="(item, i) in included"
          :key="item.title"
        >
          <span>0{{ i + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="portal-plan">
      <div><p class="eyebrow">THOTH PORTAL</p><h2>Your devices.<br>Wherever you are.</h2></div>
      <div class="plan-card"><p class="price"><strong>$5</strong><span>USD / month · Home</span></p><p>Portal brings the same device and data controls beyond your local network.</p><ul><li>Manage up to five smart rooms on Home</li><li>Private AI models on Pro</li><li>Free one-room access remains available</li></ul><a href="https://portal-three-rho.vercel.app/pricing" target="_blank" rel="noopener">Compare Portal plans ↗</a></div>
    </section>
  </div>
</template>

<script setup>
const included = [
  { title: 'Radar + camera hardware', text: 'A 60 GHz mmWave radar and camera are included in the $500 device.' },
  { title: 'Multi-data collection', text: 'Collect synchronized sensor streams directly on your local network.' },
  { title: 'Presence detection', text: 'Detect room occupancy passively without relying on remote services.' },
  { title: 'XY localization', text: 'Locate presence across a calibrated room in two dimensions.' },
  { title: 'Smart-home integration', text: 'Connect local room state to Home Assistant and your automations.' },
]
</script>

<style scoped>
.product-page{padding-top:76px;background:#f4f1e9}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;margin:0}.product-hero{min-height:calc(100vh - 76px);display:grid;grid-template-columns:1fr 1fr;gap:26px;padding:34px}.product-copy{display:flex;flex-direction:column;padding:48px 0}.product-copy h1,.included h2,.privacy h2,.specs h2,.buy-section h2{font-size:clamp(58px,7.4vw,112px);line-height:.9;letter-spacing:-.068em;font-weight:610;margin:70px 0 40px}.lede{font-size:clamp(18px,2vw,27px);line-height:1.35;max-width:620px}.buy{align-self:flex-start;margin-top:auto;background:#11110f;color:#fff;text-decoration:none;border-radius:999px;padding:15px 24px;font-weight:650}.model-wrap{background:#ddd9cf;min-height:680px;position:relative;overflow:hidden}.model-wrap iframe{width:100%;height:100%;border:0;position:absolute;inset:0}.model-wrap>a{position:absolute;right:16px;bottom:16px;background:#f4f1e9;color:#11110f;text-decoration:none;padding:10px 14px;border-radius:999px;font-size:12px;font-weight:650}.included{padding:140px 34px}.included h2{max-width:1050px}.included-grid{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid #99958c}.included-grid article{min-height:290px;padding:22px;border-right:1px solid #99958c}.included-grid article:first-child{border-left:1px solid #99958c}.included-grid h3{font-size:25px;letter-spacing:-.04em;margin:72px 0 18px}.included-grid p{color:#5b5953;line-height:1.5}.privacy{padding:150px 34px;background:#11110f;color:#f4f1e9}.privacy h2{max-width:1300px}.privacy>p:last-child{font-size:25px;line-height:1.45;max-width:760px;margin-left:auto}.specs{padding:140px 34px;display:grid;grid-template-columns:1fr 1fr;gap:50px}.specs h2{font-size:clamp(54px,6vw,90px)}.specs dl{margin:0;border-top:1px solid #99958c}.specs dl template{display:contents}.specs dt,.specs dd{border-bottom:1px solid #99958c;margin:0;padding:24px 0}.specs dt{float:left;clear:left;width:40%;font-size:12px;text-transform:uppercase;letter-spacing:.12em}.specs dd{padding-left:40%;font-size:20px}.buy-section{min-height:90vh;background:#c8d1b2;padding:100px 34px 60px;display:flex;flex-direction:column}.buy-section h2{margin:auto 0 70px}.buy-section a{align-self:flex-start;background:#11110f;color:#fff;border-radius:999px;padding:16px 25px;text-decoration:none;font-weight:650}@media(max-width:900px){.product-page{padding-top:68px}.product-hero{grid-template-columns:1fr;padding:42px 20px 20px}.product-copy{min-height:650px}.product-copy h1{font-size:clamp(58px,16vw,86px)}.model-wrap{min-height:70vh}.included,.privacy,.specs,.buy-section{padding:90px 20px}.included-grid{grid-template-columns:1fr}.included-grid article,.included-grid article:first-child{border-left:0;border-right:0;border-bottom:1px solid #99958c;min-height:220px}.specs{grid-template-columns:1fr}.privacy>p:last-child{font-size:19px}}
.portal-plan{padding:150px 34px;background:#11110f;color:#f4f1e9;display:grid;grid-template-columns:1.25fr .75fr;gap:70px;align-items:start}.portal-plan h2{font-size:clamp(58px,7.4vw,112px);line-height:.9;letter-spacing:-.068em;font-weight:610;margin:70px 0 0}.plan-card{border-top:1px solid #65635d;padding-top:24px}.price{display:flex;align-items:end;gap:14px;margin:0 0 35px}.price strong{font-size:clamp(70px,8vw,120px);line-height:.8;letter-spacing:-.07em;font-weight:600}.price span{font-size:12px;letter-spacing:.12em;margin-bottom:5px}.plan-card>p:not(.price){font-size:18px;color:#c1bdb4}.plan-card ul{list-style:none;padding:0;margin:45px 0}.plan-card li{border-top:1px solid #4a4944;padding:17px 0;font-size:18px}.plan-card li:last-child{border-bottom:1px solid #4a4944}.plan-card a{display:inline-block;background:#f4f1e9;color:#11110f;border-radius:999px;padding:15px 23px;text-decoration:none;font-weight:650}@media(max-width:900px){.portal-plan{padding:90px 20px;grid-template-columns:1fr}.portal-plan h2{margin:45px 0}.price strong{font-size:82px}}
.buy{padding:13px 22px 13px 14px;display:inline-flex;align-items:center;gap:10px}.buy-icon{width:34px;height:34px;border-radius:50%;background:#f4f1e9;color:#11110f;display:grid;place-items:center;font-size:13px;transform:rotate(45deg)}.local-intro{max-width:650px;font-size:20px;line-height:1.45;color:#5b5953;margin:-18px 0 60px}.included-grid{grid-template-columns:repeat(5,1fr)}@media(max-width:900px){.included-grid{grid-template-columns:1fr}.local-intro{font-size:18px;margin-bottom:40px}}
</style>
