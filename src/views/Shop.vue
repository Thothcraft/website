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
          href="#buy"
        ><span class="buy-icon" aria-hidden="true">▣</span> Buy Thoth <span>↗</span></a>
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

    <section class="purchase" id="buy">
      <div class="purchase-heading">
        <p class="eyebrow">BUY THOTH</p>
        <h2>Ready to use.<br>Right out of the box.</h2>
        <p>Every device ships pre-flashed and pre-configured. Plug it in, connect it to Wi-Fi, and begin collecting data.</p>
      </div>
      <div class="purchase-options">
        <article v-for="bundle in bundles" :key="bundle.name" :class="{ featured: bundle.featured }">
          <p class="bundle-for">{{ bundle.for }}</p>
          <h3>{{ bundle.name }}</h3>
          <p class="bundle-price"><strong>{{ bundle.price }}</strong> CAD</p>
          <p>One-time purchase · ships pre-configured</p>
          <ul>
            <li v-for="item in bundle.items" :key="item">{{ item }}</li>
          </ul>
          <a :href="bundle.href">Order now ↗</a>
        </article>
      </div>
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

const hardware = ['Raspberry Pi 4', 'PiSugar battery module', 'DreamHat sensor board', '2× ESP32 wireless modules', 'USB camera']
const bundles = [
  { name: '1 Thoth Device', for: 'FOR INDIVIDUALS & RESEARCHERS', price: '$500', items: hardware, href: 'mailto:hello@thothcraft.com?subject=Order: 1 Thoth Device' },
  { name: '5 Thoth Devices', for: 'FOR LABS & ORGANIZATIONS', price: '$2,500', items: hardware.map(item => `5× ${item.replace(/^2× /, '2× ')}`), href: 'mailto:hello@thothcraft.com?subject=Order: 5 Thoth Devices', featured: true },
]
</script>

<style scoped>
.product-page{padding-top:76px;background:#f4f1e9}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;margin:0}.product-hero{min-height:calc(100vh - 76px);display:grid;grid-template-columns:1fr 1fr;gap:26px;padding:34px}.product-copy{display:flex;flex-direction:column;padding:48px 0}.product-copy h1,.included h2,.purchase-heading h2{font-size:clamp(58px,7.4vw,112px);line-height:.9;letter-spacing:-.068em;font-weight:610;margin:70px 0 40px}.lede{font-size:clamp(18px,2vw,27px);line-height:1.35;max-width:620px}.buy{align-self:flex-start;margin-top:auto;background:#11110f;color:#fff;text-decoration:none;border-radius:999px;padding:15px 24px;font-weight:650;display:inline-flex;align-items:center;gap:10px}.buy-icon{width:34px;height:34px;border-radius:50%;background:#f4f1e9;color:#11110f;display:grid;place-items:center;font-size:13px;transform:rotate(45deg)}.model-wrap{background:#ddd9cf;min-height:680px;position:relative;overflow:hidden}.model-wrap iframe{width:100%;height:100%;border:0;position:absolute;inset:0}.model-wrap>a{position:absolute;right:16px;bottom:16px;background:#f4f1e9;color:#11110f;text-decoration:none;padding:10px 14px;border-radius:999px;font-size:12px;font-weight:650}.included{padding:140px 34px}.included h2{max-width:1050px}.local-intro{max-width:650px;font-size:20px;line-height:1.45;color:#5b5953;margin:-18px 0 60px}.included-grid{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid #99958c}.included-grid article{min-height:290px;padding:22px;border-right:1px solid #99958c}.included-grid article:first-child{border-left:1px solid #99958c}.included-grid h3{font-size:25px;letter-spacing:-.04em;margin:72px 0 18px}.included-grid p{color:#5b5953;line-height:1.5}.purchase{padding:140px 34px;background:#f4f1e9}.purchase-heading{display:grid;grid-template-columns:1fr 1fr;gap:50px;margin-bottom:80px}.purchase-heading h2{font-size:clamp(54px,6vw,90px);line-height:.92;letter-spacing:-.06em;font-weight:610;margin:55px 0 0}.purchase-heading>p:last-child{align-self:end;font-size:20px;line-height:1.45;color:#5b5953;max-width:570px}.purchase-options{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #99958c}.purchase-options article{padding:34px;min-height:620px;border-left:1px solid #99958c;display:flex;flex-direction:column}.purchase-options article:last-child{border-right:1px solid #99958c}.purchase-options article.featured{background:#c8d1b2}.bundle-for{font-size:11px;font-weight:700;letter-spacing:.14em}.purchase-options h3{font-size:clamp(36px,4vw,62px);letter-spacing:-.05em;margin:70px 0 10px}.bundle-price{color:#5b5953}.bundle-price strong{font-size:34px;color:#11110f}.purchase-options ul{list-style:none;padding:0;margin:45px 0}.purchase-options li{border-top:1px solid #99958c;padding:14px 0}.purchase-options li:last-child{border-bottom:1px solid #99958c}.purchase-options a{margin-top:auto;align-self:flex-start;background:#11110f;color:#fff;border-radius:999px;padding:15px 23px;text-decoration:none;font-weight:650}@media(max-width:900px){.product-page{padding-top:68px}.product-hero{grid-template-columns:1fr;padding:42px 20px 20px}.product-copy{min-height:650px}.product-copy h1{font-size:clamp(58px,16vw,86px)}.model-wrap{min-height:70vh}.included,.purchase{padding:90px 20px}.included-grid,.purchase-options{grid-template-columns:1fr}.included-grid article,.included-grid article:first-child{border-left:0;border-right:0;border-bottom:1px solid #99958c;min-height:220px}.purchase-heading{grid-template-columns:1fr;margin-bottom:50px}.purchase-options article,.purchase-options article:last-child{border-right:0;border-left:0;border-bottom:1px solid #99958c}.purchase-options article{padding:28px 20px;min-height:590px}}
</style>
