<!-- <script setup lang="ts">
import { Search, LineChart, Flag } from 'lucide-vue-next'
</script>

<template>
  <section class="features-section">
    <h2 class="section-heading">Features</h2>
    <div class="feature-grid">
      <article class="card glass">
        <Search class="icon" :size="26" />
        <h3>Advanced Search</h3>
        <p>Find repositories by name, language, stars, and more using GitHub’s API.</p>
      </article>
      <article class="card glass">
        <LineChart class="icon" :size="26" />
        <h3>Repository Analytics</h3>
        <p>View repository statistics including stars, forks, and watchers.</p>
      </article>
      <article class="card glass">
        <Flag class="icon" :size="26" />
        <h3>Issue Tracking</h3>
        <p>Browse repository issues, filter by state, and visualize ratios.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.features-section { display:grid; gap:1.25rem; text-align:center; }
.section-heading {
  margin: 0 auto 0.5rem;
  font-size: 1.75rem; font-weight: 800;
  color: var(--text);
}
.feature-grid{
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}
.card{
  padding: 1.5rem 1.25rem;
  border-radius: 16px;
  backdrop-filter: blur(14px) saturate(120%);
}
.icon{ color:#c7c9ff; margin-bottom:.5rem; }
@media (max-width: 980px){ .feature-grid{ grid-template-columns: 1fr; } }
</style> -->
