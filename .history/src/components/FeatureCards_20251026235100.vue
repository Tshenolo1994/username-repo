<template>
    <section class="features">
      <article class="card">
        <div class="icon">🔎</div>
        <h3>Advanced Search</h3>
        <p>Find repositories by username and dive into commit history.</p>
      </article>
  
      <article class="card">
        <div class="icon">📈</div>
        <h3>Repository Analytics</h3>
        <p>See commit messages, authors, dates and diff stats.</p>
      </article>
  
      <article class="card">
        <div class="icon">📂</div>
        <h3>Issue Tracking</h3>
        <p>Focus on repos & commits (no auth required).</p>
      </article>
    </section>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped>
  .features { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:1rem; margin-top:2rem; }
  .card { background: var(--bg-elev); border:1px solid var(--border); border-radius:.75rem; padding:1rem; display:grid; gap:.5rem; }
  .icon { font-size:1.25rem; }
  @media (max-width: 860px){ .features { grid-template-columns: 1fr; } }
  </style>
  