<template>
    <section class="trending">
      <div class="head">
        <h3>Trending Repository</h3>
        <a href="https://github.com/trending" target="_blank" rel="noreferrer">View All ↗</a>
      </div>
  
      <div class="grid">
        <article class="card">
          <a class="repo" href="https://github.com/microsoft/DeepSpeed" target="_blank" rel="noreferrer">microsoft/deepspeed</a>
          <p>Deep learning optimization library for distributed training.</p>
          <small>Python • ★ 15k+</small>
        </article>
  
        <article class="card">
          <a class="repo" href="https://github.com/shadcn/ui" target="_blank" rel="noreferrer">shadcn/ui</a>
          <p>Beautiful components built with Radix UI and Tailwind CSS.</p>
          <small>TypeScript • ★ 34k+</small>
        </article>
  
        <article class="card">
          <a class="repo" href="https://github.com/dreamgaussian/dreamgaussian" target="_blank" rel="noreferrer">dreamgaussian/dreamgaussian</a>
          <p>Generating 3D Gaussian Splats from images.</p>
          <small>Python • ★ 12k+</small>
        </article>
      </div>
    </section>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped>
  .trending { display:grid; gap:1rem; margin-top:2rem; }
  .head { display:flex; align-items:center; justify-content:space-between; color:var(--muted); }
  .grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:1rem; }
  .card { background: var(--bg-elev); border:1px solid var(--border); border-radius:.75rem; padding:1rem; display:grid; gap:.5rem; }
  .repo { color: var(--link); font-weight:700; text-decoration:none; }
  @media (max-width: 860px){ .grid { grid-template-columns: 1fr; } }
  </style>
  