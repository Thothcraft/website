<template>
  <v-app class="site-shell">
    <header class="site-header">
      <router-link class="brand" to="/" aria-label="Thoth home"><span class="brand-mark">T</span><span>Thoth</span></router-link>
      <nav class="site-nav"><router-link class="product-link" to="/product">Product</router-link><router-link class="product-link" to="/plans">Plans</router-link></nav>
      <a class="portal-link" href="https://portal-three-rho.vercel.app/auth" target="_blank" rel="noopener">Portal</a>
    </header>
    <main><router-view /></main>
  </v-app>
</template>

<style>
:root{font-family:Inter,"Helvetica Neue",Arial,sans-serif;color:#11110f;background:#f4f1e9;font-synthesis:none}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f4f1e9;color:#11110f}.site-shell{background:#f4f1e9!important}.site-header{height:76px;position:fixed;inset:0 0 auto;z-index:100;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 34px;background:rgba(244,241,233,.95);backdrop-filter:blur(12px)}.brand,.product-link,.portal-link{color:#11110f;text-decoration:none}.brand{justify-self:start;display:flex;align-items:center;gap:10px;font-size:18px;font-weight:650;letter-spacing:-.03em}.brand-mark{width:30px;height:30px;display:grid;place-items:center;border:1.5px solid #11110f;border-radius:50%;font-size:14px}.site-nav{display:flex;align-items:center;gap:24px}.product-link{font-size:15px;font-weight:550;transition:opacity .2s}.portal-link{justify-self:end;padding:11px 21px;border-radius:999px;background:#11110f;color:#fff;font-weight:650;font-size:14px;transition:opacity .2s}.product-link:hover,.portal-link:hover{opacity:.68}.brand:focus-visible,.product-link:focus-visible,.portal-link:focus-visible,a:focus-visible,button:focus-visible{outline:2px solid #11110f;outline-offset:4px}@media(max-width:640px){.site-header{height:68px;padding:0 20px}.brand span:last-child{display:none}.site-nav{gap:12px}.portal-link{padding:10px 17px}}
</style>
