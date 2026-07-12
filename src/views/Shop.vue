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
          href="mailto:hello@thothcraft.com?subject=Buy a Thoth device"
        >Buy a device <span>↗</span></a>
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
      <h2>No plans.<br>No required cloud.</h2>
      <div class="included-grid">
        <article
          v-for="(item, i) in included"
          :key="item.title"
        >
          <span>0{{ i + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="privacy">
      <p class="eyebrow">
        CAMERA OPTIONAL
      </p><h2>Private by default.<br>Visual when you choose.</h2><p>Core presence and 2D location features do not depend on a camera. Enable vision for remote viewing and VLM-assisted research labels, then disable it whenever you want.</p>
    </section>

    <section class="specs">
      <div>
        <p class="eyebrow">
          OPEN FOUNDATION
        </p><h2>Made to adapt.</h2>
      </div><dl>
        <template
          v-for="spec in specs"
          :key="spec.label"
        >
          <dt>{{ spec.label }}</dt><dd>{{ spec.value }}</dd>
        </template>
      </dl>
    </section>

    <section class="buy-section">
      <p class="eyebrow">
        THOTH ONE
      </p><h2>Give your home<br>a private sense of place.</h2><a href="mailto:hello@thothcraft.com?subject=Buy a Thoth device">Buy a device</a>
    </section>
  </div>
</template>

<script setup>
const included = [
  { title: 'Human presence', text: 'Detect occupancy passively without requiring a wearable or camera.' },
  { title: '2D localization', text: 'Locate presence within a calibrated indoor space.' },
  { title: 'Home Assistant', text: 'Connect room state to the automations already running your home.' },
  { title: 'Local LLM', text: 'Ask about rooms, routines, and activity from the portal or app.' },
  { title: 'Remote camera', text: 'Access a visual feed only when the camera has been enabled.' },
]
const specs = [
  { label: 'Compute', value: 'Raspberry Pi based' },
  { label: 'Software', value: 'Open source' },
  { label: 'Vision', value: 'Optional camera' },
  { label: 'Integration', value: 'Home Assistant' },
  { label: 'Research', value: 'Synchronized multimodal data' },
]
</script>

<style scoped>
.product-page{padding-top:76px;background:#f4f1e9}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;margin:0}.product-hero{min-height:calc(100vh - 76px);display:grid;grid-template-columns:1fr 1fr;gap:26px;padding:34px}.product-copy{display:flex;flex-direction:column;padding:48px 0}.product-copy h1,.included h2,.privacy h2,.specs h2,.buy-section h2{font-size:clamp(58px,7.4vw,112px);line-height:.9;letter-spacing:-.068em;font-weight:610;margin:70px 0 40px}.lede{font-size:clamp(18px,2vw,27px);line-height:1.35;max-width:620px}.buy{align-self:flex-start;margin-top:auto;background:#11110f;color:#fff;text-decoration:none;border-radius:999px;padding:15px 24px;font-weight:650}.model-wrap{background:#ddd9cf;min-height:680px;position:relative;overflow:hidden}.model-wrap iframe{width:100%;height:100%;border:0;position:absolute;inset:0}.model-wrap>a{position:absolute;right:16px;bottom:16px;background:#f4f1e9;color:#11110f;text-decoration:none;padding:10px 14px;border-radius:999px;font-size:12px;font-weight:650}.included{padding:140px 34px}.included h2{max-width:1050px}.included-grid{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid #99958c}.included-grid article{min-height:290px;padding:22px;border-right:1px solid #99958c}.included-grid article:first-child{border-left:1px solid #99958c}.included-grid h3{font-size:25px;letter-spacing:-.04em;margin:72px 0 18px}.included-grid p{color:#5b5953;line-height:1.5}.privacy{padding:150px 34px;background:#11110f;color:#f4f1e9}.privacy h2{max-width:1300px}.privacy>p:last-child{font-size:25px;line-height:1.45;max-width:760px;margin-left:auto}.specs{padding:140px 34px;display:grid;grid-template-columns:1fr 1fr;gap:50px}.specs h2{font-size:clamp(54px,6vw,90px)}.specs dl{margin:0;border-top:1px solid #99958c}.specs dl template{display:contents}.specs dt,.specs dd{border-bottom:1px solid #99958c;margin:0;padding:24px 0}.specs dt{float:left;clear:left;width:40%;font-size:12px;text-transform:uppercase;letter-spacing:.12em}.specs dd{padding-left:40%;font-size:20px}.buy-section{min-height:90vh;background:#c8d1b2;padding:100px 34px 60px;display:flex;flex-direction:column}.buy-section h2{margin:auto 0 70px}.buy-section a{align-self:flex-start;background:#11110f;color:#fff;border-radius:999px;padding:16px 25px;text-decoration:none;font-weight:650}@media(max-width:900px){.product-page{padding-top:68px}.product-hero{grid-template-columns:1fr;padding:42px 20px 20px}.product-copy{min-height:650px}.product-copy h1{font-size:clamp(58px,16vw,86px)}.model-wrap{min-height:70vh}.included,.privacy,.specs,.buy-section{padding:90px 20px}.included-grid{grid-template-columns:1fr}.included-grid article,.included-grid article:first-child{border-left:0;border-right:0;border-bottom:1px solid #99958c;min-height:220px}.specs{grid-template-columns:1fr}.privacy>p:last-child{font-size:19px}}
</style>
