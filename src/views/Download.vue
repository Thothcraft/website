<template>
  <main class="download-page">
    <section class="hero">
      <p class="eyebrow">Raspberry Pi</p>
      <h1>Install Thoth<br>with one script.</h1>
      <p class="lede">The standalone installer can be rerun safely. It installs or updates <code>main</code>, configures the device service, and includes the CPU TorchScript runtime. No account or credentials are needed to install.</p>
      <a class="download-button" :href="installerUrl" download="install.sh">Download install.sh</a>
      <pre class="one-liner"><code>curl -fsSL {{ installerUrl }} | sudo bash</code></pre>
    </section>
    <section class="instructions">
      <div><span>01</span><h2>Download</h2><pre><code>curl -fLO {{ installerUrl }}</code></pre></div>
      <div><span>02</span><h2>Run as root</h2><pre><code>sudo bash install.sh</code></pre></div>
      <div><span>03</span><h2>Open Thoth</h2><pre><code>http://thoth.local:5000</code></pre></div>
    </section>
    <p class="note">Use a 64-bit Raspberry Pi OS installation and connect the Pi to your network before starting. The installer is public and needs no credentials; signing in on the dashboard links the device to your thothHUB account. Existing local configuration and capture data are preserved during updates.</p>
  </main>
</template>

<script setup>
const installerUrl = 'https://raw.githubusercontent.com/Thothcraft/thoth/main/setup/install.sh'
</script>

<style scoped>
.download-page{min-height:100vh;padding:150px 34px 80px;background:#f4f1e9;color:#11110f}.hero{max-width:900px;margin:0 auto}.eyebrow{font:700 12px ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase;color:#6d6961}.hero h1{margin:20px 0 0;font-size:clamp(52px,9vw,112px);font-weight:600;line-height:.88;letter-spacing:-.07em}.lede{max-width:680px;margin:34px 0 0;font-size:19px;line-height:1.65;color:#5e5a53}.download-button{display:inline-flex;margin-top:30px;padding:15px 24px;border-radius:999px;background:#11110f;color:#fff;text-decoration:none;font-weight:700}.one-liner{max-width:680px;margin-top:22px;padding:16px 18px;background:#11110f;color:#f4f1e9;border-radius:10px;font-size:13px;overflow:auto}.instructions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));max-width:1100px;margin:100px auto 0;border-top:1px solid #c9c4b9}.instructions>div{min-width:0;padding:26px 24px 30px;border-right:1px solid #c9c4b9}.instructions>div:first-child{border-left:1px solid #c9c4b9}.instructions span{font:700 11px ui-monospace,monospace;color:#77736b}.instructions h2{margin:20px 0;font-size:24px}.instructions pre{overflow:auto;padding:16px;background:#11110f;color:#f4f1e9;border-radius:10px;font-size:12px}.note{max-width:760px;margin:36px auto 0;color:#6d6961;font-size:14px;line-height:1.6}@media(max-width:760px){.download-page{padding:112px 20px 60px}.instructions{grid-template-columns:1fr;margin-top:64px}.instructions>div,.instructions>div:first-child{border:0;border-bottom:1px solid #c9c4b9;padding-inline:0}.site-nav{gap:10px}}
</style>
