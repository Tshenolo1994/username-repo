<template>
    <section class="trending-section">
      <div class="trending-head">
        <h2 class="section-heading">Trending Repository</h2>
        <a class="view-all" href="https://github.com/trending" target="_blank" rel="noreferrer">View All ↗</a>
      </div>
      <div class="trend-grid">
        <!-- your 3 cards -->
      </div>
    </section>
  </template>
  
  <style scoped>
  .trending-section { display:grid; gap:1rem; }
  .trending-head{
    display:flex; align-items:center; justify-content:space-between;
  }
  .section-heading{ margin:0; font-size:1.75rem; font-weight:800; color:var(--text); }
  .view-all{ color: var(--muted); text-decoration:none; }
  .trend-grid{
    display:grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }
  .card{ padding:1.1rem 1.25rem; border-radius:16px; }
  @media (max-width: 980px){ .trend-grid{ grid-template-columns:1fr; } }
  </style>
  